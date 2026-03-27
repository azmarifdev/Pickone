import Link from 'next/link';
import { FC } from 'react';

interface BrandLogoProps {
    href?: string;
    compact?: boolean;
    onClick?: () => void;
    className?: string;
}

const BrandLogo: FC<BrandLogoProps> = ({ href = '/', compact = false, onClick, className = '' }) => {
    const content = (
        <div className={`flex items-center ${compact ? 'gap-2' : 'gap-3'} ${className}`}>
            <div
                className={`rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200/70 flex items-center justify-center ${
                    compact ? 'h-8 w-8' : 'h-10 w-10'
                }`}>
                <span className={`font-extrabold tracking-tight ${compact ? 'text-xs' : 'text-sm'}`}>ZL</span>
            </div>
            {!compact && (
                <div className="leading-tight">
                    <span className="block text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-700 to-violet-600 bg-clip-text text-transparent">
                        ZysLet
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-500">Smart Shopping</span>
                </div>
            )}
        </div>
    );

    return (
        <Link href={href} onClick={onClick} className="inline-flex items-center" aria-label="ZysLet home">
            {content}
        </Link>
    );
};

export default BrandLogo;
