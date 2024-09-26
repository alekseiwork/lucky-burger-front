import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { OrderContext } from '../context/OrderContext';

function Cart() {
  const { selectedItems, updateItem, removeItem } = useContext(OrderContext)!;

  const handleIncrementItem = (itemName: string) => {
    const currentQuantity =
      selectedItems.find((i) => i.name === itemName)?.quantity || 0;
    updateItem(itemName, currentQuantity + 1);
  };

  const handleDecrementItem = (itemName: string) => {
    const currentQuantity =
      selectedItems.find((i) => i.name === itemName)?.quantity || 0;
    if (currentQuantity > 1) {
      updateItem(itemName, currentQuantity - 1);
    } else {
      removeItem(itemName); // Remove item if quantity is 0
    }
  };

  const getTotalPrice = () => {
    return selectedItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-800 text-white bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute z-0 inset-0 bg-black opacity-70"></div>

      <div className="relative flex flex-col min-h-screen">
        <div className="min-h-screen flex flex-col">
          <Header currentPath={useLocation().pathname} />
          <main className="text-center mx-auto">
            <h2 className="text-3xl uppercase font-serif text-yellow-400 my-6">
              Your Cart
            </h2>

            {selectedItems.length === 0 ? (
              <p className="text-gray-300 mb-8 text-lg">Your cart is empty.</p>
            ) : (
              <div className="flex flex-col gap-5">
                {selectedItems.map((item) => (
                  <div
                    key={item.name}
                    className="max-w-80 min-w-80 bg-gray-700 bg-opacity-75 text-left p-4 rounded-lg shadow-lg flex justify-between"
                  >
                    <div>
                      <h3 className="text-2xl text-yellow-400 mb-2 flex-wrap">
                        {item.name}
                      </h3>
                      <p className="text-gray-300">Price: €{item.price}</p>
                      <p className="text-gray-300">Quantity: {item.quantity}</p>
                    </div>

                    <div className="my-auto text-right min-w-[120px]">
                      <button
                        onClick={() => handleDecrementItem(item.name)}
                        className="bg-yellow-400 text-gray-900 px-3 py-2 rounded-lg shadow hover:bg-yellow-500"
                      >
                        -
                      </button>
                      <span className="mx-4 text-lg">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrementItem(item.name)}
                        className="bg-yellow-400 text-gray-900 px-3 py-2 rounded-lg shadow hover:bg-yellow-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <div className="text-center text-yellow-400 text-2xl">
                  Total: €{getTotalPrice()}
                </div>
              </div>
            )}

            {selectedItems.length !== 0 && (
              <div className="flex justify-center mt-4 mb-3">
                <Link to="/order" className="inline-block">
                  <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg shadow hover:bg-yellow-500 ">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            )}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Cart;
