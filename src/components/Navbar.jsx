import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MapPin } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
import { CgClose } from "react-icons/cg";
import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import ResponseMenu from "./ResponseMenu";

const Navbar = ({ location, getLocation, openDropDown, setOpenDropDown }) => {

  const {cartItem}=useContext(CartContext);

  const [openNav,setOpenNav] =useState(false);
  
  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };
  return (
    <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
      <div className="max-w-6xl mx-auto py-3 flex justify-between items-center">
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">T</span>ekzo
            </h1>
          </Link>
          <div className="flex gap-2  cursor-pointer text-gray-700 items-center">
            <MapPin className="text-red-500" />
            <span className="font-semibold">
              {location ? (
                <div>
                  <p>{location.country}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>
            <FaCaretDown onClick={toggleDropDown} />
          </div>
          {openDropDown ? (
            <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold mb-4 text-2xl flex justify-between ">
                Change Location
                <CgClose onClick={toggleDropDown} />
              </h1>
              <button
                onClick={getLocation}
                className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400"
              >
                Detect my location
              </button>
            </div>
          ) : null}
        </div>
        <nav className="flex gap-7  items-center">
          <ul className="md:flex gap-7 items-center font-semibold text-xl hidden">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all  border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all  border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all  border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all  border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              {" "}
              <li>Contact</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className="relative py-1.5">
            <IoCartOutline className="w-7 h-7" />
            <span className="bg-red-500 text-white px-2 rounded-full absolute -top-1.5 -right-3">{cartItem.length}
            </span>
          </Link>
          <div className="hidden md:block">
       
              <SignedOut>
                <SignInButton className="bg-red-500 text-white rounded-xl px-4 py-2" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
        
          </div>
          {
            openNav? <HiMenuAlt1 onClick={()=>setOpenNav(false)} className="h-7 w-7 md:hidden" /> : <HiMenuAlt3 onClick={()=>setOpenNav(true)} className="h-7 w-7 md:hidden"  />
          }
        </nav>
      </div>
      <ResponseMenu openNav={openNav} setOpenNav={setOpenNav}/>
    </div>
  );
};

export default Navbar;
