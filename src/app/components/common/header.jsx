'use client'
import logo from "../common/util/mainLogo.png";
import Link from "next/link";
import { Heart, Search, ShoppingCart, User, Menu, X, Contact, Info, Store, House } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log("logo image was comming", logo)

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between w-full py-3">
        <div className="transition-all duration-500 hover:scale-110">
          <Link href="/">
            <div className="cursor-pointer flex justify-between items-center font-bold">
              <Image src={logo} alt="Logo" className="w-full h-6 lg:w-16 lg:h-7" />
              <div className="text-black text-2xl lg:text-3xl">Furniro</div>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {!isMenuOpen && <Menu className="w-6 h-6" />}
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-14">
            <li>
              <Link 
                className="transition-all duration-300 hover:scale-125 inline-block" 
                href="#"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                className="transition-all duration-300 hover:scale-110 inline-block" 
                href="#"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link 
                className="transition-all duration-300 hover:scale-110 inline-block" 
                href="#"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                className="transition-all duration-300 hover:scale-110 inline-block" 
                href="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Icons - Desktop */}
        <div className="hidden lg:flex items-center gap-9 text-gray-600">
          <Link href="/about"><User className="w-6 h-6 cursor-pointer hover:text-black transition-all duration-300 hover:scale-125 inline-block" /></Link>
          <Search className="w-6 h-6 cursor-pointer hover:text-black transition-all duration-300 hover:scale-125 inline-block" />
          <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-black transition-all duration-300 hover:scale-125 inline-block" />
          <Heart className="w-6 h-6 cursor-pointer hover:text-black transition-all duration-300 hover:scale-125 inline-block" />
        </div>

        {/* Navigation - Mobile */}
        <div className={`fixed top-0 right-0 h-full w-[50%] z-10 bg-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 lg:hidden shadow-lg p-8`}>
          {/* Close Button */}
          <button 
            className="absolute top-3 right-6"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Mobile Menu Items */}
          <div className="flex flex-col items-start mt-10 gap-4">
            <Link href="#" className="text-xl hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
            <div className="flex items-center gap-3">
             <House className="w-6 h-6" /><span> Home </span>
            </div>
            </Link>
            <Link href="#" className="text-xl hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
            <div className="flex items-center gap-3">
             <Store className="w-6 h-6" /><span> Shop </span>
            </div>
            </Link>
            <Link href="#" className="text-xl hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
            <div className="flex items-center gap-3">
             <Info className="w-6 h-6" /><span> About </span>
            </div>
            </Link>
            <Link href="/contact" className="text-xl hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
            <div className="flex items-center gap-3">
             <Contact className="w-6 h-6" /><span> Contact </span>
            </div>
            </Link>
            
            {/* Mobile Icons */}
            <div className="flex flex-col items-start gap-4">
              <Link href="#" className="text-xl hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-all duration-300 hover:scale-125" />
                <span>Account</span>
              </div>
                </Link>
              <Link href="#" className="text-xl hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-3">
                <Search className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-all duration-300 hover:scale-125" />
                <span>Search</span>
              </div>
                </Link>
              <Link href="#" className="text-xl hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-all duration-300 hover:scale-125" />
                <span>Cart</span>
              </div>
                </Link>
              <Link href="#" className="text-xl hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-all duration-300 hover:scale-125" />
                <span>Wishlist</span>
              </div>
                </Link>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}