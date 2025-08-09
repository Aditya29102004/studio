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
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Award, Edit, HelpCircle } from "lucide-react";

const creditHistory = [
  { date: "2023-10-26", description: "Earned from 'Checkout Flow Test'", amount: "+20" },
  { date: "2023-10-25", description: "Spent on 'My Awesome App Test'", amount: "-500" },
  { date: "2023-10-24", description: "Earned from 'Mobile Game UI Feedback'", amount: "+45" },
  { date: "2023-10-22", description: "Credit Pack Purchase", amount: "+100" },
];

const badges = [
    { name: "First Test", icon: Award },
    { name: "Bug Hunter", icon: Award },
    { name: "Top 10% Tester", icon: Award },
    { name: "Feedback Pro", icon: Award },
    { name: "Beta Pioneer", icon: Award },
]

export default function ProfilePage() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-8">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">Alex Doe</h2>
            <p className="text-muted-foreground">alex.doe@example.com</p>
            <p className="mt-4 text-sm">
              UX enthusiast and beta tester. Passionate about helping startups
              build intuitive and beautiful products.
            </p>
            <Button variant="outline" className="mt-4 w-full">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Skills & Interests</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                <Badge>UX/UI</Badge>
                <Badge>SaaS</Badge>
                <Badge>Mobile Apps</Badge>
                <Badge>E-commerce</Badge>
                <Badge>Gaming</Badge>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Reputation Score</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-5 w-5 text-muted-foreground cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>High reputation gives you access to exclusive tests and higher rewards.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>
              Your score is based on the quality of your test submissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-green-600">88</span>
                <Progress value={88} className="w-full" />
            </div>
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle>Badges Earned</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-center">
            {badges.map(badge => (
                <div key={badge.name} className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-secondary rounded-full">
                        <badge.icon className="h-8 w-8 text-amber-500" />
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">{badge.name}</p>
                </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credits History</CardTitle>
            <CardDescription>
              A log of your earned and spent credits.
            </CardDescription>
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
                    <TableCell className="hidden sm:table-cell">{item.date}</TableCell>
                    <TableCell>
                        <p className="font-medium sm:hidden">{item.description}</p>
                        <p className="hidden sm:block">{item.description}</p>
                        <p className="text-xs text-muted-foreground sm:hidden">{item.date}</p>
                    </TableCell>
                    <TableCell className={`text-right font-semibold ${item.amount.startsWith('+') ? 'text-green-600' : 'text-foreground'}`}>
                      {item.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
