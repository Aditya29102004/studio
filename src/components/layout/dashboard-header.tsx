"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
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
import { LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/icons";

type Profile = {
  full_name: string;
  email: string;
  avatar_url: string;
  credits: number;
}

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data: profileData, error } = await supabase
                .from('profiles')
                .select('full_name, avatar_url, credits')
                .eq('id', user.id)
                .single();

            if (profileData) {
                setProfile({ ...profileData, email: user.email! });
            } else if (error) {
                console.error("Error fetching profile", error)
            }
        }
    }
    fetchProfile();

    const channel = supabase.channel('realtime-profile')
      .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
            fetchProfile();
        }
      )
      .subscribe();


    return () => {
        supabase.removeChannel(channel);
    }
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  }

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/post-a-test", label: "Post a Test" },
    { href: "/dashboard/credits", label: "My Credits" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm h-[70px]">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo className="h-6 w-6 text-black" />
            <span className="font-bold text-lg text-black group-hover:text-neutral-700">IdeaSoop Beta</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-neutral-500 transition-colors hover:text-black",
                pathname === link.href && "text-black font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="bg-neutral-100 text-black text-sm font-medium px-3 py-1.5 rounded-full">
            {profile?.credits || 0} CC
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile?.avatar_url || `https://i.pravatar.cc/150?u=${profile?.email}`} alt="User avatar" />
                  <AvatarFallback>{profile?.full_name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{profile?.full_name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {profile?.email}
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
              <DropdownMenuItem onClick={handleLogout}>
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
