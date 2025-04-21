"use client"

import { ExtendedUser } from "@/src/next-auth";
import { Account, Comments, Favourite, TwoFactorConfirmation, User } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useToast } from "../../ui/use-toast";
import { useState } from "react";

interface UserInterface {
    user: User & {
        Favourites: Favourite[]
        Comments: Comments[]
    }
}

export default function ViewUserPage({
    user
}: UserInterface) {
    console.log(user);
    const router = useRouter();
    const { toast } = useToast();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    return (
        <div>
            Hello
        </div>
    )
}