// "use server"

// import Stripe from "stripe"
// import { auth } from "../auth";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);



// export async function createCancelSession() {
//     const user = await auth();
//     if(!user) return { error: true}

//     const subscription = await getUserSubscription(user.user.id);
// }