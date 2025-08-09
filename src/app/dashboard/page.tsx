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
import { FileText, ClipboardList, ListChecks, HelpCircle } from "lucide-react";
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

const completedTests = [
  {
    title: "Landing Page Copy Review",
    status: "Approved",
    reward: 10,
  },
];

export default function DashboardPage() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Available Tests</CardTitle>
            <CardDescription>
              Complete tests to earn credits and help startups improve.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {availableTests.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableTests.map((test) => (
                  <Card key={test.title}>
                    <CardHeader>
                        <CardTitle className="text-base">{test.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <span>
                                <Badge variant="outline" className="mr-2">{test.category === 'Website' ? <FileText className="h-3 w-3 mr-1" /> : <ListChecks className="h-3 w-3 mr-1" />} {test.category}</Badge>
                            </span>
                            <span>{test.time}</span>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <span className="text-sm font-semibold text-primary/80">+{test.reward} CC</span>
                            <Button asChild size="sm">
                            <Link href="/dashboard/test-details">Start</Link>
                            </Button>
                        </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No tests available</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Check back soon for new opportunities.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reward</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedTests.map((test) => (
                  <TableRow key={test.title}>
                    <TableCell className="font-medium">{test.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{test.status}</Badge>
                    </TableCell>
                    <TableCell>+{test.reward} CC</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={88} className="h-2" />
             <p className="text-right text-sm font-medium mt-2">88/100</p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>My Stats</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2">
                <div className="flex justify-between"><span>Tests Posted</span> <strong>3</strong></div>
                <div className="flex justify-between"><span>Tests Taken</span> <strong>12</strong></div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
