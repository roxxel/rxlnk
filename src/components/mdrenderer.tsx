"use client";
import remarkGfm from "remark-gfm";
import rehypeCodeTitles from "rehype-code-titles";
//@ts-ignore
import rehypeFigure from "rehype-figure";
import rehypePrismAll from "rehype-prism-plus";
import rehypeVideo from "rehype-video";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Head from "next/head";
import Image from "next/image";
import hljs from "highlight.js";
import { useLayoutEffect } from "react";
import exportAsImage from "@/lib/utils";
import ImageWithFallback from "./ui/imagewithfallback";
import Link from "next/link";
import { Button } from "./ui/button";
export default function MDRenderer({
  markdown,
  className,
  displayScreenshotButton,
}: {
  markdown: string;
  className: string;
  displayScreenshotButton?: boolean;
}) {
  if (markdown.startsWith("CODE")) {
    const lang = markdown.split("\n")[0].replaceAll("CODE:", "").trim();
    markdown =
      "```" + lang + "\n" + markdown.split("\n").slice(1).join("\n") + "\n```";
  }

  useLayoutEffect(() => {
    // If render happened on server - do nothing return
    if (typeof window === "undefined") return;
    let btns: HTMLButtonElement[] = [];
    const screenshot = async (e: MouseEvent) => {
      await exportAsImage(
        document.querySelector(
          `pre[data-id='${(e.target as HTMLElement).dataset["preid"]}']`
        )!
      );
    };
    if (displayScreenshotButton) {
      const pres = [...Array.from(document.querySelectorAll("pre"))];
      pres.forEach((x, i) => {
        //@ts-ignore
        x.style = "position: relative";
        x.dataset["id"] = i.toString();
        x.classList.add("pre-custom");
        const button = document.createElement("button");
        button.innerText = "Save as image";
        button.classList.add("pre-btn");
        button.dataset["preid"] = i.toString();
        //@ts-ignore
        button.style = "position:absolute; top: 12px; right: 12px;";
        x.appendChild(button);
        btns.push(button);
        button.addEventListener("click", screenshot);
      });
    }
    return () => {
      btns.forEach((x) => {
        x.removeEventListener("click", screenshot);
        x.parentNode!.removeChild(x);
      });
    };
  }, [markdown]);
  try {
    return (
      <>
        <style>
          {`
                @media screen and (max-width: 768px) {

                    pre {
                        min-width: 100vw;
                        margin-left: -2rem;
                        border-radius: 0px !important;
                    }
                }
            `}
        </style>
        <div className={`markdown-body ${className}`}>
          <Markdown
            components={{
              p(props) {
                const { node, ...rest } = props;
                return <p style={{ fontSize: "14px" }} {...rest} />;
              },
              a(props) {
                const { node, href, ref, children, className, ...rest } = props;
                return <Link className="" href={new URL(href!)} {...rest}>
                  <div className="text-primary inline-block hover:underline underline-offset-4 font-bold">
                    {children}
                  </div>
                </Link>
              },
              // img(props) {
              //   const { node, src, width, height, placeholder, ref, className, ...rest } =
              //     props;
              //   return (
              //     <div className="relative left-0 h-[300px] ">
              //       <ImageWithFallback
              //         fallbackSrc={"/noimage.svg"}
              //         fill={true}
              //         src={src || "/not-found"}
              //         alt=""
              //         style={{backgroundColor: 'rgb(30 41 59) !important'}}
              //         className={`${className || ''} min-w-screen`}
              //         {...rest}
              //       />
              //     </div>
              //   );
              // },
            }}
            rehypePlugins={[
              rehypeHighlight,
              remarkGfm,
              [rehypeVideo, { details: false }],
            ]}
          >
            {markdown}
          </Markdown>
        </div>
      </>
    );
  } catch {
    return <div>Invalid input</div>;
  }
}
