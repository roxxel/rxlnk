import Link from "next/link";
import React, { FC } from "react";

interface IProps {};

const Navbar:FC<IProps> = (props) => {
    return (
        <div className="flex bg-black border-b px-8 md:px-16 lg:px-32 min-h-[64px] items-center">
            <div className="flex flex-col">
                <Link href="/">
                    <h1 className="text-[24px] text-white hover:text-primary transition-all font-bold">RXLNK</h1>
                </Link>
                <sub className="text-[10px]">by <Link href="https://roxxel.me"><span className="text-blue-500 hover:text-blue-600">Roxxel</span></Link></sub>
            </div>
        </div>
    )
};

export default Navbar;