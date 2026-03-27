import Link from 'next/link';
import { FC } from 'react';

interface BrandLogoProps {
    href?: string;
    compact?: boolean;
    subtitle?: string;
    className?: string;
    variant?: 'dark' | 'light';
}

const BrandLogo: FC<BrandLogoProps> = ({
    href = '/dashboard',
    compact = false,
    subtitle,
    className = '',
    variant = 'dark',
}) => {
    const titleClass =
        variant === 'light'
            ? 'bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-slate-900 via-indigo-700 to-violet-600 bg-clip-text text-transparent';
    const subtitleClass = variant === 'light' ? 'text-slate-300' : 'text-slate-500';

    return (
        <Link href={href} className={`inline-flex items-center ${compact ? 'gap-2' : 'gap-3'} ${className}`}>
            <div
                className={`rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md flex items-center justify-center ${
                    compact ? 'h-9 w-9' : 'h-10 w-10'
                }`}>
                <span className={`font-extrabold tracking-tight ${compact ? 'text-xs' : 'text-sm'}`}>ZL</span>
            </div>
            {!compact && (
                <div className="leading-tight">
                    <span className={`block text-lg font-extrabold tracking-tight ${titleClass}`}>
                        ZysLet
                    </span>
                    {subtitle && <span className={`block text-[10px] uppercase tracking-[0.2em] ${subtitleClass}`}>{subtitle}</span>}
                </div>
            )}
        </Link>
    );
};

export default BrandLogo;
