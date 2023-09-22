"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import BondscapeLogo from "./BondscapeLogo";
import useBreakpoints from "../hooks/layout/useBreakpoints";
import { usePathname } from "next/navigation";
import useUser from "@/hooks/user/useUser";
import SelectComponent from "@/components/SelectComponent";
import { AnimatePresence, motion } from "framer-motion";

const NavigationBar = () => {
  const [navbarBgVisible, setNavbarBgVisible] = useState(false);
  // Hooks
  const [isMobile, isMd, isBreakpointReady] = useBreakpoints();
  const pathname = usePathname();
  const { user } = useUser();
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos >= 20 && (isMobile || isMd)) {
      setNavbarBgVisible(true);
    }
  }, [isMd, isMobile]);

  useEffect(() => {
    handleScroll();
  }, [handleScroll, isBreakpointReady]);

  const RightButton = useMemo(() => {
    if (!user) {
      return;
    }
    return (
      pathname !== "/creator/login" &&
      (user.profile ? (
        <SelectComponent profile={user.profile} />
      ) : (
        <Link href={"/creator/login"}>
          <div className="text-white font-semibold">
            <button>Login</button>
          </div>
        </Link>
      ))
    );
  }, [pathname, user]);

  return (
    <nav
      className={`${
        navbarBgVisible ? "bg-bondscape-background-primary" : "bg-transparent"
      } transition-colors ease-in-out sticky flex justify-between items-center w-full h-navbar-mobile md:h-navbar-md lg:h-navbar-lg xl:h-navbar-xl px-xMobile md:px-xMd lg:px-xLg xl:px-xXl`}
    >
      <Link href="/">
        <BondscapeLogo />
      </Link>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {RightButton}
        </motion.div>
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar;