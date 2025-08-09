"use client"

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, PlusCircle, Trash2 } from "lucide-react";

export default function PostTestPage() {
    const [step, setStep] = useState(1);
    const [questions, setQuestions] = useState([{ type: 'text', content: '' }]);

    const addQuestion = () => {
        setQuestions([...questions, { type: 'text', content: '' }]);
    }
    
    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    }


  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Post a New Beta Test</h1>
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>Back</Button>
                <Button onClick={() => setStep(step + 1)} disabled={step === 4}>Next</Button>
            </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>

        {step === 1 && (
            <Card>
                <CardHeader>
                <CardTitle>Step 1: Basic Information</CardTitle>
                <CardDescription>
                    Provide the essential details for your test.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="e.g., Test our new landing page" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                    id="description"
                    placeholder="Describe what you want testers to do and what you're looking for."
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="testers">Number of Testers</Label>
                    <Input id="testers" type="number" placeholder="e.g., 50" />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="credits">Credits per Tester</Label>
                    <Input id="credits" type="number" placeholder="e.g., 20" />
                    </div>
                </div>
                </CardContent>
            </Card>
        )}
        
        {step === 2 && (
             <Card>
                <CardHeader>
                <CardTitle>Step 2: Target Audience</CardTitle>
                <CardDescription>
                    Specify who should take this test.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="device">Device</Label>
                    <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select device" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="desktop">Desktop</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="skills">Required Skills</Label>
                    <Input id="skills" placeholder="e.g., UX, Design, Frontend (comma-separated)" />
                </div>
                </CardContent>
            </Card>
        )}

        {step === 3 && (
            <Card>
                <CardHeader>
                <CardTitle>Step 3: Questions</CardTitle>
                <CardDescription>
                    Create questions for your testers to answer.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {questions.map((q, index) => (
                        <Card key={index} className="bg-muted/40">
                            <CardHeader className="flex flex-row items-center justify-between py-3">
                                <CardTitle className="text-sm">Question {index + 1}</CardTitle>
                                 <Button variant="ghost" size="icon" onClick={() => removeQuestion(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                 <div className="space-y-2">
                                    <Label>Question Type</Label>
                                    <Select defaultValue={q.type}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select question type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="text">Text</SelectItem>
                                            <SelectItem value="mcq">Multiple Choice</SelectItem>
                                            <SelectItem value="rating">Rating (1-5)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Question</Label>
                                    <Input placeholder="Enter your question" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                     <Button variant="outline" onClick={addQuestion}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                    </Button>
                </CardContent>
            </Card>
        )}

        {step === 4 && (
             <Card>
                <CardHeader>
                <CardTitle>Step 4: Review & Publish</CardTitle>
                <CardDescription>
                    Review the details and publish your test.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Test our new landing page</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">You are offering 20 credits for a test.</p>
                        </CardContent>
                    </Card>
                    <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
                        <p className="font-semibold">Total Cost: 1000 Credits</p>
                        <p className="text-sm text-muted-foreground">Your balance: 120 Credits</p>
                    </div>
                    <Button size="lg" disabled>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Pay 1000 Credits & Publish
                    </Button>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
