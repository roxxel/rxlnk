'use client'
import React, { FC, useState } from "react";
import { Button } from "./ui/button";
import Loading from "./ui/loading";
import { downloadBlob } from "@/lib/utils";

interface IProps {
    paste: string
};

const DownloadPasteButton:FC<IProps> = ({paste}) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleDownload = () => {
        setIsLoading(true)
        try {
            const blob = new Blob([paste])
            downloadBlob(blob, "paste.md")
        } catch {

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Button variant='link' disabled={isLoading} onClick={handleDownload}>{isLoading && <Loading className="h-[16px] mr-2 stroke-primary w-[16px]" />}<span className="mx-1">Download paste</span></Button>
    )
};

export default DownloadPasteButton;