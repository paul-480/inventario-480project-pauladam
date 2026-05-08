import { assets } from "@/assets/";
import { useEffect, useState } from "react";

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}
const { logo,  fullLogo, /*logoDark, fullLogoDark*/ } = assets

//const matches = window.matchMedia('(prefers-color-scheme: dark)').matches;
const Logo = ({ className, size = 'md' }: LogoProps) => {

    const [selectedLogo, setSelectedLogo] = useState(size === 'sm' ? logo : fullLogo)

    useEffect(() => {
        setSelectedLogo(size === 'sm' ? logo : fullLogo)
    }, [size, className]);


    const sizeClasses = {
        sm: 'h-6',
        md: 'h-8',
        lg: 'h-10',
        xl: 'h-16',
    };


    return (
        <img
            src={selectedLogo}
            alt="480:DEV"
            className={sizeClasses[size] + ` w-auto ${className}`}
        />
    )
}

export default Logo
