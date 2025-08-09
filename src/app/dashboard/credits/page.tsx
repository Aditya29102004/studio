import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const creditPacks = [
  { credits: 20, price: 200, popular: false },
  { credits: 50, price: 450, popular: true },
  { credits: 100, price: 800, popular: false },
];

export default function CreditsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black">Buy Credits</h1>
        <p className="text-neutral-500 mt-2 max-w-xl mx-auto">
          Purchase credits to post your own tests and get valuable feedback from our community of testers.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {creditPacks.map((pack) => (
          <Card
            key={pack.credits}
            className={`flex flex-col text-center bg-white border-neutral-200 shadow-sm transition-all hover:shadow-md ${pack.popular ? 'border-black' : ''}`}
          >
            {pack.popular && (
              <div className="bg-black text-white text-xs font-bold py-1 tracking-wider">
                POPULAR
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-5xl font-bold text-black">
                {pack.credits}
              </CardTitle>
              <CardDescription className="text-neutral-500">Credits</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold text-black">₹{pack.price}</p>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button className="w-full bg-black text-white hover:bg-neutral-800">
                Buy with UPI
              </Button>
               <Button className="w-full" variant="outline">
                Pay with Card
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <Card className="mt-8 bg-white border-neutral-200 shadow-sm">
        <CardHeader>
            <CardTitle>Why Buy Credits?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-neutral-600">
            <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-600"/>Get high-quality feedback on your product or idea.</p>
            <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-600"/>Target specific user demographics for your tests.</p>
            <p className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-600"/>Support other founders by providing a testing ecosystem.</p>
        </CardContent>
       </Card>
    </div>
  );
}
