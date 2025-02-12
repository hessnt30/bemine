"use server";

import { db } from "@/app/api/firebase/admin";
import { GramResponse, NewGram } from "@/types";
import axios from "axios";
import crypto from "crypto";

/**
 * Get a gram by gramId
 * @param gramId UID of the desired gram
 * @returns a single GramResponse or undefined
 */
export const getGram = async (
  gramId: string
): Promise<GramResponse | undefined> => {
  try {
    const docRef = db.collection("grams").doc(gramId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return undefined; // No gram found
    }

    const data = doc.data();

    return {
      postId: doc.id,
      ...data,
    } as GramResponse;
  } catch (error) {
    console.error("Error fetching gram:", error);
    return undefined;
  }
};

/**
 * Add a new gram
 * @param gram the new gram data to store
 */
export const addGram = async (gram: NewGram): Promise<string> => {
  try {
    const newDocRef = await db.collection("grams").add({
      ...gram,
    });

    return newDocRef.id; // return the id of the newly created document
  } catch (error) {
    console.error("Error adding gram:", error);
    throw new Error("Error adding gram");
  }
};

/**
 * Update a gram's data
 * @param gramId the ID of the gram to update
 * @param updates the fields to update
 */
export const updateGram = async (
  gramId: string,
  updates: Partial<GramResponse>
) => {
  try {
    const gramRef = db.collection("grams").doc(gramId);

    await gramRef.update(updates);
  } catch (error) {
    console.error("Error updating gram:", error);
    throw new Error("Error updating gram");
  }
};

/**
 * Delete a gram
 * @param gramId the ID of the gram to delete
 */
export const deleteGram = async (gramId: string) => {
  try {
    await db.collection("grams").doc(gramId).delete();
  } catch (error) {
    console.error("Error deleting gram:", error);
    throw new Error("Error deleting gram");
  }
};

// helper for handleDeleteImage
const generateSHA1 = (data: string) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

// helper for handleDeleteImage
const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

/**
 * Delete from cloudinary the image specified by url
 *
 * @param secure_url the url of the image to be deleted
 * @returns void
 */
export const handleDeleteImage = async (secure_url: string) => {
  const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
  const getPublicIdFromUrl = (url: string) => {
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const publicId = getPublicIdFromUrl(secure_url);

  if (!publicId) return;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const timestamp = new Date().getTime();
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET || "";
  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  try {
    console.log("deleting image", publicId);
    const response = await axios.post(url, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    });

    console.log(response);

    // console.error(response);
  } catch (error) {
    console.error(error);
  }
};
