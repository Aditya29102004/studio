"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, CheckCircle, ClipboardList } from "lucide-react";

export function LandingPage() {
  return (
    <div className="container mx-auto px-4">
      <section className="py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
              Validate Your Startup with Real Testers
            </h1>
            <p className="text-lg text-muted-foreground">
              Earn credits by testing, spend credits to get feedback. IdeaSoop
              Beta is the simplest way to get real-world insights for your
              product.
            </p>
            <div className="flex space-x-4">
              <Button asChild size="lg">
                <Link href="/dashboard">Start Testing</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard/post-a-test">Post a Test</Link>
              </Button>
            </div>
          </div>
          <div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="People testing on devices"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="people testing"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary -mx-4 px-4 rounded-lg">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline">
              How It Works
            </h2>
            <p className="text-muted-foreground mt-2">
              A simple, credit-based system for valuable feedback.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary text-primary-foreground rounded-full p-4">
                <ClipboardList className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">1. Post a Task</h3>
              <p className="text-muted-foreground">
                Founders define clear testing tasks and offer credits as a
                reward.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary text-primary-foreground rounded-full p-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">2. Test & Submit</h3>
              <p className="text-muted-foreground">
                Testers complete tasks and provide proof of completion for
                review.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary text-primary-foreground rounded-full p-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">3. Approve & Earn</h3>
              <p className="text-muted-foreground">
                Founders approve submissions, and testers earn credits for future use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">
            Example Beta Tests
          </h2>
          <p className="text-muted-foreground mt-2">
            See what kind of feedback you can get.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Flow Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Test the new user signup and onboarding process for our SaaS
                app.
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">~5 min</span>
                <span className="font-semibold text-primary">10 Credits</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mobile App Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Check for UI glitches and loading speeds on our latest iOS build.
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">~15 min</span>
                <span className="font-semibold text-primary">25 Credits</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pricing Page Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Is our new pricing structure clear and compelling? Let us know.
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">~3 min</span>
                <span className="font-semibold text-primary">5 Credits</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
