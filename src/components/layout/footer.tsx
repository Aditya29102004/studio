import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 py-4 px-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} IdeaSoop Beta. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">About</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Terms</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
