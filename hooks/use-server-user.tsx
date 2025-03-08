import { auth } from "@/auth"

export const useServerUser = async()=>{
    const user = await auth()
    return user?.user
}