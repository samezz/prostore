import { auth } from '@/auth';
import Link from 'next/link';

export default async function UserPage() {
  const session = await auth();
  if (!session) {
    return (
      <div className='p-8 text-center'>
        <p>Please sign in to access your account.</p>
        <Link href='/sign-in' className='text-blue-500 hover:underline'>Sign In</Link>
      </div>
    );
  }
  return (
    <div className='p-8 text-center'>
      <h1 className='text-2xl font-bold mb-4'>My Account</h1>
      <nav className='space-y-2'>
        <Link href='/user/profile' className='block text-blue-500 hover:underline'>Profile</Link>
        <Link href='/user/orders' className='block text-blue-500 hover:underline'>Order History</Link>
      </nav>
    </div>
  );
}
