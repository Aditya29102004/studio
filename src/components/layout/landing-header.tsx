import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
       <div className="container mx-auto flex h-[70px] items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="h-6 w-6 text-black" />
          <span className="font-bold text-lg text-black group-hover:text-neutral-700">IdeaSoop Beta</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild className="text-black hover:bg-neutral-100">
            <Link href="/dashboard">Login</Link>
          </Button>
          <Button asChild className="bg-black text-white hover:bg-neutral-800">
            <Link href="/dashboard">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}