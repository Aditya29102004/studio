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

const taskSteps = [
  "Navigate to our homepage: https://example.com/new-feature.",
  "Click on the 'Try Demo' button in the hero section.",
  "Complete the interactive product tour.",
  "Locate the pricing section and take a screenshot.",
  "Provide feedback on the clarity of the tour in the submission form.",
];

export default function TestDetailsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <CardTitle className="text-3xl font-bold">
                New E-commerce Checkout Flow
              </CardTitle>
            </div>
            <div className="flex-shrink-0">
              <Button size="lg">Start Test</Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-4 text-sm">
            <Badge variant="outline" className="px-3 py-1">
              <Coins className="mr-2 h-4 w-4" />
              20 Credits Reward
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Clock className="mr-2 h-4 w-4" />
              ~10 min
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Task Steps</h3>
                <ul className="list-decimal list-inside space-y-2 text-muted-foreground">
                    {taskSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ul>
            </div>
             <div>
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <p className="text-muted-foreground">
                    Device: Desktop | Skills: Basic computer literacy
                </p>
            </div>
        </CardContent>
      </Card>

        <div className="space-y-4">
            <Card className="bg-gray-50">
                <CardHeader>
                    <CardTitle className="text-base">What was your first impression?</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="Type your answer here..." />
                    <p className="text-xs text-muted-foreground mt-2 text-right">0/10 words</p>
                </CardContent>
            </Card>
             <Card className="bg-gray-50">
                <CardHeader>
                    <CardTitle className="text-base">How easy was it to use?</CardTitle>
                </CardHeader>
                <CardContent>
                    <RadioGroup>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="1" id="r1" /><Label htmlFor="r1">Very Easy</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="2" id="r2" /><Label htmlFor="r2">Easy</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="3" id="r3" /><Label htmlFor="r3">Neutral</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="4" id="r4" /><Label htmlFor="r4">Difficult</Label></div>
                    </RadioGroup>
                </CardContent>
            </Card>
             <Card className="bg-gray-50">
                <CardHeader>
                    <CardTitle className="text-base">Upload a screenshot of the final step.</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 mt-2 p-4 border-2 border-dashed rounded-lg">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                        <Input id="bug-upload" type="file" className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                    </div>
                </CardContent>
            </Card>
        </div>

      <div className="flex justify-end">
        <Button size="lg" disabled>
          Submit
        </Button>
      </div>
    </div>
  );
}
