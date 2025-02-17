import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return { userId };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileCount: 1, maxFileSize: "4MB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(async (file) => {}),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(async (file) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
