"use client";

import Link from "next/link";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Edit, Rocket } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
];


export function LandingPage() {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-4">
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
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Illustration of people testing software"
                width={600}
                height={400}
                className="rounded-lg"
                data-ai-hint="monochrome illustration people laptops"
              />
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
           <Carousel opts={{ loop: true, align: "start" }} className="w-full">
            <CarouselContent className="-ml-4">
              {exampleTests.map((test, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="bg-white border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-black truncate filter blur-sm">
                                {test.title}
                            </CardTitle>
                        </CardHeader>
                      <CardContent>
                        <p className="text-sm font-semibold text-black">{test.reward} CC</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-neutral-300 hover:bg-neutral-100" />
            <CarouselNext className="border-neutral-300 hover:bg-neutral-100" />
          </Carousel>
        </section>

      </div>
      <section className="bg-black text-white">
        <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join hundreds of testers & founders improving startups daily.</h2>
            <Button asChild size="lg" variant="secondary" className="bg-white text-black hover:bg-neutral-200">
                <Link href="/dashboard">Get Started Free</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
