import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Edit } from "lucide-react";

const creditHistory = [
  { date: "2023-10-26", description: "Completed Test: 'Checkout Flow Test'", amount: "+20" },
  { date: "2023-10-25", description: "Posted Test: 'My Awesome App Test'", amount: "-500" },
  { date: "2023-10-24", description: "Completed Test: 'Mobile Game UI Feedback'", amount: "+45" },
];

export default function ProfilePage() {
  return (
    <div className="space-y-8">
        <Card>
            <CardContent className="pt-6 flex flex-col md:flex-row items-center gap-6">
                 <Avatar className="h-24 w-24">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold">Alex Doe</h2>
                    <p className="text-muted-foreground">alex.doe@example.com</p>
                    <p className="mt-2 text-sm max-w-lg">
                    UX enthusiast and beta tester. Passionate about helping startups
                    build intuitive and beautiful products.
                    </p>
                </div>
                 <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                </Button>
            </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>Skills & Interests</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        <Badge variant="secondary">UX/UI</Badge>
                        <Badge variant="secondary">SaaS</Badge>
                        <Badge variant="secondary">Mobile Apps</Badge>
                        <Badge variant="secondary">E-commerce</Badge>
                        <Badge variant="secondary">Gaming</Badge>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                             <p className="text-sm text-muted-foreground">Credits Balance</p>
                             <p className="text-2xl font-bold">120 CC</p>
                        </div>
                        <div>
                             <p className="text-sm text-muted-foreground">Reputation Score</p>
                             <Progress value={88} className="h-2 mt-1" />
                             <p className="text-right text-xs text-muted-foreground mt-1">88/100</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
             <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Credit History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {creditHistory.map((item) => (
                            <TableRow key={item.description}>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell className={`text-right font-semibold ${item.amount.startsWith('+') ? 'text-green-600' : ''}`}>
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
