import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { tokenContext } from "../../context/tokenContext";
import { cartContext } from "../../context/cartContext";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { token, setToken } = useContext(tokenContext);
  const { numOfCartItems } = useContext(cartContext);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setToken(null);
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-[#f2f2f2] border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex gap-3 items-center justify-between w-full md:w-auto">
          <Link to="/" className="flex items-center">
            <img src={logo} width="200px" alt="FreshCart Logo" />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:flex md:w-auto sm:py-7 md:py-0 w-full mt-4 md:mt-0`}
          id="navbar-default"
        >
          {token && (
            <ul className="flex flex-col md:flex-row md:space-x-6">
              <li>
                <NavLink to="home" className="py-2 px-3 text-gray-900 dark:text-white nav-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="products" className="py-2 px-3 text-gray-900 dark:text-white nav-link">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="categories" className="py-2 px-3 text-gray-900 dark:text-white nav-link">
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink to="brands" className="py-2 px-3 text-gray-900 dark:text-white nav-link">
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink to="cart" className="py-2 px-3 text-gray-900 dark:text-white nav-link">
                  <i className="fa-solid fa-cart-shopping fa-lg"></i>
                  <span className="px-1">{numOfCartItems}</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="wishlist" className="py-2 px-3 text-gray-900 dark:text-white nav-link">
                  <i className="fa-solid fa-heart fa-lg"></i>
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        <div className="flex gap-4 items-center mt-4 md:mt-0">
          <ul className="flex gap-3 text-gray-700 dark:text-gray-400">
            <li>
              <i className="fa-brands fa-instagram"></i>
            </li>
            <li>
              <i className="fa-brands fa-facebook"></i>
            </li>
            <li>
              <i className="fa-brands fa-tiktok"></i>
            </li>
            <li>
              <i className="fa-brands fa-twitter"></i>
            </li>
            <li>
              <i className="fa-brands fa-linkedin"></i>
            </li>
            <li>
              <i className="fa-brands fa-youtube"></i>
            </li>
          </ul>
          <ul className="flex gap-3">
            {token ? (
              <li>
                <button onClick={() => setIsModalOpen(true)} className="hover:text-red-600">
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="register" className="hover:text-main">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="login" className="hover:text-main">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-96">
            <h3 className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="text-white bg-main px-5 py-2.5 rounded-lg"
                onClick={handleLogout}
              >
                Yes, I'm sure
              </button>
              <button
                className="px-5 py-2.5 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
