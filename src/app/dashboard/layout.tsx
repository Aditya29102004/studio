import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Footer } from '@/components/layout/footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 bg-secondary">
        <div className="container mx-auto py-8 px-4">
            {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
