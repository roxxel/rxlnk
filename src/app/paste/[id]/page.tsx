import MDRenderer from "@/components/mdrenderer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { rxdb } from "@/lib/mongo";
import { ObjectId } from "bson";
import hljs from "highlight.js";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { FC } from "react";
import removeMarkdown from "markdown-to-text";

interface IProps {
  params: { id: string };
  searchParams?: { raw: string | undefined };
}
export async function generateMetadata(
  { params }: IProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const db = await rxdb();
  const pastes = await db.collection("pastes");
  const paste = await pastes.findOne({ _id: new ObjectId(params.id) });
  if (paste) {
    const cleaned = removeMarkdown((paste.paste as string))
    return {
      title: 'Reactive Link Paste',
      description: (cleaned.startsWith("CODE") ? cleaned.split("\n").slice(1).join('\n') : cleaned).substring(0, 150) + '...'
    }
  }
  return {
    title: 'Reactive Link',
    description: 'Paste not found'
  }
}

const PastePage: FC<IProps> = async ({ params: { id }, searchParams }) => {
  const db = await rxdb();
  const pastes = await db.collection("pastes");
  const paste = await pastes.findOne({ _id: new ObjectId(id) });
  if (!paste) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[#f7f7f7] bg-black">
        <div className="p-4 md:p-0 flex flex-col md:items-center md:justify-center">
          <h1 className="text-[32px] font-bold">
            We could not find the paste you was looking for 😔
          </h1>
          <Link href="/">
            <Button className="mt-4">Back to home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#f7f7f7] bg-black">
      <Navbar />
          <MDRenderer displayScreenshotButton={true} className="px-8 py-8 min-h-screen md:px-32 lg:px-80" markdown={paste.paste}></MDRenderer>
    </div>
  );
};

export default PastePage;
