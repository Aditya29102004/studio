// This component needs to be a client component to fetch data
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ClipboardList, ListChecks, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";


type Test = {
  id: number;
  title: string;
  category: string;
  estimated_time: string;
  reward_credits: number;
};

type PostedTest = {
    id: number;
    title: string;
    status: string;
    testers: string; // "current/max"
};

type TakenTest = {
    id: number;
    test: { title: string };
    status: string;
    reward: number;
};

export default function DashboardPage() {
    const [availableTests, setAvailableTests] = useState<Test[]>([]);
    const [myPostedTests, setMyPostedTests] = useState<PostedTest[]>([]);
    const [myTakenTests, setMyTakenTests] = useState<TakenTest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTests = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setLoading(false);
            return;
        }

        // Fetch available tests (not posted by current user and not already taken)
        const { data: availableData, error: availableError } = await supabase
            .from('tests')
            .select('id, title, category, estimated_time, reward_credits')
            .eq('status', 'open')
            .not('user_id', 'eq', user.id);

        if(availableError) console.error("Error fetching available tests:", availableError);
        
        const { data: submissions, error: submissionsError } = await supabase
            .from('test_submissions')
            .select('test_id')
            .eq('user_id', user.id);

        if(submissionsError) console.error("Error fetching submissions:", submissionsError);

        const takenTestIds = submissions?.map(s => s.test_id) || [];
        const filteredAvailableTests = availableData?.filter(t => !takenTestIds.includes(t.id)) || [];
        setAvailableTests(filteredAvailableTests.map(t => ({...t, estimated_time: `${t.estimated_time} min`})));
        

        // Fetch user's posted tests
        const { data: postedData, error: postedError } = await supabase
            .from('tests')
            .select('id, title, status, max_testers')
            .eq('user_id', user.id);
        
        if (postedError) console.error("Error fetching posted tests:", postedError);
        else if (postedData) {
            // This is a simplification. A real implementation would count submissions.
            setMyPostedTests(postedData.map(t => ({...t, testers: `0/${t.max_testers}`})));
        }


        // Fetch user's taken tests
        const { data: takenData, error: takenError } = await supabase
            .from('test_submissions')
            .select(`
                id,
                status,
                test:tests ( title, reward_credits )
            `)
            .eq('user_id', user.id);
        
        if (takenError) console.error("Error fetching taken tests:", takenError);
        else if (takenData) {
            // @ts-ignore
            setMyTakenTests(takenData.map(t => ({...t, reward: t.test.reward_credits})));
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchTests();
    }, []);

    if (loading) {
        return <DashboardSkeleton />
    }

  return (
    <div className="space-y-8">
      <div>
        <Tabs defaultValue="available">
          <TabsList className="bg-transparent p-0 border-b border-neutral-200 rounded-none mb-4">
            <TabsTrigger value="available" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none">Available Tests</TabsTrigger>
            <TabsTrigger value="posted" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none">My Tests Posted</TabsTrigger>
            <TabsTrigger value="taken" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none">My Tests Taken</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available">
            {availableTests.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableTests.map((test) => (
                  <Card key={test.id} className="bg-white border-neutral-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-black">{test.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-neutral-600">
                        <div className="flex items-center gap-1">
                            {test.category === 'Website' ? <FileText className="h-4 w-4" /> : <ListChecks className="h-4 w-4" />}
                            <span>{test.category}</span>
                        </div>
                        <span>{test.estimated_time}</span>
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+ {test.reward_credits} CC</Badge>
                        <Button asChild variant="outline" className="border-black text-black hover:bg-neutral-100">
                          <Link href={`/dashboard/test-details?id=${test.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-neutral-50 rounded-lg">
                <ClipboardList className="mx-auto h-12 w-12 text-neutral-400" />
                <h3 className="mt-4 text-lg font-medium text-black">No tests available now.</h3>
                <p className="mt-1 text-sm text-neutral-500">
                  Check back soon or refresh.
                </p>
                <Button variant="outline" className="mt-4 border-neutral-300 hover:bg-neutral-100" onClick={fetchTests}>
                    <RefreshCw className="mr-2 h-4 w-4"/>
                    Refresh
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="posted">
             <Card className="bg-white border-neutral-200 shadow-sm">
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Testers</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {myPostedTests.map((test) => (
                        <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.title}</TableCell>
                            <TableCell>
                            <Badge variant={test.status === 'open' ? 'default' : 'secondary'} className={test.status === 'open' ? 'bg-blue-100 text-blue-800' : 'bg-neutral-100 text-neutral-800'}>{test.status}</Badge>
                            </TableCell>
                            <TableCell>{test.testers}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
             </Card>
          </TabsContent>
          <TabsContent value="taken">
             <Card className="bg-white border-neutral-200 shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reward</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {myTakenTests.map((test) => (
                        <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.test.title}</TableCell>
                            <TableCell>
                            <Badge variant={test.status === 'approved' ? 'default' : 'secondary'} className={test.status === 'approved' ? 'bg-green-100 text-green-800' : test.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>{test.status}</Badge>
                            </TableCell>
                            <TableCell className="text-green-600 font-semibold">+{test.reward} CC</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="flex items-center space-x-4 border-b">
                 <Skeleton className="h-10 w-28 bg-neutral-200" />
                 <Skeleton className="h-10 w-36 bg-neutral-200" />
                 <Skeleton className="h-10 w-36 bg-neutral-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="bg-white border-neutral-200 shadow-sm">
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4 bg-neutral-200" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex items-center justify-between text-sm text-neutral-600">
                                <Skeleton className="h-5 w-20 bg-neutral-200" />
                                <Skeleton className="h-5 w-16 bg-neutral-200" />
                            </div>
                             <div className="flex items-center justify-between w-full">
                                <Skeleton className="h-6 w-16 bg-neutral-200 rounded-full" />
                                <Skeleton className="h-10 w-28 bg-neutral-200 rounded-md" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}