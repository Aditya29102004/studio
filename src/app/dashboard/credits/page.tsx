import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins } from "lucide-react";

const creditPacks = [
  { credits: 20, price: 200, popular: false },
  { credits: 50, price: 450, popular: true, savings: "Save 10%" },
  { credits: 100, price: 800, popular: false, savings: "Save 20%" },
];

export default function CreditsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8 text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Your Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2">
            <Coins className="h-10 w-10 text-amber-500" />
            <span className="text-5xl font-bold">120</span>
          </div>
          <p className="text-muted-foreground mt-2">
            Credits can be used to post your own tests for the community.
          </p>
        </CardContent>
      </Card>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-headline">Buy Credits</h2>
        <p className="text-muted-foreground mt-2">
          Purchase credit packs to get feedback on your projects.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {creditPacks.map((pack) => (
          <Card
            key={pack.credits}
            className={`flex flex-col ${
              pack.popular ? "border-primary shadow-lg" : ""
            }`}
          >
            {pack.popular && (
              <div className="bg-primary text-primary-foreground text-xs font-bold text-center py-1 rounded-t-lg">
                MOST POPULAR
              </div>
            )}
            <CardHeader className="items-center text-center">
              <CardTitle className="text-xl">{pack.credits} Credits</CardTitle>
              {pack.savings && (
                <Badge variant="secondary">{pack.savings}</Badge>
              )}
            </CardHeader>
            <CardContent className="flex-grow items-center text-center">
              <p className="text-4xl font-bold">₹{pack.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={pack.popular ? "default" : "outline"}>
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <h3 className="text-lg font-semibold">
          Secure Payments
        </h3>
        <p className="text-muted-foreground text-sm">
          Powered by Stripe & Razorpay
        </p>
         <div className="flex justify-center items-center gap-4 mt-4">
             <p className="font-semibold text-muted-foreground">UPI</p>
             <p className="font-semibold text-muted-foreground">Razorpay</p>
             <p className="font-semibold text-muted-foreground">Stripe</p>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
            All transactions are secure and encrypted.
        </p>
      </div>
    </div>
  );
}
