import { Button } from "./button";

interface AppbarProps { 
    user?: { 
        name?: string | null; 
    },

    onSignin: any, 
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout} : AppbarProps
) => { 
    return( 
    <div className="flex justify-around border-b px-4 border-slate-300"> 
        <div className="flex">
                <span className="flex justify-center items-center pr-2 text-3xl font-bold">Not</span>
                <span className="flex justify-center items-center text-3xl text-sky-900 font-extrabold italic">Pay</span>
                <span className="flex justify-center items-center text-3xl text-sky-500 font-extrabold italic">Pal</span>
        </div>
        <div className="flex flex-col justify-center py-2"> 
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"} </Button>
        </div>
    </div>
    )
}