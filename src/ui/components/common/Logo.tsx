import { assets } from "@/assets/";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    align?: 'left' | 'center' | 'right';
}
const { logo,  fullLogo, logoDark, fullLogoDark } = assets

const Logo = ({ className, size = 'md', align = 'center' }: LogoProps) => {
    const { theme } = useTheme()
    const [selectedLogo, setSelectedLogo] = useState(logo)

    useEffect(() => {
        const isSm = size === 'sm';
        if (theme === 'dark') {
            setSelectedLogo(isSm ? logoDark : fullLogoDark)
        } else {
            setSelectedLogo(isSm ? logo : fullLogo)
        }
    }, [size, theme]);

    const sizeClasses = {
        sm: 'h-8',
        md: 'h-8',
        lg: 'h-10',
        xl: 'h-16',
    };

    const originClass = align === 'left' ? 'origin-left' : align === 'right' ? 'origin-right' : 'origin-center';

    return (
        <img
            src={selectedLogo}
            alt="480:DEV"
            className={`${sizeClasses[size]} w-auto max-w-full object-contain object-left transition-all duration-300 
                ${theme === 'dark' ? (size === 'sm' ? 'scale-[1.3]' : 'scale-[2]') : ''} 
                ${theme === 'dark' ? originClass : ''} ${className}`}
        />
    )
}

export default Logo;
