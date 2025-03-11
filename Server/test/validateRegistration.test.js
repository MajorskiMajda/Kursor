const request = require("supertest");
const { body, validationResult } = require("express-validator");
const express = require("express");

//npx jest validateRegistration.test.js

const { validateRegistration } = require("../server"); // Adjust the path

// Create a mock Express app for testing
const app = express();
app.use(express.json());

// Mock route to test the validation middleware
app.post("/register", validateRegistration, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.status(200).json({ message: "Registration successful" });
});

// Test suite for validateRegistration middleware
describe("validateRegistration Middleware", () => {
  it("should pass validation for valid input", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: "test@example.com",
        password: "Password1!",
        firstName: "John",
        lastName: "Doe",
        courseName: "Mathematics",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Registration successful");
  });

  it("should fail validation for invalid email", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: "invalid-email",
        password: "Password1!",
        firstName: "John",
        lastName: "Doe",
        courseName: "Mathematics",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Please provide a valid email address",
        }),
      ])
    );
  });

  it("should fail validation for short password", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: "test@example.com",
        password: "short",
        firstName: "John",
        lastName: "Doe",
        courseName: "Mathematics",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Password must be at least 8 characters long",
        }),
      ])
    );
  });

  it("should fail validation for password without a number", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: "test@example.com",
        password: "Password!",
        firstName: "John",
        lastName: "Doe",
        courseName: "Mathematics",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Password must contain at least one number",
        }),
      ])
    );
  });

  it("should fail validation for password without a special character", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: "test@example.com",
        password: "Password1",
        firstName: "John",
        lastName: "Doe",
        courseName: "Mathematics",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Password must contain at least one special character",
        }),
      ])
    );
  });

  it("should fail validation for missing first name", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: "test@example.com",
        password: "Password1!",
        lastName: "Doe",
        courseName: "Mathematics",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "First name is required",
        }),
      ])
    );
  });

  it("should fail validation for missing last name", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: "test@example.com",
        password: "Password1!",
        firstName: "John",
        courseName: "Mathematics",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Last name is required",
        }),
      ])
    );
  });

  it("should fail validation for missing course name", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: "test@example.com",
        password: "Password1!",
        firstName: "John",
        lastName: "Doe",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Course name is required",
        }),
      ])
    );
  });
});