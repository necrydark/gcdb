'use client'

import { useCurrentUser } from "@/hooks/use-current-user";
import { loadStripe } from "@stripe/stripe-js"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";


export default function Pricing() {
    const { data: session, status} = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubscribe = async (priceId: string) => {
        if(status === "unauthenticated") {
            router.push("/auth/login");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ priceId})
            })

            const data = await res.json();
            if(res.ok) {
                window.location.href = data.url;
            } else {
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: (data.message || "Something went wrong.")
                })
            }
        } catch (error) {
            console.error("Failed to create checkout session", error)
            toast({
                title: "Error",
                variant: "destructive",
                description: ("Something went wrong, please try again.")
            })
        } finally {
            setLoading(false)
        }
    }

    console.log("Session Status:", status);
    console.log("Session User:", session?.user);
    console.log("Basic Price ID:", process.env.NEXT_PUBLIC_BASIC_PRICE_ID);
    console.log("Premium Price ID:", process.env.NEXT_PUBLIC_PREMIUM_PRICE_ID);

  const isPremium =
    session?.user?.subscriptionStatus === "active" &&
    session?.user?.stripePriceId === process.env.NEXT_PUBLIC_PREMIUM_PRICE_ID;
  const isBasic =
    session?.user?.subscriptionStatus === "active" &&
    session?.user?.stripePriceId === process.env.NEXT_PUBLIC_BASIC_PRICE_ID;


    
    return (
        <div className="container mx-auto">
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Plan */}
            <Card  className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
                <CardHeader>
                    <CardTitle className="text-white">
                        SR Plan
                    </CardTitle>
                    <CardDescription  className="text-gray-300">
                        Access to core features
                    </CardDescription>
                </CardHeader>
             <CardContent>
              <p className="text-4xl font-bold mb-6 text-white">£3.99 / month</p>
             </CardContent>
             <CardFooter>
             {isBasic ? (
                <Button
                className="w-full rounded-[5px] bg-purple-700 hover:opacity-75 dark:bg-purple-950 text-white cursor-not-allowed" 
                  disabled
                >
                  Current Plan
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    handleSubscribe(process.env.NEXT_PUBLIC_BASIC_PRICE_ID!)
                  }
                  className="w-full rounded-[5px] bg-purple-700 hover:opacity-75 dark:bg-purple-950 text-white" 
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Become an SR member"}
                </Button>
              )}
             </CardFooter>
            </Card>
    
            {/* Premium Plan */}
            <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
              <CardHeader>
                <CardTitle  className="text-white">
                Premium Plan

                </CardTitle>
                <CardDescription className="text-gray-300">
                        Access to all features
                    </CardDescription>
              </CardHeader>
              <CardContent>
           
              <p className="text-4xl font-bold mb-6 text-white">£7.99 / month</p>
              </CardContent>
              <CardFooter>
              {isPremium ? (
                <Button
                className="w-full rounded-[5px] bg-purple-700 hover:opacity-75 dark:bg-purple-950 text-white cursor-not-allowed" 
                  disabled
                >
                  Current Plan
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    handleSubscribe(process.env.NEXT_PUBLIC_PREMIUM_PRICE_ID!)
                  }
                  className="w-full rounded-[5px] bg-purple-700 hover:opacity-75 dark:bg-purple-950 text-white" 
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Become an SSR member"}
                </Button>
              )}
              </CardFooter>
            </Card>
          </div>
        </div>
      );

}