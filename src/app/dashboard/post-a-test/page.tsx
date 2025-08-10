"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { CheckCircle, PlusCircle, Trash2, Upload, Video, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { postNewTest } from "@/lib/actions";

type Question = {
    type: 'text' | 'mcq' | 'rating';
    content: string;
    options?: string[]; // for mcq
}

export default function PostTestPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    // Step 1 State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [maxTesters, setMaxTesters] = useState('');
    const [creditsPerTester, setCreditsPerTester] = useState('');

    // Step 2 State
    const [instructions, setInstructions] = useState<string[]>(['']);

    // Step 3 State
    const [proofMethod, setProofMethod] = useState('form');
    const [questions, setQuestions] = useState<Question[]>([{ type: 'text', content: '' }]);

    const addInstructionStep = () => {
        setInstructions([...instructions, '']);
    }

    const removeInstructionStep = (index: number) => {
        setInstructions(instructions.filter((_, i) => i !== index));
    }

    const handleInstructionChange = (index: number, value: string) => {
        const newInstructions = [...instructions];
        newInstructions[index] = value;
        setInstructions(newInstructions);
    }

    const addQuestion = () => {
        setQuestions([...questions, { type: 'text', content: '' }]);
    }
    
    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    }

    const handleQuestionTypeChange = (index: number, type: Question['type']) => {
        const newQuestions = [...questions];
        newQuestions[index].type = type;
        if(type === 'mcq' && !newQuestions[index].options) {
            newQuestions[index].options = [''];
        }
        setQuestions(newQuestions);
    }

     const handleQuestionContentChange = (index: number, content: string) => {
        const newQuestions = [...questions];
        newQuestions[index].content = content;
        setQuestions(newQuestions);
    };

    const handlePublish = async () => {
        setLoading(true);

        const testData = {
            title,
            description,
            category,
            estimated_time: parseInt(estimatedTime),
            max_testers: parseInt(maxTesters),
            reward_credits: parseInt(creditsPerTester),
            instructions: instructions.filter(inst => inst.trim() !== ''), // Filter out empty strings
            proof_method: proofMethod,
            questions,
            status: 'open'
        };

        const result = await postNewTest(testData);

        if (result.error) {
            toast({ title: "Failed to publish test", description: result.error, variant: "destructive" });
            setLoading(false);
        } else {
            toast({ title: "Success!", description: "Your test has been published." });
            router.push('/dashboard');
        }
    }

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);


  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
            <h1 className="text-3xl font-bold">Post a New Beta Test</h1>
            <p className="text-neutral-500 mt-1">Guide testers through your product and get the feedback you need.</p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-neutral-200 rounded-full h-2.5">
            <div className="bg-black h-2.5 rounded-full transition-all duration-500" style={{ width: `${((step) / 4) * 100}%` }}></div>
        </div>

        {step === 1 && (
            <Card className="bg-white border-neutral-200 shadow-sm">
                <CardHeader>
                <CardTitle>Step 1: Task Info</CardTitle>
                <CardDescription>
                    Provide the essential details for your test. This helps testers understand the context.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="e.g., Test our new landing page" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description (supports bold/italic)</Label>
                        <Textarea
                        id="description"
                        placeholder="Describe what you want testers to do and what you're looking for."
                        value={description} onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger id="category"><SelectValue placeholder="Select a category" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Website">Website</SelectItem>
                                    <SelectItem value="App">App</SelectItem>
                                    <SelectItem value="Form">Form</SelectItem>
                                    <SelectItem value="Design-Review">Design Review</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="time">Estimated Time</Label>
                            <Select value={estimatedTime} onValueChange={setEstimatedTime}>
                                <SelectTrigger id="time"><SelectValue placeholder="Select time" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5 minutes</SelectItem>
                                    <SelectItem value="15">15 minutes</SelectItem>
                                    <SelectItem value="30">30 minutes</SelectItem>
                                    <SelectItem value="60">60 minutes</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="testers">Max Testers</Label>
                            <Input id="testers" type="number" placeholder="e.g., 50" value={maxTesters} onChange={e => setMaxTesters(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="credits">Credits per Tester</Label>
                            <Input id="credits" type="number" placeholder="e.g., 20" value={creditsPerTester} onChange={e => setCreditsPerTester(e.target.value)} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
        
        {step === 2 && (
             <Card className="bg-white border-neutral-200 shadow-sm">
                <CardHeader>
                <CardTitle>Step 2: Task Instructions</CardTitle>
                <CardDescription>
                    Give testers a clear, step-by-step guide to follow.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Checklist</Label>
                        <div className="space-y-2">
                            {instructions.map((step, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input 
                                        placeholder={`Step ${index + 1}: Go to the homepage`} 
                                        value={step}
                                        onChange={(e) => handleInstructionChange(index, e.target.value)}
                                    />
                                    <Button variant="ghost" size="icon" onClick={() => removeInstructionStep(index)}>
                                        <Trash2 className="h-4 w-4 text-neutral-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" size="sm" onClick={addInstructionStep} className="border-neutral-300 hover:bg-neutral-100"><PlusCircle className="mr-2 h-4 w-4" /> Add Step</Button>
                    </div>
                    <div className="space-y-2">
                        <Label>Demo Video (Optional)</Label>
                        <div className="flex items-center gap-2 mt-2 p-4 border-2 border-dashed border-neutral-300 rounded-lg text-neutral-500 hover:border-black hover:text-black transition-colors">
                            <Video className="h-6 w-6" />
                            <p>Upload a short video to demonstrate the task.</p>
                            <Button variant="link" className="p-0 h-auto text-black">Upload</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}

        {step === 3 && (
            <Card className="bg-white border-neutral-200 shadow-sm">
                <CardHeader>
                <CardTitle>Step 3: Proof & Verification</CardTitle>
                <CardDescription>
                    How will testers prove they've completed the task?
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label className="mb-2 block">Proof Method</Label>
                        <RadioGroup value={proofMethod} onValueChange={setProofMethod} className="flex gap-4">
                            <Label htmlFor="form-proof" className="flex-1 p-4 border rounded-md cursor-pointer has-[:checked]:border-black">
                                <RadioGroupItem value="form" id="form-proof" className="sr-only" />
                                <h4 className="font-semibold">Inbuilt Form</h4>
                                <p className="text-sm text-neutral-500">Auto-verify with questions you create.</p>
                            </Label>
                             <Label htmlFor="manual-proof" className="flex-1 p-4 border rounded-md cursor-pointer has-[:checked]:border-black">
                                <RadioGroupItem value="manual" id="manual-proof" className="sr-only"/>
                                 <h4 className="font-semibold">Manual Approval</h4>
                                <p className="text-sm text-neutral-500">Testers upload screenshots or videos.</p>
                            </Label>
                        </RadioGroup>
                    </div>

                    <div className="space-y-4">
                        <Label>Questions for Testers</Label>
                        {questions.map((q, index) => (
                            <Card key={index} className="bg-neutral-50 border-neutral-200">
                                <CardHeader className="flex flex-row items-center justify-between py-3">
                                    <CardTitle className="text-sm">Question {index + 1}</CardTitle>
                                    <Button variant="ghost" size="icon" onClick={() => removeQuestion(index)}>
                                        <Trash2 className="h-4 w-4 text-neutral-500" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="space-y-2">
                                        <Label>Question Type</Label>
                                        <Select value={q.type} onValueChange={(value: Question['type']) => handleQuestionTypeChange(index, value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select question type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="text">Short Answer</SelectItem>
                                                <SelectItem value="mcq">Multiple Choice</SelectItem>
                                                <SelectItem value="rating">Rating (1-5)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Question</Label>
                                        <Input 
                                            placeholder="Enter your question" 
                                            value={q.content}
                                            onChange={(e) => handleQuestionContentChange(index, e.target.value)}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button variant="outline" onClick={addQuestion} className="border-neutral-300 hover:bg-neutral-100">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )}

        {step === 4 && (
             <Card className="bg-white border-neutral-200 shadow-sm">
                <CardHeader>
                <CardTitle>Step 4: Review & Publish</CardTitle>
                <CardDescription>
                    Review the details and publish your test to the community.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Card className="bg-neutral-50 border-neutral-200">
                        <CardHeader>
                            <CardTitle className="text-lg">{title}</CardTitle>
                             <CardDescription>You are offering {creditsPerTester} credits for this test.</CardDescription>
                        </CardHeader>
                    </Card>
                    <div className="flex items-center justify-between p-4 bg-neutral-100 rounded-lg">
                        <p className="font-semibold text-black">Total Cost: {parseInt(maxTesters || '0') * parseInt(creditsPerTester || '0')} Credits</p>
                        {/* <p className="text-sm text-neutral-500">Your balance: 120 Credits</p> */}
                    </div>
                    <Button size="lg" className="bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-400" onClick={handlePublish} disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                        Pay & Publish
                    </Button>
                </CardContent>
            </Card>
        )}
         <div className="flex items-center justify-between mt-8">
            <Button variant="outline" className="border-neutral-300 hover:bg-neutral-100" onClick={prevStep} disabled={step === 1}>Back</Button>
            <Button onClick={nextStep} disabled={step === 4} className="bg-black text-white hover:bg-neutral-800">Next</Button>
        </div>
    </div>
  );
}
