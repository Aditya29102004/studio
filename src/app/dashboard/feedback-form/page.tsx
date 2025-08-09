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
import { Check, Star, Upload } from "lucide-react";

export default function FeedbackFormPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">New Checkout Flow Feedback</h1>
        <p className="text-muted-foreground mt-2">
          Your feedback is valuable. Please answer the questions below.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Question 1: Overall Impression</CardTitle>
          <CardDescription>
            What was your first impression of the new checkout page design?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="q1-answer">Your Answer (min. 10 words)</Label>
          <Textarea id="q1-answer" placeholder="Type your feedback here..." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question 2: Ease of Use</CardTitle>
          <CardDescription>
            How easy was it to find the 'Continue to Payment' button?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="very-easy">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question 3: Rate the experience</CardTitle>
          <CardDescription>
            On a scale of 1 to 5, how would you rate the checkout experience?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Star
                key={rating}
                className="h-8 w-8 text-amber-400 cursor-pointer hover:text-amber-500"
                fill="currentColor"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question 4: Found any bugs?</CardTitle>
          <CardDescription>
            If you encountered any visual bugs or errors, please upload a screenshot.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Label htmlFor="bug-upload">Upload Screenshot</Label>
            <div className="flex items-center gap-2 mt-2 p-4 border-2 border-dashed rounded-lg">
                <Upload className="h-6 w-6 text-muted-foreground" />
                <Input id="bug-upload" type="file" className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" />
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg">
          <Check className="mr-2 h-4 w-4" />
          Submit Feedback
        </Button>
      </div>
    </div>
  );
}
