import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddMenuItem() {
  const [name, setName] = useState('');
  const [nameRU, setNameRU] = useState('');
  const [nameEN, setNameEN] = useState('');
  const [portion, setPortion] = useState<number | undefined>(undefined);
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async function (e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        'http://localhost:5000/api/menu',
        {
          name,
          nameRU,
          nameEN,
          portion,
          weight,
          price,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }
      );
      setSuccess('Menu item added successfully!');
      navigate('/admin-dashboard/menu-list');
    } catch (err) {
      setError('Failed to add menu item.');
      console.error(err); // Log the error to the console for debugging
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="relative flex flex-col items-center justify-center min-h-screen z-10">
        <h2 className="text-4xl mb-4 text-yellow-400">Add Menu Item</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div className="mb-4">
            <label className="block text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Name (RU)</label>
            <input
              type="text"
              value={nameRU}
              onChange={(e) => setNameRU(e.target.value)}
              className="w-full p-2 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Name (EN)</label>
            <input
              type="text"
              value={nameEN}
              onChange={(e) => setNameEN(e.target.value)}
              className="w-full p-2 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Portion (optional)</label>
            <input
              type="number"
              value={portion || ''}
              onChange={(e) => setPortion(Number(e.target.value) || undefined)}
              className="w-full p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Weight (optional)</label>
            <input
              type="number"
              value={weight || ''}
              onChange={(e) => setWeight(Number(e.target.value) || undefined)}
              className="w-full p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-2 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-500"
          >
            Add Menu Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMenuItem;
