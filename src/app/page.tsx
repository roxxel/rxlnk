"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortLink, setShortLink] = useState("");
  const handleSubmit = async () => {
    if (!link || link === "") {
      return;
    }
    setLink("");
    setIsLoading(true);
    try {
      const resp = await fetch(`api/shorten?link=${link}`)
      const json = await resp.json()
      setShortLink(`rxlnk.me/s/${json.id}`)
    } catch {

    } finally {
      setIsLoading(false)
    }
  };
  return (
    <section className="bg-[#161618] flex justify-center min-h-screen">
      <div className="min-w-full max-h-[250px]">
        <div className="p-12 py-24 flex justify-center h-full w-full bg-purple-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30">
          <h1 className="bg-gradient-to-r text-center from-[#ff930f] to-[#fff95b] bg-clip-text w-fit text-transparent text-[48px] font-semibold">
            Reactive Link 🚀
          </h1>
        </div>
        <div className="flex  justify-center mt-12">
          <div className="max-w-[500px]  w-full">
            {shortLink.length > 0 && (
              <p className="text-white text-center mb-4">
                Here is your short link:<br></br>
                <Link href={`https://${shortLink}`}>
                  <Button variant={"link"}>{shortLink}</Button>
                </Link>
                <br></br>
                Enjoy! 😊
              </p>
            )}

            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter your long link here..."
              className="bg-white rounded-full min-h-[64px] "
            ></Input>
            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              className="mt-8 w-full min-h-[48px] rounded-3xl"
            >
              {!isLoading ? (
                "Shorten ✨"
              ) : (
                <>
                  <Loading className="w-[24px] h-[24px]" />
                  <p className="ml-2">Creating your short link</p>
                </>
              )}
            </Button>
            <h1 className="text-white font-bold my-6 text-center text-[32px]">OR</h1>
            <Link href='/paste' className="min-w-full">
              <Button variant='secondary' className="min-w-full">Create new paste</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
