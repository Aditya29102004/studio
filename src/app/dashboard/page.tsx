import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ClipboardList, ListChecks, HelpCircle, Briefcase, CheckCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

const availableTests = [
  {
    title: "New E-commerce Checkout Flow",
    category: "Website",
    time: "10 min",
    reward: 20,
  },
  {
    title: "Mobile Game UI Feedback",
    category: "App Test",
    time: "20 min",
    reward: 45,
  },
  {
    title: "SaaS Dashboard Usability",
    category: "Prototype",
    time: "15 min",
    reward: 30,
  },
];

const myPostedTests = [
    { title: "Landing Page Copy Review", status: "Active", testers: "15/50" },
    { title: "Onboarding Flow Analysis", status: "Completed", testers: "25/25" },
];

const myTakenTests = [
  { title: "Checkout Flow Test", status: "Approved", reward: 10 },
  { title: "Mobile UI Feedback", status: "Pending", reward: 45 },
];

export default function DashboardPage() {
  return (
    <div className="grid md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-2">
        <Tabs defaultValue="available">
          <TabsList className="bg-transparent p-0 border-b border-neutral-200 rounded-none mb-4">
            <TabsTrigger value="available" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none">Available Tests</TabsTrigger>
            <TabsTrigger value="posted" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none">My Tests Posted</TabsTrigger>
            <TabsTrigger value="taken" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none">My Tests Taken</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available">
            {availableTests.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {availableTests.map((test) => (
                  <Card key={test.title} className="bg-white border-neutral-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-black">{test.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-neutral-600">
                        <div className="flex items-center gap-1">
                            {test.category === 'Website' ? <FileText className="h-4 w-4" /> : <ListChecks className="h-4 w-4" />}
                            <span>{test.category}</span>
                        </div>
                        <span>{test.time}</span>
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+ {test.reward} CC</Badge>
                        <Button asChild variant="outline" className="border-black text-black hover:bg-neutral-100">
                          <Link href="/dashboard/test-details">View Details</Link>
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
                <Button variant="outline" className="mt-4 border-neutral-300 hover:bg-neutral-100">
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
                        <TableRow key={test.title}>
                            <TableCell className="font-medium">{test.title}</TableCell>
                            <TableCell>
                            <Badge variant={test.status === 'Active' ? 'default' : 'secondary'} className={test.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-neutral-100 text-neutral-800'}>{test.status}</Badge>
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
                        <TableRow key={test.title}>
                            <TableCell className="font-medium">{test.title}</TableCell>
                            <TableCell>
                            <Badge variant={test.status === 'Approved' ? 'default' : 'secondary'} className={test.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>{test.status}</Badge>
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
      <div className="space-y-6">
        <Card className="bg-white border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle>Credits Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">120</p>
            <Button asChild className="w-full mt-4 bg-black text-white hover:bg-neutral-800">
                <Link href="/dashboard/credits">Buy Credits</Link>
            </Button>
          </CardContent>
        </Card>
         <Card className="bg-white border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Reputation Score</span>
              <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <HelpCircle className="h-4 w-4 text-neutral-400 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Your score for quality feedback.</p>
                    </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={88} className="h-2 bg-neutral-200 [&>div]:bg-black" />
             <p className="text-right text-sm font-medium mt-2 text-neutral-600">88/100</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-neutral-200 shadow-sm">
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Button asChild variant="outline" className="border-neutral-300 text-black hover:bg-neutral-100 justify-start">
                    <Link href="/dashboard/post-a-test"><Briefcase className="mr-2 h-4 w-4" />Post a New Test</Link>
                </Button>
                <Button asChild variant="outline" className="border-neutral-300 text-black hover:bg-neutral-100 justify-start">
                    <Link href="/dashboard/browse-tests"><CheckCircle className="mr-2 h-4 w-4" />Browse New Tests</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
