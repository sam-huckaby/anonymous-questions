'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LockKeyholeIcon } from 'lucide-react';
import { LoadingDots } from '@/components/ui/Loading';
import { setAuthCookie } from '@/lib/auth';
import { checkPasswordAction } from '@/lib/actions';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Server action to check the password
      const formData = new FormData();
      formData.append('password', password);
      const result = await checkPasswordAction(formData);

      if (result.success) {
        // Set auth cookie and redirect to main page
        setAuthCookie(password);
        router.push('/');
      } else {
        setError(result.error || 'Invalid password');
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="flex flex-col items-center justify-center space-y-6 p-6 bg-card rounded-lg shadow-lg">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
          <LockKeyholeIcon className="h-8 w-8" />
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Protected Area</h1>
          <p className="text-muted-foreground">Enter the password to access this content</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex justify-center items-center w-full h-10 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
          >
            {isLoading ? <LoadingDots /> : 'Enter'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
