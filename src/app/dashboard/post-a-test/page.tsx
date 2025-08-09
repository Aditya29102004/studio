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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Info, PlusCircle } from "lucide-react";

export default function PostTestPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Post a New Beta Test</h1>
        <p className="text-muted-foreground">
          Create a task for our community of testers to get valuable feedback.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Step 1: Task Details</CardTitle>
          <CardDescription>
            Provide the basic information for your test.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input id="title" placeholder="e.g., Test our new landing page" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what you want testers to do and what you're looking for."
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time Required (minutes)</Label>
              <Input id="time" type="number" placeholder="e.g., 10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="credits">Credits Offered</Label>
              <Input id="credits" type="number" placeholder="e.g., 20" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testers">Max Testers</Label>
              <Input id="testers" type="number" placeholder="e.g., 50" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step 2: Task Type</CardTitle>
          <CardDescription>
            Choose the type of test you want to run.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a task type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="website">Website/App Test</SelectItem>
              <SelectItem value="form">Inbuilt Feedback Form</SelectItem>
              <SelectItem value="prototype">Prototype Review</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Step 3: Instructions</CardTitle>
          <CardDescription>
            Add clear, step-by-step instructions for testers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="step-1">Step 1</Label>
                <Input id="step-1" placeholder="e.g., Go to our website at example.com" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="step-2">Step 2</Label>
                <Input id="step-2" placeholder="e.g., Click the 'Sign Up' button" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="step-3">Step 3</Label>
                <Input id="step-3" placeholder="e.g., Fill out the form and submit it" />
            </div>
            <Button variant="outline" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add another step
            </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step 4: Proof of Completion</CardTitle>
           <CardDescription>
            How should testers prove they've completed the task?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="screenshot">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="screenshot" id="r1" />
              <Label htmlFor="r1">Upload a Screenshot</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="form" id="r2" />
              <Label htmlFor="r2">Auto Form Completion</Label>
            </div>
             <div className="flex items-center space-x-2">
              <RadioGroupItem value="text" id="r3" />
              <Label htmlFor="r3">Text Answer</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Step 5: Preview & Confirm</CardTitle>
           <CardDescription>
            Review your test details before publishing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <h4 className="font-semibold">Test our new landing page</h4>
                <p className="text-sm text-muted-foreground">You are offering 20 credits for a 10 minute test, with a maximum of 50 testers.</p>
            </div>
            <Separator />
             <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500"/>
                    <p className="text-sm font-medium">Total Cost: 1000 Credits</p>
                </div>
                <p className="text-sm text-muted-foreground">Your balance: 120 Credits</p>
            </div>
        </CardContent>
      </Card>


      <div className="flex justify-end">
        <Button size="lg" disabled>
          <CheckCircle className="mr-2 h-4 w-4" />
          Pay 1000 Credits & Publish
        </Button>
      </div>
    </div>
  );
}
