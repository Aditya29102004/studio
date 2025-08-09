import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Check, Clock, Coins, Upload } from "lucide-react";

export default function TestDetailsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-white border-neutral-200 shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Badge variant="outline" className="border-neutral-300">Website</Badge>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Coins className="h-4 w-4" />
                    <span>20 Credits Reward</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Clock className="h-4 w-4" />
                    <span>~10 minutes</span>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-black">
                New E-commerce Checkout Flow
              </CardTitle>
            </div>
            <div className="flex-shrink-0">
              <Button size="lg" className="bg-black text-white hover:bg-neutral-800">Start Test</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-black">Instructions</h3>
            <ul className="list-decimal list-inside space-y-2 text-neutral-600 bg-neutral-50 p-4 rounded-md">
              <li>Navigate to our homepage: <a href="#" className="underline text-black">https://example.com/new-feature</a></li>
              <li>Click on the 'Try Demo' button in the hero section.</li>
              <li>Complete the interactive product tour.</li>
            </ul>
          </div>
           <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-black">Requirements</h3>
            <div className="flex gap-2">
                <Badge variant="secondary" className="bg-neutral-100 text-black">Desktop</Badge>
                <Badge variant="secondary" className="bg-neutral-100 text-black">UX Skills</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <form className="space-y-4">
        <Card className="bg-white border-neutral-200 shadow-sm">
            <CardHeader>
                <CardTitle>Submit Your Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 <Card className="bg-neutral-50 border-neutral-200 p-4">
                    <Label className="font-semibold text-black">What was your first impression of the design?</Label>
                    <Textarea className="mt-2 bg-white" placeholder="Type your answer here..." />
                    <p className="text-xs text-right mt-1 text-neutral-500">0/20 words</p>
                 </Card>
                 <Card className="bg-neutral-50 border-neutral-200 p-4">
                    <Label className="font-semibold text-black">How easy was it to find the payment button?</Label>
                     <RadioGroup className="mt-2 space-y-1">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="very-easy" id="r1" />
                            <Label htmlFor="r1" className="font-normal">Very Easy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="easy" id="r2" />
                            <Label htmlFor="r2" className="font-normal">Easy</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="neutral" id="r3" />
                            <Label htmlFor="r3" className="font-normal">Neutral</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="difficult" id="r4" />
                            <Label htmlFor="r4" className="font-normal">Difficult</Label>
                        </div>
                    </RadioGroup>
                 </Card>
                 <Card className="bg-neutral-50 border-neutral-200 p-4">
                    <Label className="font-semibold text-black">Rate the checkout experience (1=Bad, 5=Excellent)</Label>
                    <div className="flex items-center gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button key={rating} type="button" className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition-colors">
                                {rating}
                            </button>
                        ))}
                    </div>
                 </Card>
                 <Card className="bg-neutral-50 border-neutral-200 p-4">
                    <Label className="font-semibold text-black">Upload a screenshot of the final step.</Label>
                     <div className="mt-2 flex items-center justify-center flex-col gap-2 rounded-md border-2 border-dashed border-neutral-300 p-8 text-center">
                        <Upload className="h-8 w-8 text-neutral-400" />
                        <p className="text-sm text-neutral-500">Drag & drop or <Button variant="link" type="button" className="p-0 h-auto text-black">click to upload</Button></p>
                        <Input type="file" className="sr-only"/>
                    </div>
                 </Card>
            </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button size="lg" className="bg-black text-white hover:bg-neutral-800">
            <Check className="mr-2 h-4 w-4" />
            Submit Feedback
          </Button>
        </div>
      </form>
    </div>
  );
}
