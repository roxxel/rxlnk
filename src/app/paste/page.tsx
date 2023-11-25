"use client";
import MDRenderer from "@/components/mdrenderer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import hljs from "highlight.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import Link from "next/link";

interface IProps {}
interface PastingResult {
  success: boolean;
  shortLink?: string;
  error?: string;
}

const NewPaste: FC<IProps> = (props) => {
  const [paste, setPaste] = useState("");
  const [preview, setPreview] = useState(false);
  const [isPasting, setIsPasting] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [pastingResult, setPastingResult] = useState<PastingResult | undefined>(
    undefined
  );
  const router = useRouter();
  const togglePreviewMode = () => setPreview((prev) => !prev);
  const publish = async () => {
    setPastingResult(undefined)
    try {
      setIsPasting(true);
      let resp = await fetch("/api/paste", {
        method: "POST",
        body: JSON.stringify({
          paste: paste,
          isPrivate: !isPublic,
        }),
      });
      if (resp.status !== 200) {
        throw new Error();
      }
      let json = await resp.json();
      const link = `https://rxlnk.me/paste/${json.id}`;
      resp = await fetch(`api/shorten?link=${link}`);
      if (resp.status !== 200) {
        throw new Error();
      }
      json = await resp.json();
      setPastingResult({
        success: true,
        shortLink: `https://rxlnk.me/s/${json.id}`,
      });
    } catch {
      setPastingResult({
        success: false,
        error: "Something went incredibly wrong. Try again...",
      });
    } finally {
      setIsPasting(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
        e.preventDefault()
        const area = e.target as HTMLTextAreaElement
        var s = area.selectionStart;
        if (e.getModifierState("Shift")) {
            area.selectionEnd = s - 4
        } else {
            
            setPaste(paste.substring(0,s) + "    " + paste.substring(area.selectionEnd));
            area.value = paste.substring(0,s) + "    " + paste.substring(area.selectionEnd)
            area.selectionEnd = s + 4
        }
        
    }
  }

  return (
    <div className="bg-black overflow-hidden max-h-screen">
      <Navbar />
      <div className="fixed right-4  z-[100] bottom-4 flex">
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
          <PopoverContent className="w-80 mr-8">
            <div>
              <div className="flex justify-between">
                <p>Public paste?</p>
                <Switch
                  disabled={isPasting}
                  checked={isPublic}
                  onCheckedChange={(e) => setIsPublic(e)}
                />
              </div>
              {pastingResult && (
                <div>
                  {pastingResult.shortLink && (
                    <div>
                      Here is your link:{" "}
                      <Link target="_blank" href={pastingResult.shortLink}>
                        <Button variant={"link"}>
                          {pastingResult.shortLink.replaceAll("https://", "")}
                        </Button>
                      </Link>
                    </div>
                  )}
                  {pastingResult.error && (
                    <div className="text-destructive">
                      {pastingResult.error}
                    </div>
                  )}
                </div>
              )}

              <Button
                onClick={publish}
                className="mt-4 min-w-full"
                disabled={isPasting}
                variant={"outline"}
              >
                {isPasting ? (
                  <Loading className="w-[24px] h-[24px]" />
                ) : (
                  "Publish"
                )}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex max-h-[90vh] overflow-hidden bg-black">
        <div
          className={`${
            preview ? "w-0" : "w-1/2"
          } bg-black transition-all overflow-hidden pb-8 max-h-screen`}
        >
          <Textarea
            onKeyDown={onKeyDown}
            value={preview ? "" : paste}
            onChange={(e) => setPaste(e.target.value)}
            placeholder={`Type your paste here (Markdown supported)
Before you type:
If you just want to share code snippet you can do it this way
CODE: <language_here_OR_NOTHING>
Code

E.g
CODE:tsx
export default async function Home() {
    return (
        <h1>Hello, world!</h1>
    )
}`}
            className="dark bg-black border-none  text-white resize-none rounded-none shadow-none pb-16 h-screen"
            id="message"
          />
        </div>
        <div className="w-[1px] min-h-screen overflow-hidden bg-white"></div>
        <div className={(preview ? 'w-full px-8 md:px-32 lg:px-80' : 'w-1/2') + ' overflow-hidden pb-16'}>
          <MDRenderer
            key={1}
            markdown={paste}
            className="px-4 overflow-auto max-h-[80vh] pb-12 pt-8"
          />
        </div>
      </div>
    </div>
  );
};

export default NewPaste;
