import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCartArrowDown } from 'react-icons/fa';
import { OrderContext } from '../context/OrderContext';

function Header({ currentPath }: { currentPath?: string }) {
  const { selectedItems } = useContext(OrderContext)!;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Устанавливаем порог для изменения прозрачности
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={
        currentPath === '/menu'
          ? `sticky top-0 z-50 font-serif uppercase text-yellow-400 p-4 flex justify-between min-h-[70px] items-center transition-opacity duration-300 ${
              isScrolled
                ? 'bg-gray-900 bg-opacity-75'
                : 'bg-gray-900 bg-opacity-100'
            }`
          : 'font-serif uppercase bg-gray-900 text-yellow-400 p-4 flex justify-between min-h-[70px] items-center'
      }
    >
      <div>
        <Link to="/" className="inline-block">
          <h1 className="text-[20px] tracking-wider">Lucky Burgers</h1>
        </Link>
      </div>
      <div>
        {currentPath === '/cart' && (
          <div>
            <Link to="/menu">
              <p className="text-lg">Menu</p>
            </Link>
          </div>
        )}

        {currentPath !== '/cart' && (
          <div className="flex items-center gap-2">
            {selectedItems.length !== 0 && (
              <div className="relative flex items-center">
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {selectedItems.length}
                </span>
                <Link to="/cart" className="inline-block">
                  <div className="flex items-center justify-center border-2 border-yellow-400 rounded-full px-3 py-1">
                    <FaCartArrowDown className="text-[20px] mr-1" />
                  </div>
                </Link>
              </div>
            )}
            {selectedItems.length === 0 && (
              <Link to="/cart" className="inline-block">
                <div className="flex items-center justify-center border-2 border-yellow-400 rounded-full px-3 py-1">
                  <FaCartArrowDown className="text-[20px] mr-1" />
                </div>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
