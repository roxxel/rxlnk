import { Button } from "@/components/ui/button";
import { rxdb } from "@/lib/mongo";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";

export default async function ShortLink({
  params: { id },
}: {
  params: { id: string };
}) {
  const db = await rxdb();
  const links = await db.collection("links");
  const link = await links.findOne({ short: id });
  if (!link) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[#f7f7f7] bg-black">
        <div className="p-4 md:p-0 flex flex-col md:items-center md:justify-center">
          <h1 className="text-[32px] font-bold">
            We could not find the link you was looking for 😔
          </h1>
          <Link href="/">
            <Button className="mt-4">Back to home</Button>
          </Link>
        </div>
      </div>
    );
  }
  redirect(link.link, RedirectType.push)
  return <></>
}
