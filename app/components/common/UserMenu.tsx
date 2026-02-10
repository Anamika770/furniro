import Image from "next/image";
import Link from "next/link";
import { User, UserLock } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  session: any;
  className?: string;
}

export default function UserMenu({ session, className = "" }: UserMenuProps) {
  // NOT LOGGED IN
  if (!session?.user?.name) {
    return (
      <Link href="/auth/login" className={className}>
        <UserLock className="w-6 h-6 cursor-pointer hover:scale-125 transition-all" />
      </Link>
    );
  }

  // LOGGED IN
  return (
    <div className={`relative group ${className}`}>
      {/* Profile */}
      <div className="cursor-pointer">
        <User className="w-6 h-6 hover:scale-110 transition-all" />

      </div>

      {/* Dropdown */}
      <div className="invisible opacity-0 scale-95 group-hover:visible group-hover:opacity-100 group-hover:scale-100 absolute right-0 mt-10 w-56 bg-white border shadow-xl rounded-2xl transition-all duration-200 z-50">
        {/* Arrow */}
        <div className="absolute -top-2 right-3.5 w-4 h-4 bg-white border-l border-t rotate-45"></div>

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
            className="block px-4 py-2 text-sm hover:bg-gray-100 transition rounded-lg mx-1"
          >
            Dashboard
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition rounded-lg mx-1"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
