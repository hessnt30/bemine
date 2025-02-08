"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ThemeSwitcher } from "./ui/theme-switcher";

export default function Header() {
  return (
    <div className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 pt-6 pb-4 px-4 flex justify-between items-center shadow-lg ">
      {/* Title and Heart Icon */}
      <Link href={"/"}>
        <div className="flex items-center space-x-1">
          <Heart size={36} className="text-white" />
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-white">BeMine</h1>
            <p className="text-white text-sm leading-none">
              Create a Valentine's Gram!
            </p>
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <Link href={"/create"}>
          <Button
            color="white"
            className="bg-transparent border border-white text-white"
          >
            Create a Gram
          </Button>
        </Link>
      </div>
    </div>
  );
}
