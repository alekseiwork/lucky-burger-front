import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      {/* Background shadow */}
      <div className="absolute z-0 inset-0 bg-black opacity-70"></div>

      <div className="relative flex flex-col min-h-screen ">
        <Header />
        <main className="flex-grow flex flex-col justify-center p-4 text-center max-w-4xl mx-auto">
          <h2 className="text-5xl uppercase font-serif text-yellow-400 mb-6">
            Welcome to Lucky Burgers!
          </h2>

          <p className="text-xl text-gray-300 mb-8 ">
            Best burgers in town. Check out our menu and place your order!
          </p>
          <div className="flex justify-center">
            <Link to="/menu" className="inline-block">
              <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 text-xl font-semibold uppercase tracking-wider fontse">
                Menu
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
