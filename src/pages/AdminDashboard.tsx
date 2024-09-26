import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddMenuItem from './AddMenuItem';
import TrackOrders from './TrackOrders';
import MenuList from './MenuList';
import Register from './Register';
import Sidebar from '../components/SideBar';
import { useAuth } from '../context/AuthContext';
import { TiThMenu } from 'react-icons/ti';

function AdminDashboard() {
  const { isAuthenticated } = useAuth(); // Getting authentication status
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State to control sidebar visibility

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex max-h-screen">
      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="relative z-10">
          <Sidebar />
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className={
          isSidebarVisible
            ? 'fixed top-4 left-4 z-20 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow hover:bg-yellow-600 border-[1px] border-transparent'
            : 'fixed top-4 left-4 z-20 bg-transparent text-yellow-400 border-yellow-400 px-4 py-2 rounded-lg shadow hover:bg-yellow-600 hover:text-gray-900 border-[1px] hover:border-yellow-600'
        }
      >
        {isSidebarVisible ? <TiThMenu /> : <TiThMenu />}
      </button>

      {/* Background image */}
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

      {/* Main content area */}
      <div className="flex-grow bg-gray-800 overflow-auto">
        <Routes>
          <Route
            path="add-menu-item"
            element={
              isAuthenticated ? <AddMenuItem /> : <Navigate to="/login" />
            }
          />
          <Route
            path="track-orders"
            element={
              isAuthenticated ? <TrackOrders /> : <Navigate to="/login" />
            }
          />
          <Route
            path="menu-list"
            element={isAuthenticated ? <MenuList /> : <Navigate to="/login" />}
          />
          <Route
            path="register"
            element={isAuthenticated ? <Register /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
