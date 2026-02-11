"use client";

import logo from "../common/util/mainLogo.png";
import Link from "next/link";
import {
  Heart,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Contact,
  Info,
  Store,
  House,
  UserLock,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import AddToCartButton from "./addToCartButton";
import { useSession, signOut } from "next-auth/react";
import UserMenu from "./UserMenu";

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/home", label: "Home", icon: House },
    { href: "/shop", label: "Shop", icon: Store },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Contact },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between w-full py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image src={logo} alt="Logo" className="w-16 h-7" />
          <span className="text-2xl">Furniro</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-50"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex gap-12">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:scale-110 inline-block">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-6">
          <Search className="w-6 h-6 cursor-pointer" />
          <AddToCartButton />
          <Heart className="w-6 h-6 cursor-pointer" />
          <UserMenu session={session} />
        </div>

        {/* ================= MOBILE SIDEBAR ================= */}
        <div
          className={`fixed top-0 right-0 h-full w-[70%] bg-white z-40 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 shadow-xl`}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <X />
          </button>

          {/* Menu Items */}
          <div className="mt-16 flex flex-col gap-5 px-6">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 text-lg"
                >
                  <Icon className="w-5 h-5" />
                  {l.label}
                </Link>
              );
            })}

            <div className="border-t pt-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5" />
                <span>Search</span>
              </div>
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </div>
            </div>
          </div>

          {/* ===== MOBILE USER SECTION (BOTTOM) ===== */}
          <div className="absolute bottom-6 left-0 w-full px-6 border-t pt-4">
            {session?.user ? (
              <div className="flex items-center justify-between">
                {/* User Info */}
                <div>
                  <p className="text-sm font-semibold">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session.user.email}
                  </p>
                </div>

                {/* Logout Icon */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between"
              >
                <span className="text-sm font-medium">Login</span>
                <UserLock className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
