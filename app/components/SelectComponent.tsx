"use client";
import React, { useCallback, useState } from "react";
import { DesmosProfile } from "@/types/desmos";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import useLogout from "@/hooks/user/useLogout";
import { useRouter } from "next/navigation";

export default function SelectComponent({
  profile,
}: {
  readonly profile: DesmosProfile;
}) {
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const logout = useLogout();
  const router = useRouter();

  const logoutFromWeb3Auth = useCallback(async () => {
    await logout().then(() => {
      router.replace("/");
    });
    setSubMenuVisible(false);
  }, [logout, router]);

  return (
    <div className="relative z-10">
      <button
        className="flex items-center gap-2 justify-center "
        onClick={() => setSubMenuVisible((prev) => !prev)}
      >
        <div className="w-[40px] h-[40px] relative">
          <Image
            alt={"Profile picture"}
            src={profile.profilePicture || "/defaultProfilePicture.png"}
            fill
            sizes={"(max-width: 1920px) 10vw"}
            className="rounded-[20px] object-cover bg-bondscape-surface"
          />
        </div>
        <div className="text-bondscape-text_neutral_900 hover:text-bondscape-text_neutral_700 transition ease-in-out text-[16px] font-normal leading-normal">
          {profile?.nickname || profile?.dTag}
        </div>
      </button>
      <AnimatePresence>
        {subMenuVisible && (
          <motion.div
            key={"subMenu"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute flex flex-col h-[100px] w-[160px] bg-bondscape-surface top-[100%] mt-4 rounded-[8px]"
          >
            <Link
              onClick={() => setSubMenuVisible(false)}
              href={"/creator/events"}
              className="flex flex-row py-[12px] px-[16px] gap-2 border-b-[1px] border-solid border-[#4B4A58]"
            >
              <Image
                alt={"My events icon"}
                src={"/myEventsMenuIcon.png"}
                width={24}
                height={24}
              />
              <div className="text-bondscape-text_neutral_900 hover:text-bondscape-text_neutral_700 transition ease-in-out text-[16px] font-normal leading-normal">
                My Events
              </div>
            </Link>
            <button
              className="flex flex-row py-[12px] px-[16px] gap-2"
              onClick={() => logoutFromWeb3Auth()}
            >
              <Image
                alt={"My events icon"}
                src={"/logoutMenuIcon.png"}
                width={24}
                height={24}
              />
              <div className="text-bondscape-text_neutral_900 hover:text-bondscape-text_neutral_700 transition ease-in-out text-[16px] font-normal leading-normal">
                Logout
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
