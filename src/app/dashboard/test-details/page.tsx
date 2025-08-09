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
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <Badge variant="outline" className="mb-2">Website</Badge>
              <CardTitle className="text-3xl font-bold">
                New E-commerce Checkout Flow
              </CardTitle>
              <CardDescription className="mt-2">
                We've redesigned our checkout process and need your feedback on
                its usability and design.
              </CardDescription>
            </div>
            <div className="flex-shrink-0">
              <Button size="lg">Start Test</Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-4 text-sm">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-muted-foreground" />
              <span>20 Credits Reward</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>~10 minutes</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Navigate to our homepage: https://example.com/new-feature</li>
              <li>Click on the 'Try Demo' button in the hero section.</li>
              <li>Complete the interactive product tour.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <form className="space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div>
                    <Label className="font-semibold">What was your first impression?</Label>
                    <Textarea className="mt-2" placeholder="Type your answer here..." />
                 </div>
                 <div>
                    <Label className="font-semibold">How easy was it to use?</Label>
                     <RadioGroup className="mt-2">
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="very-easy" id="r1" />
                        <Label htmlFor="r1">Very Easy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="easy" id="r2" />
                        <Label htmlFor="r2">Easy</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                        <RadioGroupItem value="neutral" id="r3" />
                        <Label htmlFor="r3">Neutral</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                        <RadioGroupItem value="difficult" id="r4" />
                        <Label htmlFor="r4">Difficult</Label>
                        </div>
                    </RadioGroup>
                 </div>
                 <div>
                    <Label className="font-semibold">Upload a screenshot of the final step.</Label>
                     <div className="mt-2 flex items-center gap-2 rounded-md border border-dashed p-4">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Drag & drop or <Button variant="link" className="p-0 h-auto">click to upload</Button></p>
                    </div>
                 </div>
            </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button size="lg">
            <Check className="mr-2 h-4 w-4" />
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
