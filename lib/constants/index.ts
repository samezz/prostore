export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Prostore';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A modern store built with Next.js';

// this is important when you deploy the app (not: 'http://localhost:3000')
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

  export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 8;

  export const signInDefaultValues = {
    email: '',
    password:'',

  }

export const signUpDefaultValues = {
  name: 'Samir Ezziyani',
  email: 'samir@example.com',
  password: 'password',
  confirmPassword: 'password',
};