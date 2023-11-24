"use client";
import MDRenderer from "@/components/mdrenderer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

interface IProps {}

const NewPaste: FC<IProps> = (props) => {
  const [paste, setPaste] = useState("");
  const [preview, setPreview] = useState(false);
  const [isPasting, setIsPasting] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const router = useRouter()
  const togglePreviewMode = () => setPreview((prev) => !prev);
  const publish = async () => {
    setIsPasting(true)
    const resp = await fetch('/api/paste', {
        method: 'POST', 
        body: JSON.stringify({
            paste: paste,
            isPrivate: !isPublic
        })
    })
    const json = await resp.json()
    router.push(`/paste/${json.id}`)
  }
  return (
    <div className="bg-black overflow-hidden max-h-screen">
      <Navbar />
      <div className="fixed right-4 z-[100] bottom-4 flex">
        <Button onClick={togglePreviewMode} variant={"secondary"} className="">
          {!preview ? "Preview" : "Continue editing"}
        </Button>
        <div className="mx-2 w-[22px] text-white text-bottom mt-1 font-bold ">
          {preview ? "OR" : "  "}
        </div>
        <Popover open={isPasting ? true : undefined}>
          <PopoverTrigger asChild>
            <Button variant="default">Paste!</Button>
          </PopoverTrigger>
          <PopoverContent className="w-60">
            <div>
                <div className="flex justify-between">
                    <p>Public paste?</p>
                    <Switch disabled={isPasting} checked={isPublic} onCheckedChange={(e) => setIsPublic(e)} />
                </div>

                <Button onClick={publish} className="mt-4 min-w-full" disabled={isPasting} variant={'outline'}>
                    {isPasting ? <Loading className="w-[24px] h-[24px]" /> :
                    'Publish'}
                </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex overflow-hidden bg-black">
        <div
          className={`${
            preview ? "w-0" : "w-full"
          } bg-black transition-all overflow-auto pb-8 max-h-screen`}
        >
          <Textarea
            value={preview ? "" : paste}
            onChange={(e) => setPaste(e.target.value)}
            placeholder="Type your paste here (Markdown supported)"
            className="dark bg-black border-none  text-white resize-none rounded-none shadow-none pb-16 h-screen"
            id="message"
          />
        </div>
        <div className="w-full">
          <MDRenderer
            key={1}
            markdown={paste}
            className="px-4 overflow-auto pb-20 h-screen pt-8"
          />
        </div>
      </div>
    </div>
  );
};

export default NewPaste;
