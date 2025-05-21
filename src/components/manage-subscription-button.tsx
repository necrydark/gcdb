// app/dashboard/manage-subscription-button.tsx
"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";

export default function ManageSubscriptionButton() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleManageSubscription = async () => {
    if (status === "unauthenticated" || !session?.user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to manage your subscription.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/create-customer-portal", {
        method: "POST",
      });

      const data = await response.json();
      if (response.ok) {
        window.location.href = data.url;
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to open customer portal.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error managing subscription:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <p className="text-gray-600 dark:text-gray-400">Loading billing options...</p>;
  }

  // Optionally, hide the button if the user is not authenticated,
  // though the handler already redirects.
  if (status === "unauthenticated") {
    return null; // Don't render the button if user is not logged in
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Billing & Subscriptions</h2>
      <Button
        onClick={handleManageSubscription}
        className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
        disabled={loading}
      >
        {loading ? "Opening Portal..." : "Manage My Subscription"}
      </Button>
    </div>
  );
}