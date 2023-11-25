"use client";
import Navbar from "@/components/navbar";
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
        <Navbar />  
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
              className="bg-black min-h-[64px] "
            ></Input>
            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              className="mt-8 w-full min-h-[48px]"
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
