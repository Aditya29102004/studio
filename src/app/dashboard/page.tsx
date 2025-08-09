import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filter, Clock, Coins } from "lucide-react";
import Link from "next/link";

const availableTests = [
  {
    title: "New E-commerce Checkout Flow",
    category: "Website",
    time: "10 min",
    reward: 20,
    postedBy: "Shopify",
  },
  {
    title: "Mobile Game UI Feedback",
    category: "App Test",
    time: "20 min",
    reward: 45,
    postedBy: "GameDev Inc.",
  },
  {
    title: "SaaS Dashboard Usability",
    category: "Prototype",
    time: "15 min",
    reward: 30,
    postedBy: "Innovate Co.",
  },
  {
    title: "Feedback Form Clarity Check",
    category: "Inbuilt Form",
    time: "5 min",
    reward: 10,
    postedBy: "SurveyFun",
  },
];

const postedTests = [
    { title: "My Awesome App Test", status: "Open", testers: "5/10", reviewed: 2 },
    { title: "Landing Page Copy Review", status: "In Review", testers: "20/20", reviewed: 18 },
    { title: "Signup Form Bug Hunt", status: "Completed", testers: "50/50", reviewed: 50 },
];

const takenTests = [
    { title: "New E-commerce Checkout Flow", status: "Pending Approval", reward: 20 },
    { title: "Mobile Game UI Feedback", status: "Approved", reward: 45 },
    { title: "Old Landing Page Test", status: "Rejected", reward: 0 },
]

export default function DashboardPage() {
  return (
    <Tabs defaultValue="available">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="available">Available Tests</TabsTrigger>
        <TabsTrigger value="posted">My Tests Posted</TabsTrigger>
        <TabsTrigger value="taken">My Tests Taken</TabsTrigger>
      </TabsList>
      <TabsContent value="available">
        <Card>
          <CardHeader>
            <CardTitle>Available Beta Tests</CardTitle>
            <CardDescription>
              Complete these tests to earn credits and help founders build
              better products.
            </CardDescription>
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <div className="relative flex-1">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tests..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="website">Website/App Test</SelectItem>
                  <SelectItem value="form">Inbuilt Feedback Form</SelectItem>
                  <SelectItem value="prototype">Prototype Review</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Time Required" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Time</SelectItem>
                  <SelectItem value="short">Under 5 mins</SelectItem>
                  <SelectItem value="medium">5-15 mins</SelectItem>
                  <SelectItem value="long">Over 15 mins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Time</TableHead>
                    <TableHead className="text-right">Reward</TableHead>
                    <TableHead className="w-[110px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableTests.map((test) => (
                    <TableRow key={test.title}>
                      <TableCell className="font-medium">{test.title}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{test.category}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center">
                        <div className="flex items-center justify-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {test.time}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1 font-semibold text-amber-600">
                            <Coins className="h-4 w-4" />
                            {test.reward}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button asChild variant="outline" size="sm">
                          <Link href="/dashboard/test-details">View Test</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
       <TabsContent value="posted">
        <Card>
          <CardHeader>
            <CardTitle>My Tests Posted</CardTitle>
            <CardDescription>Manage the tests you've created for the community.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Testers</TableHead>
                  <TableHead>Submissions to Review</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {postedTests.map((test) => (
                  <TableRow key={test.title}>
                    <TableCell className="font-medium">{test.title}</TableCell>
                    <TableCell>
                      <Badge variant={test.status === 'Open' ? 'default' : test.status === 'Completed' ? 'secondary' : 'outline'}>
                        {test.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{test.testers}</TableCell>
                    <TableCell>{test.reviewed}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="taken">
        <Card>
          <CardHeader>
            <CardTitle>My Tests Taken</CardTitle>
            <CardDescription>Track the status of tests you've completed.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Reward</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {takenTests.map((test) => (
                  <TableRow key={test.title}>
                    <TableCell className="font-medium">{test.title}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={test.status === 'Approved' ? 'default' : test.status === 'Rejected' ? 'destructive' : 'outline'}
                        className={test.status === 'Approved' ? 'bg-green-500 hover:bg-green-600' : ''}
                      >
                        {test.status}
                      </Badge>
                    </TableCell>
                     <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1 font-semibold text-amber-600">
                            <Coins className="h-4 w-4" />
                            {test.reward}
                        </div>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
