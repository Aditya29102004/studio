"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
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
import { Check, Clock, Coins, Upload, Loader2, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { submitTestFeedback } from "@/lib/actions";


type TestDetails = {
  id: number;
  title: string;
  category: string;
  reward_credits: number;
  estimated_time: number;
  description: string;
  instructions: string[];
  questions: { type: string, content: string, options?: string[] }[];
  proof_method: 'form' | 'manual';
  poster: {
    id: string;
    full_name: string;
    avatar_url: string;
  }
};

type Answers = {
  [key: number]: string | string[];
}

function TestDetailsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const testId = searchParams.get('id');

  const [test, setTest] = useState<TestDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    if (!testId) {
      setLoading(false);
      return;
    };

    const fetchTestDetails = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tests')
        .select(`
            *,
            poster:profiles ( id, full_name, avatar_url )
        `)
        .eq('id', testId)
        .single();
      
      if (error) {
        console.error('Error fetching test details:', error);
        toast({ title: "Error", description: "Could not load test details.", variant: "destructive" });
        setTest(null);
      } else {
        // @ts-ignore
        setTest({
            ...data,
            instructions: JSON.parse(data.instructions || '[]'),
            questions: JSON.parse(data.questions || '[]'),
            poster: data.poster
        });
      }
      setLoading(false);
    };

    fetchTestDetails();
  }, [testId, toast]);

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers(prev => ({...prev, [questionIndex]: value}));
  }

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    if (!testId) {
        toast({ title: "Error", description: "Test ID is missing.", variant: "destructive" });
        setSubmitting(false);
        return;
    }

    const result = await submitTestFeedback(parseInt(testId), answers);

    if (result.error) {
        toast({ title: "Submission Failed", description: result.error, variant: "destructive" });
    } else {
        toast({ title: "Success!", description: "Your feedback has been submitted for review." });
        router.push('/dashboard');
    }
    setSubmitting(false);
  }

  if (loading) {
    return <TestDetailsSkeleton />;
  }

  if (!test) {
    return <div className="text-center py-16">Test not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-white border-neutral-200 shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Badge variant="outline" className="border-neutral-300">{test.category}</Badge>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Coins className="h-4 w-4" />
                    <span>{test.reward_credits} Credits Reward</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Clock className="h-4 w-4" />
                    <span>~{test.estimated_time} minutes</span>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-black">
                {test.title}
              </CardTitle>
               <CardDescription className="pt-2">{test.description}</CardDescription>
                <Link href={`/dashboard/profile?id=${test.poster.id}`} className="mt-4 flex items-center gap-2 group">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={test.poster.avatar_url} />
                        <AvatarFallback>{test.poster.full_name?.[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-neutral-700 group-hover:underline">
                        Posted by {test.poster.full_name}
                    </span>
                </Link>
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
              {test.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <form className="space-y-4" onSubmit={handleSubmitFeedback}>
        <Card className="bg-white border-neutral-200 shadow-sm">
            <CardHeader>
                <CardTitle>Submit Your Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 {test.questions.map((q, index) => (
                      <Card key={index} className="bg-neutral-50 border-neutral-200 p-4">
                        <Label className="font-semibold text-black">{q.content}</Label>
                        {q.type === 'text' && (
                           <Textarea className="mt-2 bg-white" placeholder="Type your answer here..." onChange={e => handleAnswerChange(index, e.target.value)} />
                        )}
                        {q.type === 'rating' && (
                            <div className="flex items-center gap-2 mt-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <button 
                                        key={rating} 
                                        type="button" 
                                        onClick={() => handleAnswerChange(index, rating.toString())}
                                        className={`h-10 w-10 flex items-center justify-center rounded-full border-2 border-black transition-colors ${answers[index] === rating.toString() ? 'bg-black text-white' : 'text-black hover:bg-black hover:text-white'}`}
                                    >
                                        {rating}
                                    </button>
                                ))}
                            </div>
                        )}
                        {q.type === 'mcq' && (
                             <RadioGroup className="mt-2 space-y-1" onValueChange={value => handleAnswerChange(index, value)}>
                                {q.options?.map((opt, i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opt} id={`q${index}-opt${i}`} />
                                        <Label htmlFor={`q${index}-opt${i}`} className="font-normal">{opt}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        )}
                      </Card>
                 ))}
                 {test.proof_method === 'manual' && (
                     <Card className="bg-neutral-50 border-neutral-200 p-4">
                        <Label className="font-semibold text-black">Upload a screenshot of the final step.</Label>
                         <div className="mt-2 flex items-center justify-center flex-col gap-2 rounded-md border-2 border-dashed border-neutral-300 p-8 text-center">
                            <Upload className="h-8 w-8 text-neutral-400" />
                            <p className="text-sm text-neutral-500">Drag & drop or <Button variant="link" type="button" className="p-0 h-auto text-black">click to upload</Button></p>
                            <Input type="file" className="sr-only"/>
                        </div>
                     </Card>
                 )}
            </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="bg-black text-white hover:bg-neutral-800" disabled={submitting}>
            {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
            Submit Feedback
          </Button>
        </div>
      </form>
    </div>
  );
}


function TestDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
      <Card className="bg-white border-neutral-200 shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-4 mb-2">
                <Skeleton className="h-6 w-20 bg-neutral-200" />
                <Skeleton className="h-5 w-32 bg-neutral-200" />
                <Skeleton className="h-5 w-28 bg-neutral-200" />
              </div>
              <Skeleton className="h-9 w-96 bg-neutral-200" />
              <Skeleton className="h-5 w-full max-w-lg bg-neutral-200" />
              <div className="flex items-center gap-2 pt-2">
                 <Skeleton className="h-8 w-8 rounded-full bg-neutral-200" />
                 <Skeleton className="h-5 w-40 bg-neutral-200" />
              </div>
            </div>
            <div className="flex-shrink-0">
              <Skeleton className="h-12 w-32 bg-neutral-200 rounded-lg" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-32 mb-2 bg-neutral-200" />
          <Skeleton className="h-24 w-full bg-neutral-200 rounded-md" />
        </CardContent>
      </Card>
    </div>
  )
}

export default function TestDetailsPage() {
    return (
        <Suspense fallback={<TestDetailsSkeleton/>}>
            <TestDetailsContent />
        </Suspense>
    )
}
