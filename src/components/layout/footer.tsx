import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-6 px-4">
        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} IdeaSoop Beta. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-neutral-500 hover:text-black">About</Link>
            <Link href="#" className="text-sm text-neutral-500 hover:text-black">Terms</Link>
            <Link href="#" className="text-sm text-neutral-500 hover:text-black">Privacy</Link>
            <Link href="#" className="text-sm text-neutral-500 hover:text-black">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
