import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm h-[70px]">
       <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-8">
           <Link href="/" className="flex flex-col items-start gap-0">
            <span className="font-bold text-xl tracking-tighter">IdeaSoop Beta</span>
            <div className="w-full h-[1px] bg-muted-foreground/50"></div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Start for Free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
