"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  session: any;
  className?: string; // mobile / desktop ke liye
}

export default function UserMenu({ session, className = "" }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // outside click close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("session", session)

  // NOT LOGGED IN
  if (!session?.user?.name) {
    return (
      <Link href="/auth/login" className={className}>
        <User className="w-6 h-6 cursor-pointer hover:scale-125 transition-all" />
      </Link>
    );
  }

  // LOGGED IN
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Profile */}
<div
  className="relative"
  onClick={() => setOpen(!open)}
>
  {/* Profile Image */}
  <Image
    src={session.user.image || "/images/defaultprofile.png"}
    alt="profile"
    width={36}
    height={36}
    className="rounded-full border cursor-pointer hover:scale-110 transition-all"
  />

  {/* Message Box */}
  {open && (
    <div className="absolute right-0 mt-4 w-56 bg-white border shadow-xl rounded-2xl z-50">
      
      {/* Arrow */}
      <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t rotate-45"></div>

      {/* User Info */}
      <div className="px-4 py-3 border-b">
        <p className="font-semibold text-sm">{session.user.name}</p>
        <p className="text-xs text-gray-500 truncate">
          {session.user.email}
        </p>
      </div>

      {/* Actions */}
      <div className="py-1">
        <Link
          href="/dashboard"
          onClick={() => setOpen(false)}
          className="block px-4 py-2 text-sm hover:bg-gray-100 transition rounded-lg mx-1"
        >
          Dashboard
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-52 text-left px-4 py-2 text-sm hover:bg-gray-100 transition rounded-lg mx-1"
        >
          Logout
        </button>
      </div>
    </div>
  )}
</div>

    </div>
  );
}
