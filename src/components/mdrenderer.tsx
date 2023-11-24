'use client'
import remarkGfm from "remark-gfm";
import rehypeCodeTitles from "rehype-code-titles";
//@ts-ignore
import rehypeFigure from "rehype-figure";
import rehypePrismAll from "rehype-prism-plus";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Head from "next/head";
import hljs from "highlight.js";
export default function MDRenderer({
  markdown,
  className,
}: {
  markdown: string;
  className: string;
}) {
  if (markdown.startsWith("CODE")) {
    const lang = markdown.split("\n")[0].replaceAll("CODE:", "").trim()
    markdown = '```' + lang + '\n' + markdown.split("\n").slice(1).join('\n') + "\n```"
  }
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
          <Markdown rehypePlugins={[rehypeHighlight, remarkGfm]}>{markdown}</Markdown>
        </div>
      </>
    );
  } catch {
    return <div>Invalid input</div>;
  }
}
