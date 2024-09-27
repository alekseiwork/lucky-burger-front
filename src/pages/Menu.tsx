import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { OrderContext } from '../context/OrderContext';

interface MenuItem {
  name: string;
  nameRU: string;
  nameEN: string;
  portion?: number;
  weight?: number;
  price: number;
  category: string;
}

function Menu() {
  const { selectedItems, addItem, updateItem } = useContext(OrderContext)!;
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>([]);

  const location = useLocation(); // вызов useLocation здесь

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          'https://alternative-corry-greencat-43a4eefc.koyeb.app/api/menu'
        );
        setMenuItems(response.data);
        setLoading(false);
        const uniqueCategories: string[] = [
          'All',
          ...Array.from(
            new Set<string>(
              response.data.map((item: MenuItem) => item.category)
            )
          ),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load the menu.');
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredMenuItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const handleAddItem = (item: MenuItem) => {
    addItem({ name: item.name, quantity: 1, price: item.price });
  };

  const handleIncrementItem = (item: MenuItem) => {
    const currentQuantity =
      selectedItems.find((i) => i.name === item.name)?.quantity || 0;
    updateItem(item.name, currentQuantity + 1);
  };

  const handleDecrementItem = (item: MenuItem) => {
    const currentQuantity =
      selectedItems.find((i) => i.name === item.name)?.quantity || 0;
    updateItem(item.name, currentQuantity - 1);
  };

  const getItemQuantity = (itemName: string) => {
    const item = selectedItems.find((item) => item.name === itemName);
    return item ? item.quantity : 0;
  };

  const isButtonDisabled = selectedItems.length === 0;

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <div
          className="absolute z-0 inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/background.jpg')",
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
        <p className="text-center text-yellow-400 relative">Loading menu...</p>;
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="relative min-h-screen">
      {/* background and shadow */}
      <div
        className="absolute z-0 inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      <div className="relative min-h-screen">
        <Header currentPath={location.pathname} />
        <main className="text-center mx-auto">
          <h2 className="text-4xl uppercase font-serif text-yellow-400 my-5">
            Menu
          </h2>
          {/* Category Buttons */}
          <div className="">
            <div className="flex justify-center">
              <div className="flex mx-8 flex-nowrap overflow-auto items-center rounded-full border border-gray-400 p-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 mx-1 rounded-full ${
                      selectedCategory === category
                        ? 'border-2 border-yellow-400 text-yellow-400 font-semibold'
                        : 'text-gray-300'
                    } hover:bg-gray-700 transition-colors duration-100`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="min-h-screen">
            <div className="flex flex-col">
              <div className="flex flex-wrap my-4 mt-6 mx-auto lg:max-w-[1080px] justify-center gap-6">
                {filteredMenuItems.map((item) => (
                  <div
                    key={item.name}
                    className={`max-w-80 min-w-80 flex md:flex-col bg-gray-700 bg-opacity-75 text-left p-4 rounded-lg`}
                  >
                    <div className="flex-[65]">
                      <h3 className="text-2xl text-yellow-400 mb-2">
                        {item.name}
                      </h3>
                      <div>
                        <p className="text-gray-300 mb-1">
                          {item.nameRU} / {item.nameEN}
                        </p>
                      </div>
                      <div className="mt-auto">
                        {item.portion && (
                          <p className="text-gray-400">
                            Portion: {item.portion} pcs
                          </p>
                        )}
                        {item.weight && (
                          <p className="text-gray-400">
                            Weight: {item.weight}g
                          </p>
                        )}
                        <p className="text-gray-300 mt-2">
                          Price: €{item.price}
                        </p>
                      </div>
                    </div>
                    <div className="min-w-[105px] flex-[35] flex md:flex-col justify-end md:text-center md:m-auto my-auto ml-auto text-right">
                      {getItemQuantity(item.name) === 0 ? (
                        <button
                          onClick={() => handleAddItem(item)}
                          className="bg-yellow-400 text-gray-900 px-4 py-2 md:max-w-none rounded-lg shadow hover:bg-yellow-500"
                        >
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => handleDecrementItem(item)}
                            className="bg-yellow-400 text-gray-900 px-3 py-2 rounded-lg shadow hover:bg-yellow-500"
                          >
                            -
                          </button>
                          <span className="mx-4 text-lg text-gray-300">
                            {getItemQuantity(item.name)}
                          </span>
                          <button
                            onClick={() => handleIncrementItem(item)}
                            className="bg-yellow-400 text-gray-900 px-3 py-2 rounded-lg shadow hover:bg-yellow-500"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center my-8">
                <Link to="/order" className="inline-block">
                  <button
                    className={`px-4 py-2 rounded-lg shadow ${
                      isButtonDisabled
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                    }`}
                    disabled={isButtonDisabled}
                  >
                    Complete order
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Menu;
