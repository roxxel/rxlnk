import Link from "next/link";
import React, { FC } from "react";

interface IProps {};

const Navbar:FC<IProps> = (props) => {
    return (
        <div className="flex border-b px-8 md:px-16 lg:px-32 min-h-[64px] items-center">
            <Link href="/">
                <h1 className="text-[24px] text-white hover:text-primary transition-all font-bold">RXLNK</h1>
            </Link>
        </div>
    )
};

export default Navbar;