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
  { credits: 50, price: 450, popular: true },
  { credits: 100, price: 800, popular: false },
];

export default function CreditsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Buy Credits</h1>
        <p className="text-muted-foreground mt-2">
          Purchase credits to post your own tests and get valuable feedback.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {creditPacks.map((pack) => (
          <Card
            key={pack.credits}
            className={`flex flex-col text-center ${pack.popular ? 'border-primary' : ''}`}
          >
            {pack.popular && (
              <div className="bg-primary text-primary-foreground text-xs font-bold py-1">
                POPULAR
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-4xl font-bold flex items-center justify-center gap-2">
                <Coins className="h-8 w-8 text-amber-500" />
                {pack.credits}
              </CardTitle>
              <CardDescription>Credits</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold">₹{pack.price}</p>
            </CardContent>
            <CardFooter>
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
