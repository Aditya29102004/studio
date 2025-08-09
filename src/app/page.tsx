import { LandingPage } from '@/components/landing-page';
import { LandingHeader } from '@/components/layout/landing-header';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-1">
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}
