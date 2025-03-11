import { Roboto, Poppins } from 'next/font/google';

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Add the weights you need
  variable: '--font-roboto', // Optional: CSS variable for custom use
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Add the weights you need
  variable: '--font-poppins', // Optional: CSS variable for custom use
});