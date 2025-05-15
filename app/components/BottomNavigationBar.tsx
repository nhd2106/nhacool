"use client";

import { cn } from "@/lib/utils";
import { MapPin, Heart, User, Home } from "lucide-react";
import { Link, useLocation } from "react-router";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

function NavItem({ to, icon: Icon, label, isActive }: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center flex-1 p-2 text-sm",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-primary/80"
      )}
    >
      <Icon className="h-6 w-6 mb-0.5" />
      <span>{label}</span>
    </Link>
  );
}

export default function BottomNavigationBar() {
  const location = useLocation(); // To determine active tab

  // Define your navigation items here
  const navItems = [
    { to: "/", icon: Home, label: "Trang chủ" }, // Or MapPin if map is the primary view
    // { to: "/search", icon: Search, label: "Tìm kiếm" }, // Removed search from nav
    { to: "/favorites", icon: Heart, label: "Yêu thích" },
    { to: "/profile", icon: User, label: "Tài khoản" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border shadow-top z-50 flex items-stretch">
      {navItems.map((item) => (
        <NavItem
          key={item.to}
          to={item.to}
          icon={item.icon}
          label={item.label}
          isActive={
            location.pathname === item.to ||
            (item.to === "/" && location.pathname.startsWith("/"))
          }
        />
      ))}
    </nav>
  );
}
