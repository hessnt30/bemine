"use client";

import { getGram } from "@/app/api/firebase/db";
import PreviewGram from "@/components/preview-gram";
import { GramResponse } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Mail } from "lucide-react";

export default function GramPage() {
  const { gramId } = useParams();
  const [gram, setGram] = useState<GramResponse | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    if (!gramId || Array.isArray(gramId)) return;
    setIsLoading(true);

    const fetchGram = async () => {
      const gramResult = await getGram(gramId);
      if (gramResult) {
        setGram(gramResult);
      }
    };

    fetchGram();
  }, [gramId]);

  useEffect(() => {
    if (gram) setIsLoading(false);
  }, [gram]);

  return (
    <div className="flex flex-col items-center">
      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-t-foreground rounded-full animate-spin"></div>
        </div>
      )}
      {gram && (
        <div className="flex flex-col gap-2 items-center text-center">
          <p className="text-3xl font-semibold leading-none">
            Hey, {gram.recipient}!
          </p>
          <p className="text-xl leading-none pb-4">
            You have a special Valentine&apos;s Gram from {gram.sender}!
          </p>

          {/* Animated Gram Container */}
          <div className="relative w-[300px] h-[400px] flex justify-center items-center mt-4">
            {/* Envelope Cover */}
            {!isOpened && (
              <motion.div
                className="absolute w-full h-full bg-secondary flex flex-col items-center justify-center text-xl font-semibold text-foreground rounded-lg shadow-lg cursor-pointer select-none"
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                whileHover={{ scale: 1.15 }}
                onClick={() => setIsOpened(true)}
              >
                <Mail size={50} />
                <p className="text-foreground">Tap to Open</p>
              </motion.div>
            )}

            {/* Gram Reveal Animation */}
            <motion.div
              className={`absolute w-full h-full ${
                isOpened ? "block" : "hidden"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isOpened ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              <PreviewGram
                imageURL={gram?.imageUrl}
                width={600}
                height={600}
                message={gram.message}
              />
            </motion.div>

            {/* Heart Confetti Animation */}
            <AnimatePresence>
              {isOpened &&
                Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                      x: 0,
                      y: 0,
                      rotate: Math.random() * 360,
                    }}
                    animate={{
                      opacity: 1,
                      x: (Math.random() - 0.5) * 250,
                      y: (Math.random() - 0.5) * 250,
                      scale: 1,
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    <Heart size={24} className="text-red-500" />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {/* Close Button */}
          {isOpened && (
            <Button
              variant="outline"
              onClick={() => setIsOpened(false)}
              className="mt-2"
            >
              Close
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
