import { assets } from "@/assets/";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}
const { logo,  fullLogo, logoDark, fullLogoDark } = assets

//const matches = window.matchMedia('(prefers-color-scheme: dark)').matches;
const Logo = ({ className, size = 'md' }: LogoProps) => {

    const [selectedLogo, setSelectedLogo] = useState(size === 'sm' ? logo : fullLogo)
    const {theme} = useTheme()
    useEffect(() => {
        if (theme === 'dark') {
            setSelectedLogo(size === 'sm' ? logoDark : fullLogoDark)
        } else {
        setSelectedLogo(size === 'sm' ? logo : fullLogo)}
    }, [size, className, theme]);


    const sizeClasses = {
        sm: 'h-4',
        md: 'h-8',
        lg: 'h-10',
        xl: 'h-16',
    };


    return (
        <img
            src={selectedLogo}
            alt="480:DEV"
            className={sizeClasses[size] + ` transition-all duration-300 w-auto ${className}`}
        />
    )
}

export default Logo
