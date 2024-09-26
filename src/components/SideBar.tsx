import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="max-w-[120px] min-w-[120px] bg-gray-800 min-h-screen p-4">
      <ul className="space-y-2 text-gray-200 mt-14">
        <li>
          <NavLink
            to="/admin-dashboard/menu-list"
            className={({ isActive }) =>
              `block p-2 rounded-lg ${
                isActive
                  ? 'bg-yellow-500 text-gray-700'
                  : 'hover:bg-yellow-600 hover:text-gray-700'
              }`
            }
          >
            Menu List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin-dashboard/add-menu-item"
            className={({ isActive }) =>
              `block p-2 rounded-lg ${
                isActive
                  ? 'bg-yellow-500 text-gray-700'
                  : 'hover:bg-yellow-600 hover:text-gray-700'
              }`
            }
          >
            Add Menu Item
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin-dashboard/track-orders"
            className={({ isActive }) =>
              `block p-2 rounded-lg ${
                isActive
                  ? 'bg-yellow-500 text-gray-700'
                  : 'hover:bg-yellow-600 hover:text-gray-700'
              }`
            }
          >
            Track Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin-dashboard/register"
            className={({ isActive }) =>
              `block p-2 rounded-lg ${
                isActive
                  ? 'bg-yellow-500 text-gray-700'
                  : 'hover:bg-yellow-600 hover:text-gray-700'
              }`
            }
          >
            Register Admin
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
