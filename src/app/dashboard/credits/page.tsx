import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const creditPacks = [
  { credits: 20, price: 200 },
  { credits: 50, price: 450 },
  { credits: 100, price: 800 },
];

export default function CreditsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Buy Credits</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {creditPacks.map((pack) => (
          <Card
            key={pack.credits}
            className="flex flex-col text-center hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <CardHeader>
              <CardTitle className="text-2xl">{pack.credits} CC</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold">₹{pack.price}</p>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                 <div className="flex justify-center items-center gap-2 mb-2">
                    <p className="font-semibold text-muted-foreground text-sm">UPI</p>
                    <p className="font-semibold text-muted-foreground text-sm">Razorpay</p>
                    <p className="font-semibold text-muted-foreground text-sm">Stripe</p>
                </div>
              <Button className="w-full">
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
