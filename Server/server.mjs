import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import sgMail from '@sendgrid/mail';
import useragent from 'useragent';
import { createClient } from 'redis';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import sanitize from 'mongoose-sanitize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [process.env.FRONTEND_URL];

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Set to your Vercel URL via Render env
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use cors middleware
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Serve static files for the frontend
app.use(express.static(path.join(process.cwd(), 'public')));

// Redis Client Setup
const client = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_URL,
    port: 17495,
  },
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();
await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result); // >>> bar

// Configuration
const MAX_DEVICES = 2; // Allow only 2 devices per user

// Function to generate a unique device ID based on the user-agent and device details
const generateDeviceId = (req) => {
  const agent = useragent.parse(req.headers['user-agent']);
  return `${agent.os}-${agent.device}-${agent.family}`;
};

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String }, // Path to the profile picture
  courses: [
    {
      courseName: String,
      courseCreationDate: { type: String, required: true }, // Format: YYYY-MM-DD
      courseExpirationDate: { type: String, required: true }, // Format: YYYY-MM-DD
    },
  ],
  creationDate: { type: String, required: true }, // Format: YYYY-MM-DD
  expirationDate: { type: String, required: true }, // Format: YYYY-MM-DD
  isConfirmed: {
    type: Boolean,
    default: false, // Initially, users are not confirmed
  },
  isAdmin: {
    type: Boolean,
    default: false, // Initially, users are not admins
  },
});

const courseSchema = new mongoose.Schema({
  level: { type: String, required: true }, // Example: A1, A2, B1, etc.
  videoLink: { type: String, required: true },
  videoImageLink: { type: String, required: true },
  videoTitle: { type: String, required: true },
  pdfLink: { type: String, required: true },
});

userSchema.plugin(sanitize);

const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);

// SendGrid Setup (using a single instance instead of two)
sgMail.setApiKey(process.env.SENDMAIL_API_KEY);

// Rate limiter for login and registration endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  handler: (req, res) => {
    res.status(429).json({
      error: 'Premašili ste dozvoljeni broj pokušaja. Molimo Vas pokušajte nakon 15 minuta.',
    });
  },
});

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(403).json({ error: 'Pristup odbijen.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
    const user = await User.findById(decoded.userId);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Pristup odbijen.' });
    }

    req.user = user; // Attach the user object to the request for further use
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(403).json({ error: 'Pristup odbijen.' });
  }
};

const validateCourse = [
  body('level').notEmpty().withMessage('Nivo kursa je obavezan.'),
  body('videoLink').isURL().withMessage('Video link mora biti validan URL.'),
  body('videoImageLink').isURL().withMessage('Video slika mora biti validan URL.'),
  body('videoTitle').notEmpty().withMessage('Naslov videa je obavezan.'),
  body('pdfLink').isURL().withMessage('PDF link mora biti validan URL.'),
];

const validateRegistration = [
  // Email validation
  body('email')
    .custom((value) => {
      if (value.includes('@gmail.com')) {
        return true; // Allow Gmail email to be as is
      }
      return body('email')
        .isEmail()
        .withMessage('Molimo Vas unesite validnu email adresu.');
    })
    .normalizeEmail({ gmail_remove_dots: false }), // Disable Gmail dot removal

  // Password validation
  body('password')
    .isLength({ min: 8 })
    .withMessage(
      'Lozinka mora imati najmanje osam karaktera, sadržati bar jedan broj i jedan specijalni karakter.'
    )
    .custom((value) => {
      if (!/\d/.test(value)) {
        throw new Error('Lozinka mora sadržati barem jedan broj.');
      }
      if (!/[!@#$%^&*]/.test(value)) {
        throw new Error('Lozinka mora sadržati barem jedan poseban karakter');
      }
      return true;
    }),

  // First name validation
  body('firstName')
    .notEmpty()
    .withMessage('Ime je obavezno')
    .trim() // Removes leading/trailing whitespace
    .escape(), // Escapes HTML characters to prevent XSS

  // Last name validation
  body('lastName')
    .notEmpty()
    .withMessage('Prezime je obavezno')
    .trim()
    .escape(),

  // Course name validation
  body('courseName')
    .notEmpty()
    .withMessage('Naziv kursa je obavezno')
    .trim()
    .escape(),
];

export { validateRegistration };

// Middleware to verify JWT token and check expiration date
const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from the Authorization header

  if (!token) {
    return res.status(403).send({ error: 'Pristup odbijen. Nevažeći ili istekli token.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = verified; // Attach user information to the request object
    // Check expirationDate from the token payload
    const currentDate = new Date().toISOString().split('T')[0];
    if (req.user.expirationDate < currentDate) {
      return res.status(403).send({
        error:
          'Vaš nalog je istekao. Molimo Vas da obnovite pretplatu da biste pristupili ovom resursu.',
      });
    }

    next(); // Continue to the next middleware or route handler
  } catch (err) {
    res.status(401).send({ error: 'Nevažeći ili istekli token.' });
  }
};

// Fetch user's courses (for logged-in users)
app.get('/api/user/courses', verifyToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: 'Korisnik nije pronađen.' });
    }

    res.status(200).json(user.courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send({ error: 'Serverska greška pri dobavljanju kurseva.' });
  }
});

// Endpoint to fetch videos by course level
app.get('/api/courses/:level', async (req, res) => {
  const { level } = req.params;

  try {
    const courses = await Course.find({ level });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Greška pri dobavljanju kurseva.' });
  }
});

app.post('/api/courses', isAdmin, validateCourse, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { level, videoLink, videoImageLink, videoTitle, pdfLink } = req.body;

    const newCourse = new Course({
      level,
      videoLink,
      videoImageLink,
      videoTitle,
      pdfLink,
    });

    await newCourse.save();

    res.status(201).json({ message: 'Kurs uspešno dodat.', course: newCourse });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Serverska greška pri dodavanju kursa.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'Korisnik nije pronađen.' });
    }

    const currentDate = new Date().toISOString().split('T')[0];
    if (user.expirationDate < currentDate) {
      return res.status(403).send({
        error:
          'Vaš nalog je istekao. Molimo Vas da obnovite pretplatu da biste pristupili platformi.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Nevažeća lozinka' });
    }

    const deviceId = generateDeviceId(req); // Unique device fingerprint

    const activeDevicesCount = await client.get(`user:${email}:device_count`);

    if (parseInt(activeDevicesCount) >= MAX_DEVICES) {
      return res.status(403).send({
        error:
          'Dostignut je maksimalan broj uređaja. Možete se prijavljivati sa najviše 2 uređaja.',
      });
    }

    const activeDevices = await client.lRange(`user:${email}:devices`, 0, -1);
    if (activeDevices.includes(deviceId)) {
      const token = jwt.sign(
        { userId: user._id, expirationDate: user.expirationDate, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '6h' }
      );

      return res.status(200).send({
        message: 'Usešna prijava',
        token,
        isConfirmed: user.isConfirmed,
        isAdmin: user.isAdmin,
      });
    }

    await client.rPush(`user:${email}:devices`, deviceId);
    await client.incr(`user:${email}:device_count`); // Increment device count

    const token = jwt.sign(
      { userId: user._id, expirationDate: user.expirationDate, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '6h' }
    );

    res.status(200).send({
      message: 'Uspešna prijava',
      token,
      isConfirmed: user.isConfirmed,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ error: 'Serverska greška pri prijavi korisnika.' });
  }
});

// Fetch user profile data
app.get('/api/user', verifyToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: 'Korisnik nije pronađen.' });
    }

    res.status(200).send({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      creationDate: user.creationDate,
      expireDate: user.expirationDate,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send({ error: 'Serverska preška pri dobavljanju korisničkih podataka.' });
  }
});

app.post('/api/request-password-change', async (req, res) => {
  const { emailL } = req.body;
  const email = emailL;

  if (!email) {
    return res.status(400).json({ error: 'Email je obavezan.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Korisnik nije pronađen.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password/token=${token}`;

    const msg = {
      to: email,
      from: process.env.EMAIL_SENDER,
      templateId: process.env.EMAIL_TEMPLATE_PASSWORD_RESET,
      dynamic_template_data: {
        resetUrl: resetUrl, // Dynamic data for the template
      },
    };

    await sgMail.send(msg); // Send the email via SendGrid

    res.status(200).json({
      message: 'Link za promenu lozinke je uspešno poslat na Vašu email adresu.',
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: 'Greška pri slanju linka za promenu lozinke.' });
    }
  }
});

// Registration Route
app.post('/api/register', isAdmin, validateRegistration, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, firstName, lastName, courseName } = req.body;

  if (!email || !password || !firstName || !lastName || !courseName) {
    return res.status(400).json({ error: 'Sva polja (uključujući naziv kursa) su obavezna.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Korisnik već postoji.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const today = new Date();
    const expiration = new Date(today);
    expiration.setMonth(expiration.getMonth() + 2); // Expiry set to 2 months

    const creationDate = today.toISOString().split('T')[0];
    const expirationDate = expiration.toISOString().split('T')[0];

    const defaultProfilePicture =
      'https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid';

    const course = {
      courseName,
      courseCreationDate: creationDate,
      courseExpirationDate: expirationDate,
    };

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      courses: [course],
      creationDate,
      expirationDate,
      profilePicture: defaultProfilePicture,
      isConfirmed: false,
    });

    const confirmationToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    const confirmationLink = `${process.env.FRONTEND_URL}/auth/confirm/token=${confirmationToken}`;

    const msg = {
      to: email,
      from: process.env.EMAIL_SENDER,
      templateId: process.env.EMAIL_TEMPLATE_CONFIRM_REG,
      dynamic_template_data: {
        confirmationLink: confirmationLink,
      },
    };

    await sgMail.send(msg);
    await newUser.save();

    res.status(200).json({
      message: 'Uspešna registracija. Link za potvrdu registracije uspešno poslat na email adresu.',
    });
  } catch (err) {
    console.error('Error in registration:', err);
    res.status(500).json({ error: 'Greška pri registrovanju korisnika.' });
  }
});

// Email Confirmation Route
app.get('/api/confirm-email', async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByIdAndUpdate(decoded.userId, { isConfirmed: true });

    if (!user) {
      return res.status(400).json({ error: 'Korisnik nije pronađen.' });
    }

    res.status(200).json({ message: 'Uspešna potvrda email adrese!' });
  } catch (err) {
    console.error('Error in email confirmation:', err);
    res.status(400).json({ error: 'Nevažeći ili istekli token.' });
  }
});

// Confirm Password Change and Update Password
app.post('/api/confirm-password-change', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token i nova lozinka su obavezni.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'Korisnik nije pronađen.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      message: 'Uspešna promena lozinke. Možete se prijaviti na Vaš nalog.',
    });
  } catch (error) {
    console.error('Error confirming password change:', error);
    res.status(500).json({ error: 'Serverska greška pri potvrdi nove lozinke.' });
  }
});

app.post('/api/add-course', isAdmin, async (req, res) => {
  try {
    const { email, courseName } = req.body;

    if (!email || typeof courseName !== 'string' || !courseName.trim()) {
      return res.status(400).json({ error: 'Nevažeća email adresa ili naziv kursa.' });
    }

    const today = new Date().toISOString().split('T')[0];
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 4);
    const expirationDateString = expirationDate.toISOString().split('T')[0];

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Korisnik nije pronadjen.' });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Nemate dozvolu da dodate kurs.' });
    }

    const newCourse = {
      courseName: courseName.trim(),
      courseCreationDate: today,
      courseExpirationDate: expirationDateString,
    };

    user.courses.push(newCourse);
    user.expirationDate = expirationDateString;

    await user.save();

    res.status(200).json({ message: 'Kurs uspešno dodat korisniku.' });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Serverska greška' });
  }
});

// Route to delete a course from the user's courses
app.delete('/api/user/courses/:courseName', verifyToken, async (req, res) => {
  console.log('Deleting course...');
  try {
    const { courseName } = req.params;
    const userId = req.user.userId;

    if (!courseName) {
      return res.status(400).send({ error: 'Naziv kursa je obavezan.' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'courses.courseName': courseName },
      {
        $pull: {
          courses: { courseName: courseName },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({
        error: 'Kurs nije pronadjen ili nemate dozvolu da ga obrišete.',
      });
    }

    res.send({ message: 'Kurs uspešno obrisan.' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).send({ error: 'Serverska greška.' });
  }
});

app.post('/api/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ error: 'Nova lozinka je obavezna.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'Korisnik nije pronadjen.' });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.password = newPasswordHash;
    await user.save();

    res.status(200).json({ message: 'Lozinka uspešno promenjena' });
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(400).json({ error: 'Nevažeći ili istekli token.' });
  }
});

// Start the Server
app.listen(process.env.PORT || 5001, () =>
  console.log(`Server running on port: ${process.env.PORT}`)
);