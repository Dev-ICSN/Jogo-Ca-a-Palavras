import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon: Icon, children }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200",
          isActive && "bg-blue-600 text-white font-semibold"
        )
      }
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="text-sm">{children}</span>
    </RouterNavLink>
  );
};

export default NavLink;