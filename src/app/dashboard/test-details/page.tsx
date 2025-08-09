import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Clock, Coins, Play } from "lucide-react";

const taskSteps = [
  "Navigate to our homepage: https://example.com/new-feature.",
  "Click on the 'Try Demo' button in the hero section.",
  "Complete the interactive product tour.",
  "Locate the pricing section and take a screenshot.",
  "Provide feedback on the clarity of the tour in the submission form.",
];

export default function TestDetailsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <CardTitle className="text-3xl font-bold font-headline">
                New E-commerce Checkout Flow
              </CardTitle>
              <CardDescription className="mt-2">
                We've redesigned our checkout process to be faster and more
                intuitive. We need your feedback on its usability and design
                before we launch it to all users.
              </CardDescription>
            </div>
            <div className="flex-shrink-0">
              <Button size="lg">
                <Play className="mr-2 h-5 w-5" /> Start Test
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Badge variant="secondary" className="text-base px-4 py-1">
              <Coins className="mr-2 h-4 w-4 text-amber-500" />
              20 Credits Reward
            </Badge>
            <Badge variant="secondary" className="text-base px-4 py-1">
              <Clock className="mr-2 h-4 w-4" />
              ~10 min
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Task Steps</h3>
                <div className="space-y-4">
                {taskSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center">
                            <Check className="h-4 w-4" />
                        </div>
                        <p className="text-muted-foreground">{step}</p>
                    </div>
                ))}
                </div>
            </div>
             <div>
                <h3 className="text-lg font-semibold mb-2">Proof Requirements</h3>
                <p className="text-muted-foreground">
                    You will need to upload a screenshot of the final step and fill out a short feedback form.
                </p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
                <h4 className="font-semibold">Ready to begin?</h4>
                <p className="text-sm text-muted-foreground mt-1">Click the 'Start Test' button to open the test link and see the submission form.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
