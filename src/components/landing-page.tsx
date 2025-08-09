"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  return (
    <div className="container mx-auto px-4">
       <section className="py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Test. Improve. Succeed.
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Earn credits by testing startups. Spend credits to get feedback.
            </p>
            <div className="flex space-x-4">
              <Button asChild size="lg">
                <Link href="/dashboard">Start Testing</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard/post-a-test">Post Your First Test</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
