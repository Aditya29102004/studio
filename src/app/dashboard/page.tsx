"use client"

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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, ClipboardList, ListChecks, HelpCircle, Trophy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


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

const postedTests = [
    { title: "My Awesome App Test", status: "Open", testers: "5/10", reviewed: 2 },
    { title: "Landing Page Copy Review", status: "In Review", testers: "20/20", reviewed: 18 },
];

const takenTests = [
    { title: "New E-commerce Checkout Flow", status: "Pending Approval", reward: 20 },
    { title: "Mobile Game UI Feedback", status: "Approved", reward: 45 },
]

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("available");

    const renderTests = (tests: any[], type: 'available' | 'posted' | 'taken') => {
        if (tests.length === 0) {
            return (
                <div className="text-center py-12">
                    <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No tests available</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Check back soon for new opportunities.
                    </p>
                    <Button variant="outline" className="mt-4">Refresh</Button>
                </div>
            )
        }
        if(type === 'available'){
            return (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {tests.map((test) => (
                    <Card key={test.title} className="hover:shadow-lg hover:scale-105 transition-transform duration-200">
                        <CardHeader>
                            <CardTitle className="text-base">{test.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-between h-full">
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                <span>
                                    <Badge variant="outline" className="mr-2">{test.category === 'Website' ? <FileText className="h-3 w-3 mr-1" /> : <ListChecks className="h-3 w-3 mr-1" />} {test.category}</Badge>
                                </span>
                                <span>{test.time}</span>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <span className="text-sm font-semibold text-primary/80">+{test.reward} CC</span>
                                <Button asChild size="sm" variant="default">
                                <Link href="/dashboard/test-details">View Details</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            )
        }
        return (
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        {type === 'posted' && <TableHead>Testers</TableHead>}
                        {type === 'posted' && <TableHead>Reviewed</TableHead>}
                        {type === 'taken' && <TableHead>Reward</TableHead>}
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tests.map((test) => (
                    <TableRow key={test.title}>
                        <TableCell className="font-medium">{test.title}</TableCell>
                        <TableCell>
                        <Badge variant={test.status === 'Open' || test.status === 'Approved' ? 'secondary' : 'outline'}>
                            {test.status}
                        </Badge>
                        </TableCell>
                        {type === 'posted' && <TableCell>{test.testers}</TableCell>}
                        {type === 'posted' && <TableCell>{test.reviewed}</TableCell>}
                        {type === 'taken' && <TableCell>+{test.reward} CC</TableCell>}
                         <TableCell className="text-right">
                         <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        )

    }

  return (
    <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
                <Button variant={activeTab === 'available' ? 'default' : 'ghost'} onClick={() => setActiveTab('available')}>Available Tests</Button>
                <Button variant={activeTab === 'posted' ? 'default' : 'ghost'} onClick={() => setActiveTab('posted')}>My Tests Posted</Button>
                <Button variant={activeTab === 'taken' ? 'default' : 'ghost'} onClick={() => setActiveTab('taken')}>My Tests Taken</Button>
            </div>
            {activeTab === 'available' && renderTests(availableTests, 'available')}
            {activeTab === 'posted' && <Card>{renderTests(postedTests, 'posted')}</Card>}
            {activeTab === 'taken' && <Card>{renderTests(takenTests, 'taken')}</Card>}
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Credits Balance</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">120</p>
                    <Button asChild className="w-full mt-4">
                        <Link href="/dashboard/credits">Buy Credits</Link>
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Reputation Score</span>
                         <TooltipProvider>
                            <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Your score is based on the quality of your test submissions.</p>
                            </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Progress value={88} className="h-2" />
                     <p className="text-right text-sm font-medium mt-2">88/100</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                <CardContent className="flex flex-col gap-2">
                     <Button asChild variant="outline">
                        <Link href="/dashboard/post-a-test">Post a New Test</Link>
                    </Button>
                     <Button asChild variant="outline">
                        <Link href="/dashboard/page">Browse New Tests</Link>
                    </Button>
                     <Button variant="outline">
                        <Trophy className="mr-2 h-4 w-4" /> View Leaderboard
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
