import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Footer } from '@/components/layout/footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader />
      <main className="flex-1 bg-[#F5F5F5]">
        <div className="container mx-auto py-8 px-4">
            {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
