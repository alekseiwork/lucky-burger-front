import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'https://alternative-corry-greencat-43a4eefc.koyeb.app/api/admin/register',
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adding Authorization header
          },
        }
      );

      // If registration is successful, perform login
      if (response.status === 201) {
        setSuccess('Admin registered successfully!');
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      }
    } catch (err: unknown) {
      if (err instanceof Error) return setError(err.message);
      setError('An unknown error occurred');
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-4xl mb-4 text-yellow-400 text-center">
          Admin Registration
        </h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}{' '}
          {/* Success message */}
          <div className="mb-4">
            <label className="block text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
