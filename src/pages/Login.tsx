import { useState } from 'react';
import { useAuthStore } from '@/lib/store/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in a real app, this would call an API
    login('mock-token', {
      id: '1',
      name: 'Test User',
      email: email,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-6 bg-gray-950 rounded-lg shadow-md border border-gray-800">
        <h2 className="text-xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-900 border border-gray-800 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-900 border border-gray-800 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
