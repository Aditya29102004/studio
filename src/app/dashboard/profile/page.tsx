// This page needs to be a client component to use hooks
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation'
import { createServerClient } from '@supabase/ssr';
import { supabase } from "@/lib/supabaseClient";
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
import { Skeleton } from "@/components/ui/skeleton";

type Profile = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  bio: string;
  skills: string[];
  credits: number;
  reputation_score: number;
};

type CreditHistory = {
  date: string;
  description: string;
  amount: string;
};

function ProfileContent() {
  const searchParams = useSearchParams()
  const profileId = searchParams.get('id')
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [creditHistory, setCreditHistory] = useState<CreditHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      let targetUserId = profileId;
      if (!targetUserId) {
          targetUserId = user?.id || null;
          setIsOwnProfile(true);
      } else {
          setIsOwnProfile(user?.id === profileId);
      }

      if (targetUserId) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', targetUserId)
          .single();
        
        if (profileError) {
          console.error("Error fetching profile:", profileError.message);
        } else if (profileData) {
            const { data: {user: authUser}, error: authError } = await supabase.auth.admin.getUserById(profileData.id);
            if (authError) {
                 console.error("Error fetching user email:", authError.message);
                 setProfile({ ...profileData, email: "N/A" });
            } else {
                 setProfile({ ...profileData, email: authUser?.email || "N/A" });
            }
        }

        const { data: creditData, error: creditError } = await supabase
            .from('credit_transactions')
            .select('created_at, description, amount')
            .eq('user_id', targetUserId)
            .order('created_at', { ascending: false });

        if (creditError) {
            console.error("Error fetching credit history:", creditError.message);
        } else if (creditData) {
            setCreditHistory(creditData.map(t => ({
                date: new Date(t.created_at).toLocaleDateString(),
                description: t.description || 'N/A',
                amount: `${t.amount > 0 ? '+' : ''}${t.amount}`
            })))
        }

      }
      setLoading(false);
    };

    fetchProfile();
  }, [profileId]);

  const badges = [
    { icon: <Award className="h-6 w-6"/>, name: "First Test" },
    { icon: <Briefcase className="h-6 w-6"/>, name: "Founder" },
    { icon: <CheckCircle className="h-6 w-6"/>, name: "Top Tester" },
  ];

  if (loading) {
      return <ProfileSkeleton />
  }

  if (!profile) {
    return (
        <div className="text-center py-16">
            <h3 className="text-2xl font-bold">Could not load profile.</h3>
            <p className="text-neutral-500">Please try logging out and logging back in.</p>
        </div>
    )
  }

  return (
    <div className="space-y-8">
        <Card className="bg-white border-neutral-200 shadow-sm">
            <CardContent className="pt-6 flex flex-col md:flex-row items-center gap-6">
                 <Avatar className="h-24 w-24 border-2 border-white ring-4 ring-neutral-200">
                    <AvatarImage src={profile.avatar_url || `https://i.pravatar.cc/150?u=${profile.email}`} alt="User avatar" />
                    <AvatarFallback>{profile.full_name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold">{profile.full_name}</h2>
                    <p className="text-neutral-500">{profile.email}</p>
                    <p className="mt-2 text-sm max-w-lg text-neutral-600">
                        {profile.bio}
                    </p>
                </div>
                 {isOwnProfile && (
                    <Button variant="outline" className="border-neutral-300 hover:bg-neutral-100">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                 )}
            </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-8">
                 <Card className="bg-white border-neutral-200 shadow-sm">
                    <CardHeader>
                        <CardTitle>Skills & Interests</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {profile.skills?.map(skill => (
                           <Badge key={skill} variant="secondary" className="bg-neutral-100 text-black hover:bg-neutral-200 cursor-pointer">{skill}</Badge>
                        ))}
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
                             <p className="text-2xl font-bold">{profile.credits || 0} CC</p>
                        </div>
                        <div>
                             <p className="text-sm text-neutral-500">Reputation Score</p>
                             <Progress value={profile.reputation_score || 0} className="h-2 mt-1 bg-neutral-200 [&>div]:bg-black" />
                             <p className="text-right text-xs text-neutral-500 mt-1">{profile.reputation_score || 0}/100</p>
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
                            {creditHistory.map((item, index) => (
                            <TableRow key={`${item.description}-${index}`} className="border-neutral-100">
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

export default function ProfilePage() {
    return (
        <Suspense fallback={<ProfileSkeleton/>}>
            <ProfileContent />
        </Suspense>
    )
}


function ProfileSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <Card className="bg-white border-neutral-200 shadow-sm">
                <CardContent className="pt-6 flex flex-col md:flex-row items-center gap-6">
                    <Skeleton className="h-24 w-24 rounded-full bg-neutral-200" />
                    <div className="flex-1 space-y-2 text-center md:text-left">
                        <Skeleton className="h-8 w-48 bg-neutral-200" />
                        <Skeleton className="h-5 w-64 bg-neutral-200" />
                        <Skeleton className="h-4 w-full max-w-lg bg-neutral-200" />
                    </div>
                    <Skeleton className="h-10 w-32 bg-neutral-200 rounded-md" />
                </CardContent>
            </Card>
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-8">
                    <Card className="bg-white border-neutral-200 shadow-sm">
                        <CardHeader>
                            <Skeleton className="h-6 w-32 bg-neutral-200" />
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                           {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-6 w-16 bg-neutral-200 rounded-full" />)}
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-neutral-200 shadow-sm">
                        <CardHeader>
                           <Skeleton className="h-6 w-24 bg-neutral-200" />
                        </CardHeader>
                        <CardContent className="grid grid-cols-4 gap-4 text-center">
                             {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-10 w-10 bg-neutral-200 rounded-md" />)}
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-neutral-200 shadow-sm">
                         <CardHeader>
                           <Skeleton className="h-6 w-16 bg-neutral-200" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <Skeleton className="h-8 w-24 bg-neutral-200" />
                           <Skeleton className="h-6 w-full bg-neutral-200" />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card className="bg-white border-neutral-200 shadow-sm">
                        <CardHeader>
                             <Skeleton className="h-8 w-40 bg-neutral-200" />
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="flex justify-between">
                                        <Skeleton className="h-5 w-24 bg-neutral-200" />
                                        <Skeleton className="h-5 w-48 bg-neutral-200" />
                                        <Skeleton className="h-5 w-16 bg-neutral-200" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
