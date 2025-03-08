import { useServerUser } from "@/hooks/use-server-user";
import { NextResponse } from "next/server";

export async function GET(){
    
    const user = await useServerUser()
    if(user?.role=='ADMIN'){
    return new NextResponse(null,{status:200})

    }

    return new NextResponse(null,{status:403})
}