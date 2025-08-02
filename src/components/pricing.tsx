'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { toast } from "./ui/use-toast";


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
    // console.log("Premium Price ID:", process.env.NEXT_PUBLIC_PREMIUM_PRICE_ID);

  // const isPremium =
  //   session?.user?.subscriptionStatus === "active" &&
  //   session?.user?.stripePriceId === process.env.NEXT_PUBLIC_PREMIUM_PRICE_ID;
  const isBasic =
    session?.user?.subscriptionStatus === "active" &&
    session?.user?.stripePriceId === process.env.NEXT_PUBLIC_BASIC_PRICE_ID;


    
    return (
        <div className="container mx-auto">
    
          <div className="grid grid-cols-1 gap-8">
            {/* Basic Plan */}
            <Card  className="rounded-lg border text-card-foreground max-w-xl mx-auto bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className=" bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        SR Plan
                    </CardTitle>
                    <CardDescription  className="text-sm">
                    Help keep the wiki running and growing
                    </CardDescription>
                </CardHeader>
             <CardContent>
              <p className="text-4xl font-bold mb-6 text-center text-black dark:text-white">£3.99 <span className="text-sm text-muted-foreground">/ month</span></p>
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
                  className="w-full rounded-[5px] text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                  
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Become an SR member"}
                </Button>
              )}
             </CardFooter>
            </Card>
    
            {/* Premium Plan */}
            {/* <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
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
            </Card> */}
          </div>
        </div>
      );

}