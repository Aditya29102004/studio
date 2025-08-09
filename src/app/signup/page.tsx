import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <Card className="w-full max-w-sm">
         <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
                <Logo className="h-8 w-8 text-black" />
            </div>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>Join the community to test and build amazing products</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Alex Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full bg-black text-white hover:bg-neutral-800">
            Create Account
          </Button>
        </CardContent>
        <CardFooter className="text-center text-sm">
             <p className="w-full">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                    Login
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
