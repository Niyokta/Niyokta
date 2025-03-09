'use client'

import React from "react";
import { TbLoader3 } from "@/components/general/reacticons";
import { useRouter } from "next/navigation";
import { Footer, Navbar } from "@/components";
import StoreProvider from "./StoreProvider";
import UserDataFetching from "@/components/general/UserDataFetching";
import { useToast } from "@/hooks/use-toast";
import ChildLayout from "./childLayout";
export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setloading] = React.useState(true);

  React.useEffect(() => {
    async function authVerification() {
      await fetch('/api/Auth/VerifyLogin', {
        method: 'GET',
        credentials: 'include'
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status !== "200") router.replace('/auth/signin')
          else setloading(false)
        })
        .catch((err) => {
          setloading(false);
          toast({ title: err.message })
        })
    }
    
    authVerification();
  })
  return (
    loading ? (
      <div className="w-full h-screen">
        <div className="w-full h-[100px]"></div>
        <TbLoader3 className="w-[50px] h-[50px] animate-spin mx-auto" />
      </div>
    ) : (
      <>
        <StoreProvider>
          <div className=" w-full min-h-screen">
            <div className="w-[90%] md:w-[70%] h-[100%] m-auto py-[10px]">
              <UserDataFetching />
              <Navbar />
              <ChildLayout>
                {children}
              </ChildLayout>
              <Footer />
            </div>
          </div>
        </StoreProvider>
      </>
    )
  )
}
