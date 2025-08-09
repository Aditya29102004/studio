"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Edit, Rocket } from "lucide-react";
import { BackgroundAnimation } from "./background-animation";

const howItWorks = [
  {
    icon: <Edit className="w-8 h-8 text-black" />,
    title: "Post a Test",
    description: "Describe what you want tested, from a simple form to a full app.",
  },
  {
    icon: <Check className="w-8 h-8 text-black" />,
    title: "Test & Submit",
    description: "Our community completes tasks and provides valuable, actionable feedback.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-black" />,
    title: "Earn & Spend Credits",
    description: "Grow your product with insights or test more ideas.",
  },
]

const exampleTests = [
  { title: "New E-commerce Checkout Flow", reward: 20 },
  { title: "Mobile Game UI Feedback", reward: 45 },
  { title: "SaaS Dashboard Usability", reward: 30 },
  { title: "Landing Page Copy Review", reward: 10 },
  { title: "Onboarding Process Analysis", reward: 25 },
  { title: "New App Icon Feedback", reward: 5 },
  { title: "Homepage Headline A/B Test", reward: 15 },
];


export function LandingPage() {
  return (
    <div className="bg-white text-black relative overflow-hidden">
       <BackgroundAnimation />
      <div className="container mx-auto px-4 relative z-10">
        <section className="py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Test. Improve. Succeed.
              </h1>
              <p className="text-lg text-neutral-600 max-w-lg">
                Earn credits by testing startups. Spend credits to get feedback.
              </p>
              <div className="flex space-x-4">
                <Button asChild size="lg" className="bg-black text-white hover:bg-neutral-800">
                  <Link href="/dashboard">Start Testing</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-neutral-300 text-black hover:bg-neutral-100">
                  <Link href="/dashboard/post-a-test">Post Your First Test</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-neutral-50 rounded-lg">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">How It Works</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                {howItWorks.map((item) => (
                    <div key={item.title} className="flex flex-col items-center">
                        <div className="mb-4">{item.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-neutral-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>

        <section className="py-20 md:py-24">
           <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">See What's Being Tested</h2>
            </div>
           <div className="relative flex overflow-hidden group">
                <div className="flex animate-marquee-infinite group-hover:paused space-x-4">
                    {exampleTests.map((test, index) => (
                        <Card key={index} className="bg-white border-neutral-200 shadow-sm w-80 flex-shrink-0">
                            <CardContent className="p-4 flex items-center justify-between">
                                <p className="font-semibold text-black truncate">{test.title}</p>
                                <div className="text-sm font-semibold text-black whitespace-nowrap ml-4">{test.reward} CC</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="absolute top-0 flex animate-marquee-infinite-2 group-hover:paused space-x-4">
                     {exampleTests.map((test, index) => (
                        <Card key={index + exampleTests.length} className="bg-white border-neutral-200 shadow-sm w-80 flex-shrink-0">
                             <CardContent className="p-4 flex items-center justify-between">
                                <p className="font-semibold text-black truncate">{test.title}</p>
                                <div className="text-sm font-semibold text-black whitespace-nowrap ml-4">{test.reward} CC</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
           </div>
        </section>

      </div>
      <section className="bg-black text-white relative z-10">
        <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join hundreds of testers & founders improving startups daily.</h2>
            <Button asChild size="lg" variant="secondary" className="bg-white text-black hover:bg-neutral-200">
                <Link href="/signup">Get Started Free</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
