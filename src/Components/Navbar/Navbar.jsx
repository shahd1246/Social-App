import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userToken, setUserToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed){ setUserToken(null);
      localStorage.removeItem("token");
      setIsOpen(false);
      navigate("/")}
    });
  }

  function closeMenu() {
    setIsOpen(false);
  }

  const navLinkClass = ({ isActive }) =>
    `relative block rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200
    ${
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-19 items-center justify-between">
          {/* Logo */}
          <Link
            to={userToken !== null ? "/home" : "/"}
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="10" cy="7" r="4" />
                <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>

            <span className="text-lg font-extrabold tracking-tight text-neutral-900 sm:text-xl">
              SOCIAL<span className="text-blue-600">APP</span>
            </span>
          </Link>

          {/* Desktop Links */}
          {userToken !== null && (
            <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
              <ul className="flex items-center gap-2">
                <li>
                  <NavLink to="/home" className={navLinkClass}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className={navLinkClass}>
                    Profile
                  </NavLink>
                </li>
              </ul>
            </div>
          )}

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center gap-3 md:flex">
            {userToken == null ? (
              <>
                <Link
                  to="/"
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
                >
                  Login
                </Link>

                <Link to="/register">
                  <Button className="rounded-xl bg-blue-600 px-5 font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700">
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                className="rounded-xl bg-red-50 px-5 font-semibold text-red-600 transition hover:bg-red-100"
              >
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 transition hover:bg-neutral-100 md:hidden"
          >
            {isOpen ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`grid transition-all duration-300 ease-in-out md:hidden ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-neutral-100 py-4">
              {userToken !== null && (
                <ul className="flex flex-col gap-2">
                  <li>
                    <NavLink
                      to="/home"
                      onClick={closeMenu}
                      className={navLinkClass}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile"
                      onClick={closeMenu}
                      className={navLinkClass}
                    >
                      Profile
                    </NavLink>
                  </li>
                </ul>
              )}

              <div
                className={`flex gap-3 ${
                  userToken == null ? "flex-col" : "mt-3"
                }`}
              >
                {userToken == null ? (
                  <>
                    <Link to="/" onClick={closeMenu} className="w-full">
                      <Button className="w-full rounded-xl border border-neutral-200 bg-white font-semibold text-neutral-700 hover:bg-neutral-50">
                        Login
                      </Button>
                    </Link>

                    <Link to="/register" onClick={closeMenu} className="w-full">
                      <Button className="w-full rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700">
                        Register
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-red-50 font-semibold text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
