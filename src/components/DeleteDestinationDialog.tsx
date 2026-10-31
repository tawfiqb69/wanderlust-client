'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";


const DeleteDestinationDialog = ({id}:{id:string}) => {

    const handleDeleteDestination = async()=>{
        const token = await getTokenFromClient()
       
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`, 
            {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        )
        const data = await res.json()
        redirect('/destinations')
    } 



    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger render={<Button
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                    <Trash2 className="size-4" />
                    Cancel
                </Button>} />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteDestination}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteDestinationDialog;