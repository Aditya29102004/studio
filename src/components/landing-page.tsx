"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, CheckCircle, ClipboardList } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const exampleTests = [
  {
    title: "Onboarding Flow Review",
    credits: 10,
  },
  {
    title: "Mobile App Performance",
    credits: 25,
  },
  {
    title: "Pricing Page Feedback",
    credits: 5,
  },
   {
    title: "New Checkout Experience",
    credits: 15,
  },
  {
    title: "SaaS Dashboard Usability",
    credits: 20,
  },
];


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
          <div className="flex items-center justify-center">
             <Image 
                src="https://placehold.co/600x400.png"
                alt="Testing metaphor" 
                width={500}
                height={400}
                className="rounded-lg"
                data-ai-hint="people laptops magnifying glass monochrome"
              />
          </div>
        </div>
      </section>

      <section className="py-20 -mx-4 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              How It Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto bg-secondary p-3 rounded-full w-fit">
                    <ClipboardList className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <h3 className="text-xl font-semibold">1. Post a Test</h3>
                <p className="text-muted-foreground">
                  Describe what you want tested.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl hover:scale-105 transition-transform duration-300">
               <CardHeader>
                <div className="mx-auto bg-secondary p-3 rounded-full w-fit">
                    <CheckCircle className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <h3 className="text-xl font-semibold">2. Test & Submit</h3>
                <p className="text-muted-foreground">
                 Complete tasks, give proof.
                </p>
              </CardContent>
            </Card>
             <Card className="hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto bg-secondary p-3 rounded-full w-fit">
                    <Award className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <h3 className="text-xl font-semibold">3. Earn & Spend Credits</h3>
                <p className="text-muted-foreground">
                  Grow your product or test more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {exampleTests.map((test, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="filter blur-[1px]">
                    <CardHeader>
                      <CardTitle>{test.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="flex justify-end items-center mt-4">
                         <span className="font-semibold text-primary">{test.credits} Credits</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12"/>
          <CarouselNext className="mr-12" />
        </Carousel>
      </section>

       <section className="bg-primary text-primary-foreground -mx-4 px-4">
        <div className="container mx-auto text-center py-12">
            <h2 className="text-2xl font-semibold">
                Join hundreds of testers & founders improving startups daily.
            </h2>
            <Button asChild size="lg" variant="secondary" className="mt-6">
                <Link href="/dashboard">Get Started Free</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
