import React, { useState } from 'react';
import Image, {ImageProps} from 'next/image';
import { set } from 'zod';

type Props = ImageProps & {
    fallbackSrc: string
}
const ImageWithFallback = (props: Props) => {
    const { src, fallbackSrc, alt, style, className, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);
    const [failed, setIsFailed] = useState(false) // Can't tell the same about me tho
    return (
        <>
        <style>{`
            .imgfailed {
                background-color: rgb(30,42,51) !important;
            }
        `}</style>
        <Image
            alt=""
            className={`${className}${failed ? 'imgfailed' : ''}`}
            style={style}
            {...rest}
            src={imgSrc}
            objectFit='contain'
            onError={() => {
                setIsFailed(true)
                setImgSrc(fallbackSrc);
            }}
        />
        </>
    );
};

export default ImageWithFallback;