"use client";

import PreviewGram from "@/components/preview-gram";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploadResource, NewGram } from "@/types";
import { Copy, Dice1, Dices, PlusCircle } from "lucide-react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { addGram } from "../api/firebase/db";
import { toast } from "sonner";

const resources = [
  {
    secure_url:
      "https://res.cloudinary.com/dqq1jlbwk/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1738773657/samples/balloons.jpg",
  },
  {
    secure_url:
      "https://res.cloudinary.com/dqq1jlbwk/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1738773651/samples/animals/kitten-playing.gif",
  },
  {
    secure_url:
      "https://res.cloudinary.com/dqq1jlbwk/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1738773650/samples/landscapes/nature-mountains.jpg",
  },
  {
    secure_url:
      "https://res.cloudinary.com/dqq1jlbwk/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1738773650/samples/ecommerce/accessories-bag.jpg",
  },
];

const messages = [
  "Be mine forever",
  "You’re the apple of my eye",
  "Will you be my Valentine?",
  "Love you to the moon and back",
  "You're the peanut butter to my jelly",
  "I’m totally smitten by you",
  "You make my heart skip a beat",
  "Every day with you is Valentine’s Day",
  "You light up my life like nobody else",
  "I'm stuck on you like glue",
  "You had me at hello",
  "Forever and always",
  "My heart beats for you",
  "You’re the reason I smile every day",
  "You’re my favorite everything",
  "I love you more than pizza",
  "You make life sweeter every day",
  "You complete me",
  "I’m lucky to have you",
  "Let’s make today unforgettable",
  "You + Me = Love",
  "You’re my heart’s desire",
  "Together forever and always",
  "You make my world brighter",
  "You’re the love of my life",
  "To the one who holds my heart",
  "You are my sunshine",
  "You’re my happily ever after",
  "I can’t imagine life without you",
  "Every moment with you is a treasure",
];

export default function CreatePage() {
  const [resource, setResource] = useState<ImageUploadResource | undefined>(
    resources[0]
  );
  const [message, setMessage] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [sender, setSender] = useState<string>("");

  const [gramId, setGramId] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateClicked = async () => {
    setIsLoading(true);
    const newGram = {
      imageUrl: resource?.secure_url,
      message,
      recipient,
      sender,
    } as NewGram;

    const newGramId = await addGram(newGram);
    setGramId(newGramId);
  };

  const randomMessage = () => {
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  const copyToClipboard = async () => {
    try {
      const inputText = `localhost:3000/${gramId}`;
      await navigator.clipboard.writeText(inputText);
      toast("Link Copied", {
        description: "Send the link to your recipient!",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Failed to copy to clipboard.");
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [gramId]);

  return (
    <div>
      <p className="text-3xl font-semibold mb-4">Create a Valentine's Gram!</p>

      <Label>Preview</Label>
      {resource?.secure_url && (
        <PreviewGram
          imageURL={resource.secure_url}
          width={600}
          height={600}
          message={message}
        />
      )}

      {/* Image Selector */}
      <div className="flex flex-1 gap-2 p-2 justify-center bg-gradient-to-r from-pink-300 via-red-300 to-purple-400 my-2 rounded-lg">
        {resources.map((pic, index) => (
          <div
            key={index}
            className={`flex hover:cursor-pointer border-2 rounded p-1 transition-all duration-200 ease-in-out ${
              resource?.secure_url === pic.secure_url
                ? "border-white"
                : "border-transparent"
            }`}
            onClick={() => setResource(resources[index])} // Set selected image
          >
            <CldImage
              src={pic.secure_url}
              alt="Preview"
              width={100}
              height={100}
            />
          </div>
        ))}
        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary-params"
          onSuccess={(result, { widget }) => {
            console.log(result?.info);
            setResource(result?.info as unknown as ImageUploadResource); // { public_id, secure_url, etc }
          }}
          onQueuesEnd={(result, { widget }) => {
            widget.close();
          }}
        >
          {({ open }) => {
            function handleOnClick() {
              console.log(resource);
              // setResource(undefined);
              open();
            }
            return (
              <div
                className="flex w-[100px] rounded border-2 border-white hover:cursor-pointer justify-center items-center py-4"
                onClick={handleOnClick}
                title="Upload Image"
              >
                <PlusCircle color="white" />
              </div>
            );
          }}
        </CldUploadWidget>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-t-foreground rounded-full animate-spin"></div>
        </div>
      )}

      {!gramId && !isLoading && (
        <>
          <div className="flex flex-col gap-4 py-4">
            <div>
              <Label>Who is this to?</Label>
              <Input
                type="text"
                placeholder="Cupid"
                onChange={(e) => {
                  setRecipient(e.target.value);
                }}
              ></Input>
            </div>

            <div>
              <Label>Who is this from?</Label>
              <Input
                type="text"
                placeholder="Cupid's Arrow"
                onChange={(e) => {
                  setSender(e.target.value);
                }}
              ></Input>
            </div>

            <div>
              <Label>Add a message</Label>

              <div className="flex gap-2">
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  placeholder="Will you be my Valentine?"
                />
                <Button title="Choose a random message" onClick={randomMessage}>
                  <Dices />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-1 justify-end py-4">
            <Button
              disabled={!message || !recipient || !sender}
              onClick={handleCreateClicked}
              className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-600"
            >
              Create
            </Button>
          </div>
        </>
      )}

      {gramId && (
        <div className="py-4">
          <Label>Share your gram!</Label>

          <div className="flex gap-2">
            <Input type="text" value={`localhost:3000/${gramId}`} readOnly />
            <Button onClick={copyToClipboard}>
              <Copy />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
