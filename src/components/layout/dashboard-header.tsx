"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Coins, User, LogOut, Bell, ChevronsRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DashboardHeader() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/page", label: "Browse Tests" },
    { href: "/dashboard/post-a-test", label: "Post a Test" },
    { href: "/dashboard/credits", label: "My Credits" },
    { href: "/dashboard/profile", label: "Profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm h-[70px]">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex flex-col items-start gap-0">
            <span className="font-bold text-xl tracking-tighter">IdeaSoop Beta</span>
            <div className="w-full h-[1px] bg-muted-foreground/50"></div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-muted-foreground transition-colors hover:text-foreground",
                  pathname === link.href && "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" size="sm" className="rounded-full">
              <Coins className="h-4 w-4 mr-2 text-amber-500" />
              <span>120</span>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Alex Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    alex.doe@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/credits">
                  <Coins className="mr-2 h-4 w-4" />
                  <span>Credits</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
