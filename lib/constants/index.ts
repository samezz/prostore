export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Prostore';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A modern store built with Next.js';

// this is important when you deploy the app (not: 'http://localhost:3000')
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

  export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 8;

  export const signInDefaultValues = {
    email: 'samir@example.com',
    password:'password',

  }

export const signUpDefaultValues = {
  name: 'Samir Ezziyani',
  email: 'samir@example.com',
  password: 'password',
  confirmPassword: 'password',
};

// empty strings before deploy
export const shippingAddressDefaultValues = {
  fullName: 'John Doe',
  streetAddress: '123 Main St',
  city: 'Anytown',
  postalCode: '12345',
  country: 'Sweden',
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(', ')
  : ['PayPal', 'Stripe', 'CashOnDelivery'];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';


// pagination
  export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;