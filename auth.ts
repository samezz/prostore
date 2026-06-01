import { prisma } from '@/db/prisma';
import { compareSync } from 'bcrypt-ts-edge';
import { request } from 'http';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { any } from 'zod';

const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },

      async authorize(credentials) {
        if (credentials == null) return null

        const { prisma } = await import('@/db/prisma')

        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        })

        if (user && user.password) {
          const isMatch = compareSync(credentials.password as string, user.password)
          if (isMatch) {
            return { id: user.id, name: user.name, email: user.email, role: user.role }
          }
        }
        return null
      },
    }),
  ],

  callbacks: {
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub
      session.user.name = token.name
      session.user.role = token.role
      if (trigger === 'update') {
        session.user.name = user.name
      }
      return session
    },

    async jwt({ token, user, trigger, session }: any) {
  if (user) {
    // Assign user properties to the token
    token.id = user.id;
    token.role = user.role;

    if (trigger === 'signIn' || trigger === 'signUp') {
      const cookiesObject = await cookies();
      const sessionCartId = cookiesObject.get('sessionCartId')?.value;

      if (sessionCartId) {
        const sessionCart = await prisma.cart.findFirst({
          where: { sessionCartId },
        });

        if (sessionCart) {
          // Overwrite any existing user cart
          await prisma.cart.deleteMany({
            where: { userId: user.id },
          });

          // Assign the guest cart to the logged-in user
          await prisma.cart.update({
            where: { id: sessionCart.id },
            data: { userId: user.id },
          });
        }
      }
    }
  }

  // Handle session updates (e.g., name change)
if (session?.user.name && trigger === 'update') {
  token.name = session.user.name;
}

  return token;
},

  

  authorized({ request, auth }: any) {
  // Array of regex patterns of protected paths
  const protectedPaths = [
    /\/shipping-address/,
    /\/payment-method/,
    /\/place-order/,
    /\/profile/,
    /\/user\/(.*)/,
    /\/order\/(.*)/,
    /\/admin/,
  ];

  // Get pathname from the req URL object
  const { pathname } = request.nextUrl;

  // Check if user is not authenticated and on a protected path
  if (!auth && protectedPaths.some((p) => p.test(pathname))) return false; // redirect to sign in page


      if (!request.cookies.get('sessionCartId')) {
        const sessionCartId = crypto.randomUUID()
        const newRequestHeaders = new Headers(request.headers)
        const response = NextResponse.next({
          request: { headers: newRequestHeaders },
        })
        response.cookies.set('sessionCartId', sessionCartId)
        return response
      }
      return true
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)