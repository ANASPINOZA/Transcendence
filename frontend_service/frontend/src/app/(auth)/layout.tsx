'use client';
import React, { useContext, useEffect, useState, createContext } from "react";
import Loading from "@/app/components/Loading";
import Authorization from "@/utils/auth";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Confirm from "./confirm/page";
import ConfirmAuth from "./confirmauth/page";
import Navbar from "./game/components/Navbar";
import { UserContext } from "@/utils/createContext";

// import './globals.css'
// import '../../../src/app/'


interface User {
  id?: string;
  email?: string;
  username?: string;
  profilePic?: string;
  hash?: string;
  typeLog?: string;
  isTwoFactorEnabled?: boolean;
  isConfirmed2Fa?: boolean;
  title?: string;
}

function RootLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [twoFa, setTwoFa] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "auth/check", {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setAuthenticated(true);
          if (data?.isTwoFactorEnabled && !data.isConfirmed2Fa) {
            setTwoFa(true);
            return;
          }
        }
        else {
          router.push("/");
          return <Loading />;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    checkAuthentication();
  }, [pathname]);
  const [prevPath, setPrevPath] = useState("/");
  const [isRouting, setisRouting] = useState(false);
  // useEffect(() => {
  //   if (prevPath !== pathname) {
  //     setisRouting(true);
  //   }
  // }, [pathname, prevPath]);
  // useEffect(() => {
  //   // Redirect to '/' on the client side without adding to the history
  //   if (isRouting)
  //   {
  //     setPrevPath(pathname);
  //     setisRouting(false);
  //    window.history.replaceState({}, document.title, '/');
  //   }
  // }, [pathname, router]);
  const value = { user, setUser };
  return (
    <main className="h-screen w-screen bg-[#050A27]">

      <UserContext.Provider value={value}>
        <>
          {authenticated ? (
            twoFa ? (
              // Render Confirm component when authenticated and twoFa is true
              <ConfirmAuth />
            ) : (
              // Render children if user is authenticated and !user.hash is true
              !user?.hash ? (
                <Confirm /> // Replace with your component for 2FA confirmation
              ) : (
                <>
                  <Navbar />
                  {children}
                </>
              )
            )
          ) : (
            // Render Loading component when not authenticated
            <Loading />
          )}
        </>
      </UserContext.Provider>
    </main>
  );
}

export default RootLayout;

export function useUser() {
  const { user } = useContext(UserContext);
  return user;
}
