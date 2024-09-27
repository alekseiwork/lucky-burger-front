import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://alternative-corry-greencat-43a4eefc.koyeb.app/api/admin/login',
        {
          username,
          password,
        }
      );
      const { token } = response.data;

      // Saving token and update auth state
      login(token);
      navigate('/admin-dashboard/trackorders');
    } catch (err) {
      setError('Incorrect username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 text-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-yellow-400">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 text-gray-300" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-300" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-400 text-gray-900 rounded p-2 w-full hover:bg-yellow-500 transition duration-200"
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
