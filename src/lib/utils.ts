import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import html2canvas from "html2canvas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const exportAsImage = async (el: HTMLElement) => {
  const canvas = await html2canvas(el);
  const image = canvas.toDataURL("image/png", 1.0);
  downloadImage(image);
};
const downloadImage = (blob: string) => {
  const fakeLink = window.document.createElement("a");
  //@ts-ignore
  fakeLink.style = "display:none;";
  fakeLink.download = "image.jpg";

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

export default exportAsImage;
