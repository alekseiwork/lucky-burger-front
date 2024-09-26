import React, { useState, useEffect, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Order() {
  const { selectedItems, clearItems, removeItem } = useContext(OrderContext)!;
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [total, setTotal] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const totalCost = Number(
      selectedItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    );
    setTotal(totalCost);
  }, [selectedItems]);

  // Handler for order submition
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (total === 0) return setStatusMessage('You need to choose something 😉');

    const orderData = {
      name,
      phone,
      address,
      items: selectedItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/orders',
        orderData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        setStatusMessage('Order created successfully!');
        setName('');
        setPhone('');
        setAddress('');
        clearItems();
        setTimeout(() => navigate('/menu'), 3000);
      } else {
        setStatusMessage('Failed to create order.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('An error occurred while creating the order.');
    }
  };

  // Displaying chosen menus with option to remove item
  const renderSelectedItems = () => {
    return selectedItems.length === 0 ? (
      <p className="text-gray-300">No items selected yet.</p>
    ) : (
      <ul className="text-gray-300 min-w-64">
        {selectedItems.map((item) => (
          <li key={item.name} className="flex justify-between items-center">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span className="pl-5 ml-auto">{item.price}€</span>
            <button
              onClick={() => removeItem(item.name)}
              className="text-white py-1 rounded-[50px] border-white pl-2 hover:scale-125"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-white p-4">
      <h2 className="text-2xl uppercase font-serif text-yellow-400 mb-6 text-center">
        Complete your order
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-lg mx-auto mt-5"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 mb-1">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-600 p-2 w-full bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-300 mb-1">
            Phone:
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-600 p-2 w-full bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-300 mb-1">
            Address:
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-600 p-2 w-full bg-gray-700 text-white"
            required
          />
        </div>

        {/* Displaying chosen menus */}
        <div className="mb-4">
          <h3 className="text-gray-300 mb-2">Selected Items:</h3>
          {renderSelectedItems()}
        </div>

        <div className="mb-4">
          <h3 className="text-gray-300 mb-2">Total: €{total}</h3>
        </div>

        <button
          type="submit"
          className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 text-xl font-semibold"
        >
          Submit Order
        </button>
      </form>
      <div className="flex justify-center mt-4">
        <Link to="/menu" className="text-gray-300">
          <span className="">Back to menu</span>
        </Link>
      </div>

      {statusMessage && <p className="mt-4 text-center">{statusMessage}</p>}
    </div>
  );
}

export default Order;
