import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

interface IOrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface IOrder {
  _id: string;
  name: string;
  phone: string;
  address: string;
  items: IOrderItem[];
  total: number;
  status: string;
}

const socket = io('https://alternative-corry-greencat-43a4eefc.koyeb.app'); // Connecting to the server via Socket.io

function TrackOrders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://alternative-corry-greencat-43a4eefc.koyeb.app/api/orders',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (err: unknown) {
        setError('Failed to fetch orders.');
        console.error(err);
      }
    };

    fetchOrders();

    // Listening for the new order event through the socket
    socket.on('newOrder', (newOrder: IOrder) => {
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
    });

    // Unsubscribing from events when the component is unmounted
    return () => {
      socket.off('newOrder');
    };
  }, []);

  const handleCompleteOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem('token');
      const orderToUpdate = orders.find((order) => order._id === orderId);
      const newStatus =
        orderToUpdate?.status === 'completed' ? 'pending' : 'completed';

      await axios.patch(
        `https://alternative-corry-greencat-43a4eefc.koyeb.app/api/orders/${orderId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError('Failed to update order status.');
      console.error(err);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(
        `https://alternative-corry-greencat-43a4eefc.koyeb.app/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (err) {
      setError('Failed to delete order.');
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="relative flex flex-col items-center justify-center min-h-screen z-10">
        <h2 className="text-4xl mb-4 text-yellow-400">Track Orders</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl">
          {orders.length === 0 ? (
            <p className="text-gray-300">No orders available.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li
                  key={order._id}
                  className={`md:flex border-b border-gray-600 pb-4 ${
                    order.status === 'completed' ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex flex-col">
                    <h3 className="text-yellow-400">Order ID: {order._id}</h3>
                    <p className="text-gray-300">Name: {order.name}</p>
                    <p className="text-gray-300">Phone: {order.phone}</p>
                    <p className="text-gray-300">Address: {order.address}</p>
                    <h4 className="text-gray-300">Items:</h4>
                    <ul className="pl-4">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-gray-300">
                          {item.name} x {item.quantity} - $
                          {item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                    <p className="text-yellow-400">
                      Total: ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col md:my-auto md:ml-auto items-center mt-5">
                    <div className="flex items-center md:relative">
                      <input
                        type="checkbox"
                        checked={order.status === 'completed'} // Checking status
                        onChange={() => handleCompleteOrder(order._id)}
                        className="mr-2"
                      />
                      <label className="text-gray-300">
                        {order.status === 'completed'
                          ? 'Completed'
                          : 'Mark as completed'}
                      </label>
                    </div>
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className=" text-red-500 hover:underline md:fixed md:mt-16 mt-4"
                    >
                      Delete Order
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackOrders;
