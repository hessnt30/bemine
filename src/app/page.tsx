"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import image from "../../public/heart-image.png";
import { ImagePlus, MessageCircleHeart, Share } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleCreateClick = () => {
    router.push("/create"); // Redirect to the create page
  };

  return (
    <div className="bg-gradient-to-r p-6 from-pink-500 via-red-500 to-purple-600 flex flex-col justify-center items-center text-white font-sans">
      {/* Header Section */}
      <header className="text-center py-8 sm:py-12 px-6 md:px-12 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-shadow">
          Create Unforgettable Valentine's Grams
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 text-opacity-90">
          Surprise your loved ones with personalized Valentine’s Day grams.
          Simple, fun, and meaningful.
        </p>

        {/* Image */}
        <div className="mb-6 sm:mb-10">
          <Image
            src={image} // Replace with your image or a high-quality one
            alt="Valentine's Day Heart"
            width={320}
            height={320}
            className="rounded-full shadow-xl transition-all duration-300 hover:scale-105 mx-auto"
          />
        </div>

        {/* CTA Button */}
        <Button
          size={"lg"}
          className="bg-gradient-to-r from-pink-600 via-red-600 to-purple-700 text-white px-10 py-4 text-xl transition-all duration-300 hover:scale-105 focus:outline-none "
          onClick={handleCreateClick}
        >
          Create Your Gram
        </Button>
      </header>

      {/* Features Section */}
      <section className="text-center py-12 px-6 md:px-12 bg-white text-black w-full">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Why BeMine?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <div className="flex flex-col items-center max-w-xs">
            <div className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 p-4 rounded-full mb-4 shadow-xl text-white">
              <MessageCircleHeart size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Personalized Messages
            </h3>
            <p className="text-lg text-opacity-80">
              Choose a special message or create your own to make it even more
              personal.
            </p>
          </div>

          <div className="flex flex-col items-center max-w-xs">
            <div className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 p-4 rounded-full mb-4 shadow-xl text-white">
              <Share size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
            <p className="text-lg text-opacity-80">
              Share your gram with a simple link. It's quick and easy for anyone
              to enjoy.
            </p>
          </div>

          <div className="flex flex-col items-center max-w-xs">
            <div className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 p-4 rounded-full mb-4 shadow-xl text-white">
              <ImagePlus size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customizable Images</h3>
            <p className="text-lg text-opacity-80">
              Choose from our gallery or upload your own image for the perfect
              gram.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-6 text-center w-full">
        <p className="text-sm">
          &copy; 2025 Nicholas Hess. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
