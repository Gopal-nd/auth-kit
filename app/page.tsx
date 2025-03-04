import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Prociono } from "next/font/google";
import Image from "next/image";

const font = Prociono({
  weight:["400"],
  subsets:["latin"]

})

export default function Home() {
  return (
<main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] fromsky-400 to-blue-800">
  <div className="space-y-6 text-center">
    <h1 className={cn('text-6xl font-bold',font.className)}>Auth</h1>
    <p className="text-white text-lg">
      A Simple Auth System
    </p>
    <LoginButton >
    <Button variant={'default'} size={'lg'}>Sign In</Button>
    </LoginButton>
  </div>
</main>
  );
}
