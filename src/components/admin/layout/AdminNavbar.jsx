import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthContext } from "../../../contexts/AuthProvider";
import API from "../../../utils/API";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useUIContext } from "../../../contexts/UIProvider";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const { setAdminNavbarOpen } = useUIContext();

  function handleLogout() {
    axios
      .get("/logout")
      .then((res) => {
        setUser(res.data.user);
        Swal.fire("Success", "Successfully Logged out", "success");
        navigate("/");
      })
      .catch((err) => {});
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed z-20 w-full">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8 navbar">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
              <button
                className="lg:hidden mr-4"
                onClick={() => {
                  setAdminNavbarOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faBars} className="text-white" />
              </button>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <strong className="text-white">Interface Admin</strong>
                </div>
              </div>
              {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a href="#" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a href="#" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={(e) => {
                              handleLogout(e);
                            }}
                            className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div> */}
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
