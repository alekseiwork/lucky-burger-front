import { useEffect, useState } from 'react';
import axios from 'axios';

interface MenuItem {
  _id: string;
  name: string;
  nameRU: string;
  nameEN: string;
  portion?: number;
  weight?: number;
  price: number;
  category: string;
}

function MenuList() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>([]);

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

  const deleteItem = async (item: MenuItem) => {
    try {
      const token = localStorage.getItem('token');
      // Отправляем запрос на удаление с ID элемента
      await axios.delete(
        `https://alternative-corry-greencat-43a4eefc.koyeb.app/api/menu/${item._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }
      );
      console.log(`Menu item with ID: ${item._id} has been deleted`);

      // Обновляем состояние, удаляя удалённый элемент
      setMenuItems((prevItems) =>
        prevItems.filter((menuItem) => menuItem._id !== item._id)
      );
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category !== item.category)
      );
    } catch (err) {
      setError('Failed to delete the menu item.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <p className="mt-5 text-center text-yellow-400 z-50">Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

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

      <div className="relative min-h-screen">
        <main className="text-center mx-auto">
          <h2 className="text-4xl text-yellow-400 my-5">Menu</h2>

          {/* Кнопки для категорий */}
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

          {/* Элементы меню */}
          <div className="min-h-screen">
            <div className="flex flex-col">
              <div className="flex flex-wrap my-4 mt-6 mx-auto lg:max-w-[1080px] justify-center gap-6">
                {filteredMenuItems.map((item) => (
                  <div
                    key={item._id} // Используем _id как ключ
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
                      <button
                        onClick={() => deleteItem(item)} // Вызов функции удаления
                        className="bg-yellow-400 text-gray-900 px-4 py-2 md:max-w-none rounded-lg shadow hover:bg-yellow-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MenuList;
