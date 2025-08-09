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
import { CheckCircle, PlusCircle, Trash2, Upload, Video } from "lucide-react";

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
                <Button variant={step > 1 ? "outline" : "default"} onClick={() => setStep(step - 1)} disabled={step === 1}>Back</Button>
                <Button onClick={() => setStep(step + 1)} disabled={step === 4}>Next</Button>
            </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>

        {step === 1 && (
            <Card>
                <CardHeader>
                <CardTitle>Step 1: Task Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="e.g., Test our new landing page" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description (rich text allowed)</Label>
                        <Textarea
                        id="description"
                        placeholder="Describe what you want testers to do and what you're looking for."
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="website">Website</SelectItem>
                                <SelectItem value="app">App</SelectItem>
                                <SelectItem value="form">Form</SelectItem>
                                <SelectItem value="design-review">Design Review</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                        <Label htmlFor="time">Estimated Time (minutes)</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                                {[5, 10, 15, 20, 30, 45, 60].map(t => <SelectItem key={t} value={String(t)}>{t} min</SelectItem>)}
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="testers">Max Testers</Label>
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
                <CardTitle>Step 2: Task Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Checklist style steps</Label>
                         <div className="space-y-2">
                            <Input placeholder="e.g., Go to our website at example.com" />
                            <Input placeholder="e.g., Click the 'Sign Up' button" />
                        </div>
                    </div>
                    <Button variant="outline" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add another step
                    </Button>
                    <div className="space-y-2">
                        <Label>Optional: Upload a demo video</Label>
                        <div className="flex items-center gap-2 mt-2 p-4 border-2 border-dashed rounded-lg">
                            <Video className="h-6 w-6 text-muted-foreground" />
                            <Input id="video-upload" type="file" className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}

        {step === 3 && (
            <Card>
                <CardHeader>
                <CardTitle>Step 3: Proof & Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label className="mb-2 block">Choose proof method</Label>
                        <RadioGroup defaultValue="form">
                            <div className="flex items-center space-x-2">
                            <RadioGroupItem value="form" id="r1" />
                            <Label htmlFor="r1">Auto-Verify via inbuilt form</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                            <RadioGroupItem value="manual" id="r2" />
                            <Label htmlFor="r2">Manual Approval (screenshot/video upload)</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <Label className="mb-2 block">If inbuilt form, add questions</Label>
                        {questions.map((q, index) => (
                            <Card key={index} className="mb-4 bg-gray-50">
                                <CardContent className="p-4">
                                     <div className="flex justify-between items-center mb-2">
                                        <Select defaultValue={q.type}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Question type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="text">Short Answer</SelectItem>
                                                <SelectItem value="mcq">Multiple Choice</SelectItem>
                                                <SelectItem value="rating">Rating</SelectItem>
                                                <SelectItem value="upload">File Upload</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button variant="ghost" size="icon" onClick={() => removeQuestion(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Input placeholder="Enter your question" />
                                    <div className="mt-2 text-xs text-muted-foreground">
                                        <Label className="mr-2"><Input type="checkbox" className="mr-1"/>Required</Label>
                                        <Label><Input type="checkbox" className="mr-1"/>Min word count</Label>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                         <Button variant="outline" onClick={addQuestion}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )}

        {step === 4 && (
             <Card>
                <CardHeader>
                    <CardTitle>Step 4: Review & Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Test our new landing page</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">You are offering 20 credits for a 10 minute test.</p>
                        </CardContent>
                    </Card>
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                        <p className="font-semibold">Total Cost: 1000 Credits</p>
                        <p className="text-sm text-muted-foreground">Your balance: 120 Credits</p>
                    </div>
                    <Button size="lg" disabled className="w-full">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Pay 1000 Credits & Publish
                    </Button>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
