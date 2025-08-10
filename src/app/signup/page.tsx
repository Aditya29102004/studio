"use client"

import { useState } from "react";
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
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const allSkills = ["UX/UI", "SaaS", "Mobile Apps", "E-commerce", "Gaming", "Fintech", "AI/ML", "Developer Tools"];


export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if(name && email && password) {
          setStep(2);
      } else {
          toast({ title: "Missing fields", description: "Please fill out all fields.", variant: "destructive" });
      }
      return;
    }

    setLoading(true);
    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    if (error) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (data.user && data.user.identities && data.user.identities.length === 0) {
      toast({
        title: "Account already exists",
        description: "An account with this email already exists but is not verified. Please check your email to confirm it or log in.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    if (data.user) {
      // The profile is created by a trigger. Now we update it with the extra info.
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          bio: bio,
          skills: selectedSkills,
          updated_at: new Date().toISOString()
        })
        .eq('id', data.user.id);
      
      if(profileError) {
         toast({
            title: "Profile Update Failed",
            description: "Your account was created, but we couldn't save your profile details: " + profileError.message,
            variant: "destructive",
          });
      } else {
         toast({
            title: "Sign Up Successful!",
            description: "Please check your email to verify your account.",
          });
          router.push("/login");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50 py-12">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSignUp}>
          {step === 1 && (
            <>
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
                  <Input
                    id="name"
                    placeholder="Alex Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-black text-white hover:bg-neutral-800">
                    Continue
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
            </>
          )}

          {step === 2 && (
             <>
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl">Tell Us About Yourself</CardTitle>
                <CardDescription>This helps us recommend relevant tests. You've earned 20 credits for signing up!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bio">Your Bio</Label>
                   <Textarea 
                      id="bio"
                      placeholder="I'm a product designer passionate about creating intuitive user experiences."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="min-h-[100px]"
                   />
                </div>
                 <div className="space-y-2">
                  <Label>Skills & Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map(skill => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "secondary"}
                        onClick={() => toggleSkill(skill)}
                        className="cursor-pointer bg-neutral-100 text-black hover:bg-neutral-200 data-[state=active]:bg-black data-[state=active]:text-white"
                        data-state={selectedSkills.includes(skill) ? 'active' : 'inactive'}
                      >
                          {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button type="submit" className="w-full bg-black text-white hover:bg-neutral-800" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Finish & Create Account'}
                </Button>
                 <Button variant="link" onClick={() => setStep(1)} className="w-full">Back</Button>
              </CardContent>
            </>
          )}
        </form>
      </Card>
    </div>
  );
}
