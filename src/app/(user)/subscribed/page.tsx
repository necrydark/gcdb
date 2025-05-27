// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/src/auth";
import db from "@/src/lib/db";
import ManageSubscriptionButton from "@/src/components/manage-subscription-button";

type searchParams = Promise<{params: Record<string, string>}>

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: searchParams
}) {
  const session = await auth();
  const { params } = await searchParams;

  // Redirect if not authenticated
  if (!session || !session.user?.id) {
    redirect("/auth/login"); // Or your sign-in page path
  }

  // Fetch the latest user data from the database
   const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      stripePriceId: true,
      stripeCurrentEndPeriod: true,
      subscriptionStatus: true,
    },
  });

  if (!user) {
    // This case should ideally not happen if session.user.id exists,
    // but it's good for robustness.
    redirect("/auth/login");
  }

  const sessionId = params?.session_id;

  // You might want to display a success message if coming from Stripe Checkout
  let successMessage = null;
  if (sessionId) {
    // In a real application, you might want to verify the sessionId with Stripe
    // to prevent spoofing or display more detailed success info.
    successMessage = "Subscription successful! Welcome aboard.";
  }

  const isPremium =
    user.subscriptionStatus === "active" &&
    user.stripePriceId === process.env.NEXT_PUBLIC_PREMIUM_PRICE_ID;
  const isBasic =
    user.subscriptionStatus === "active" &&
    user.stripePriceId === process.env.NEXT_PUBLIC_BASIC_PRICE_ID;

    console.log(user.subscriptionStatus)

  return (
    <div className="container mx-auto p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-10">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Your Dashboard</h1>

      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
          <p className="font-bold">Success!</p>
          <p>{successMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Account Information</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-medium">Email:</span> {user.email}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Subscription Status</h2>
          {user.subscriptionStatus === "active" ? (
            <div>
              <p className="text-lg text-green-600 dark:text-green-400 font-medium">
                Active Plan:{" "}
                {user.stripePriceId === process.env.NEXT_PUBLIC_BASIC_PRICE_ID
                  ? "Basic Plan (SR Member)"
                  : "Premium Plan (SSR Member)"}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Renews on:{" "}
                {user.stripeCurrentEndPeriod?.toLocaleDateString() || "N/A"}
              </p>
            </div>
          ) : (
            <p className="text-lg text-red-600 dark:text-red-400 font-medium">
              You currently do not have an active subscription.
              <br />
              <a href="/pricing" className="text-blue-600 hover:underline dark:text-blue-400">
                View Plans
              </a>
            </p>
          )}
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-6">Your Features</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Feature (Accessible to all subscribed) */}
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Core Dashboard Access</h3>
          <p className="text-gray-700 dark:text-gray-300">This feature is available to all active subscribers.</p>
          {(isBasic || isPremium) ? (
            <span className="text-green-600 dark:text-green-400 text-sm font-medium mt-2 block">Access Granted!</span>
          ) : (
            <span className="text-red-600 dark:text-red-400 text-sm font-medium mt-2 block">Subscribe to unlock.</span>
          )}
        </div>

        {/* Premium Feature (Locked behind Premium) */}
        <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-md border border-purple-300 dark:border-purple-700">
          <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">Exclusive Premium Content</h3>
          {isPremium ? (
            <p className="text-gray-700 dark:text-gray-300">
              Access granted! You can now view all exclusive premium content.
            </p>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              Upgrade to the Premium Plan to unlock this exclusive content.
            </p>
          )}
          {isPremium ? (
            <span className="text-green-600 dark:text-green-400 text-sm font-medium mt-2 block">Access Granted!</span>
          ) : (
            <a href="/pricing" className="text-blue-600 hover:underline dark:text-blue-400 text-sm font-medium mt-2 block">
              Upgrade now!
            </a>
          )}
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
        <ManageSubscriptionButton />
      </div>
    </div>
  );
}