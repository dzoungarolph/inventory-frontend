
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IconLoader } from "@tabler/icons-react";
import { LoginForm } from "@/components/login-form"
import { IconBrandSketch } from "@tabler/icons-react";
import { useEffect } from "react";

export default function LoginPage() {
  const {data: session, status} = useSession();
  const router = useRouter();
  useEffect(() => {
    if(status === "authenticated"){
      router.push("/dashboard");
    }
  }, [status, router]);
  if(status === "loading"){
    return <IconLoader className="size-10 mt-40 animate-spin mx-auto h-screen  text-gray-500" />
  }
  return (
    <div
      className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div
            className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <IconBrandSketch className="size-4" />
          </div>
          OKOUME MANAGER
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
