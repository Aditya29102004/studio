import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Award, Briefcase, CheckCircle } from "lucide-react";

const creditHistory = [
  { date: "2023-10-26", description: "Completed Test: 'Checkout Flow Test'", amount: "+20" },
  { date: "2023-10-25", description: "Posted Test: 'My Awesome App Test'", amount: "-500" },
  { date: "2023-10-24", description: "Completed Test: 'Mobile Game UI Feedback'", amount: "+45" },
];

const badges = [
    { icon: <Award className="h-6 w-6"/>, name: "First Test" },
    { icon: <Briefcase className="h-6 w-6"/>, name: "Founder" },
    { icon: <CheckCircle className="h-6 w-6"/>, name: "Top Tester" },
]

export default function ProfilePage() {
  return (
    <div className="space-y-8">
        <Card className="bg-white border-neutral-200 shadow-sm">
            <CardContent className="pt-6 flex flex-col md:flex-row items-center gap-6">
                 <Avatar className="h-24 w-24 border-2 border-white ring-4 ring-neutral-200">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold">Alex Doe</h2>
                    <p className="text-neutral-500">alex.doe@example.com</p>
                    <p className="mt-2 text-sm max-w-lg text-neutral-600">
                    UX enthusiast and beta tester. Passionate about helping startups
                    build intuitive and beautiful products.
                    </p>
                </div>
                 <Button variant="outline" className="border-neutral-300 hover:bg-neutral-100">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                </Button>
            </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-8">
                 <Card className="bg-white border-neutral-200 shadow-sm">
                    <CardHeader>
                        <CardTitle>Skills & Interests</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-neutral-100 text-black hover:bg-neutral-200 cursor-pointer">UX/UI</Badge>
                        <Badge variant="secondary" className="bg-neutral-100 text-black hover:bg-neutral-200 cursor-pointer">SaaS</Badge>
                        <Badge variant="secondary" className="bg-neutral-100 text-black hover:bg-neutral-200 cursor-pointer">Mobile Apps</Badge>
                        <Badge variant="secondary" className="bg-neutral-100 text-black hover:bg-neutral-200 cursor-pointer">E-commerce</Badge>
                        <Badge variant="secondary" className="bg-neutral-100 text-black hover:bg-neutral-200 cursor-pointer">Gaming</Badge>
                    </CardContent>
                </Card>
                 <Card className="bg-white border-neutral-200 shadow-sm">
                    <CardHeader>
                        <CardTitle>Badges</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-4 gap-4 text-center">
                        {badges.map((badge) => (
                            <div key={badge.name} className="flex flex-col items-center gap-1 text-neutral-500">
                                {badge.icon}
                                <span className="text-xs">{badge.name}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card className="bg-white border-neutral-200 shadow-sm">
                    <CardHeader>
                        <CardTitle>Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                             <p className="text-sm text-neutral-500">Credits Balance</p>
                             <p className="text-2xl font-bold">120 CC</p>
                        </div>
                        <div>
                             <p className="text-sm text-neutral-500">Reputation Score</p>
                             <Progress value={88} className="h-2 mt-1 bg-neutral-200 [&>div]:bg-black" />
                             <p className="text-right text-xs text-neutral-500 mt-1">88/100</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
             <div className="lg:col-span-2">
                <Card className="bg-white border-neutral-200 shadow-sm">
                    <CardHeader>
                        <CardTitle>Credit History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="text-neutral-500">Date</TableHead>
                            <TableHead className="text-neutral-500">Description</TableHead>
                            <TableHead className="text-right text-neutral-500">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {creditHistory.map((item) => (
                            <TableRow key={item.description} className="border-neutral-100">
                                <TableCell className="text-neutral-500">{item.date}</TableCell>
                                <TableCell className="text-black">{item.description}</TableCell>
                                <TableCell className={`text-right font-semibold ${item.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {item.amount} CC
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
