'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, FC, ChangeEvent, useCallback, memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import BrandLogo from '../reusable/BrandLogo';
import { SideNav } from './SideNav';
import SideCart from './SideCart';
import { useCart } from '@/components/context/CartContext';
import useCategory from '@/hooks/useCategory';
import { calculatePrice } from '@/lib/calculatePrice';
import { config } from '@/config/env';
import { getImageUrl } from '@/lib/imageUtils';
import { useSiteSettings } from '@/hooks/useSiteSettings';
// Remove the direct import of useSearchParams

// Add interface for search results
interface SearchProduct {
    id: string | number;
    title: string;
    thumbnail: string;
    price: string | number;
    discount: number;
    slug: string; // Making slug required since we're using it for navigation
}

interface NavLink {
    name: string;
    href: string;
    icon?: string; // Optional SVG path for mobile icons
}

const Navbar: FC = () => {
    const { settings } = useSiteSettings();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [isMobile, setIsMobile] = useState<boolean>(false);
    // Add states for search functionality
    const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

    // Use category hook to fetch categories from API
    const { categories } = useCategory();

    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchResultsRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    // Remove the direct use of useSearchParams() hook here

    // Use global cart context
    const { cartItems, isCartOpen, setIsCartOpen } = useCart();

    // This was previously using useSearchParams directly, but now we'll receive the query from a child client component
    // useEffect(() => {
    //    const queryFromUrl = searchParams?.get("search") || "";
    //    setSearchQuery(queryFromUrl);
    // }, [searchParams, pathname]);

    // Detect mobile view on first render and when window resizes
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        // Initial check
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Check scroll position for adding shadow to navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchResultsRef.current &&
                !searchResultsRef.current.contains(event.target as Node) &&
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target as Node)
            ) {
                setShowSearchResults(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSearchChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const query = e.target.value;
            setSearchQuery(query);

            // Clear previous timeout to prevent multiple API calls
            if (searchTimeout) clearTimeout(searchTimeout);

            if (query.length >= 2) {
                setIsSearching(true);

                // Set a new timeout for debounced search
                const timeout = setTimeout(async () => {
                    try {
                        const params = new URLSearchParams();
                        params.append('search', query);

                        const response = await fetch(`${config.BASE_URL}/api/v1/product/list?${params.toString()}`);

                        if (!response.ok) {
                            throw new Error(`Error searching products: ${response.status}`);
                        }

                        const data = await response.json();
                        const products = data?.data || [];

                        // Filter results to only include products where title contains the search query
                        const filteredProducts = products.filter((product: any) =>
                            product.title?.toLowerCase().includes(query.toLowerCase()),
                        );

                        setSearchResults(filteredProducts);
                        setShowSearchResults(true);
                    } catch (error) {
                        console.error('Error during search:', error);
                        setSearchResults([]);
                    } finally {
                        setIsSearching(false);
                    }
                }, 300); // Debounce for 300ms

                setSearchTimeout(timeout);
            } else {
                setShowSearchResults(false);
                setSearchResults([]);
            }
        },
        [searchTimeout],
    );

    const handleSearchResultClick = useCallback(
        (productId: string | number, slug: string) => {
            setShowSearchResults(false);
            // Use slug instead of ID for navigation
            router.push(`/product/${slug}`);
        },
        [router],
    );

    const handleSearchSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            if (searchQuery.trim()) {
                // Navigate to product page with search query as filter
                router.push(`/productPage?search=${encodeURIComponent(searchQuery)}`);
                setShowSearchResults(false);
            }

            // Close mobile menu if open
            if (isMenuOpen) closeMenu();
        },
        [isMenuOpen, router, searchQuery],
    );

    const clearSearch = useCallback(() => {
        setSearchQuery('');
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    const closeMenu = useCallback(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            document.body.classList.remove('overflow-hidden');
        }
    }, [isMenuOpen]);
    const navLinks: NavLink[] = [
        {
            name: 'Home',
            href: '/',
            icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        },
        {
            name: 'Products',
            href: '/productPage',
            icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
        },
    ];

    // Ref for the category pills container
    const categoryPillsRef = useRef<HTMLDivElement>(null);

    // Function to scroll categories left
    const scrollCategoriesLeft = () => {
        if (categoryPillsRef.current) {
            // Calculate center position for smooth scrolling
            const containerWidth = categoryPillsRef.current.clientWidth;
            const scrollAmount = containerWidth * 0.75; // Scroll by 75% of container width
            categoryPillsRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Function to scroll categories right
    const scrollCategoriesRight = () => {
        if (categoryPillsRef.current) {
            // Calculate center position for smooth scrolling
            const containerWidth = categoryPillsRef.current.clientWidth;
            const scrollAmount = containerWidth * 0.75; // Scroll by 75% of container width
            categoryPillsRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Touch handling for swipe gestures
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Reduced minimum swipe distance threshold for higher sensitivity
    const minSwipeDistance = 30;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches?.[0]?.clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches?.[0]?.clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isSwipe = Math.abs(distance) > minSwipeDistance;

        if (isSwipe) {
            if (distance > 0) {
                // Swipe left to right - with increased distance
                scrollCategoriesRight();
                // For longer swipes, scroll twice
                if (Math.abs(distance) > 100) {
                    setTimeout(() => scrollCategoriesRight(), 100);
                }
            } else {
                // Swipe right to left - with increased distance
                scrollCategoriesLeft();
                // For longer swipes, scroll twice
                if (Math.abs(distance) > 100) {
                    setTimeout(() => scrollCategoriesLeft(), 100);
                }
            }
        }
    };

    // Mouse handling for desktop swipe gestures
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftPosition, setScrollLeftPosition] = useState(0);
    const [dragVelocity, setDragVelocity] = useState(0);
    const [lastDragTime, setLastDragTime] = useState(0);
    const [lastDragX, setLastDragX] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (categoryPillsRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - categoryPillsRef.current.offsetLeft);
            setScrollLeftPosition(categoryPillsRef.current.scrollLeft);
            setLastDragTime(Date.now());
            setLastDragX(e.pageX);
            // Change cursor to grabbing
            categoryPillsRef.current.style.cursor = 'grabbing';
        }
    };

    const onMouseLeave = () => {
        if (isDragging && dragVelocity !== 0) {
            // Apply momentum scrolling when mouse leaves during drag
            applyContinuousScroll();
        }
        setIsDragging(false);
        if (categoryPillsRef.current) {
            categoryPillsRef.current.style.cursor = 'grab';
        }
    };

    const onMouseUp = () => {
        if (isDragging && Math.abs(dragVelocity) > 1.5) {
            // Apply momentum scrolling on mouse up if there was significant velocity
            applyContinuousScroll();
        }
        setIsDragging(false);
        if (categoryPillsRef.current) {
            categoryPillsRef.current.style.cursor = 'grab';
        }
    };

    // Apply continuous scrolling with momentum effect
    const applyContinuousScroll = () => {
        if (!categoryPillsRef.current) return;

        let velocity = dragVelocity;
        const scroll = () => {
            if (Math.abs(velocity) < 0.5 || !categoryPillsRef.current) return;

            categoryPillsRef.current.scrollLeft -= velocity * 10;
            velocity *= 0.95; // Deceleration factor
            requestAnimationFrame(scroll);
        };

        requestAnimationFrame(scroll);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !categoryPillsRef.current) return;
        e.preventDefault();

        const x = e.pageX - categoryPillsRef.current.offsetLeft;
        const walk = (x - startX) * 2.5; // Amplify movement for faster scrolling

        // Calculate velocity for momentum scrolling
        const now = Date.now();
        const dt = now - lastDragTime;
        if (dt > 0) {
            const dx = e.pageX - lastDragX;
            setDragVelocity((dx / dt) * 15); // Scale for better feel
            setLastDragTime(now);
            setLastDragX(e.pageX);
        }

        categoryPillsRef.current.scrollLeft = scrollLeftPosition - walk;
    };

    // Centered pills effect - Automatically center the active category
    useEffect(() => {
        if (categoryPillsRef.current && categories?.length > 0) {
            // Center the container's content
            const centerInitialScroll = () => {
                if (!categoryPillsRef.current) return;

                // Get the total scroll width and container width
                const scrollWidth = categoryPillsRef.current.scrollWidth;
                const containerWidth = categoryPillsRef.current.clientWidth;

                if (scrollWidth > containerWidth) {
                    // Set initial scroll position to center the content
                    const initialScrollPosition = (scrollWidth - containerWidth) / 2;
                    categoryPillsRef.current.scrollLeft = initialScrollPosition;
                }
            };

            // Apply centering after a short delay to ensure DOM is ready
            setTimeout(centerInitialScroll, 100);
        }
    }, [categories]);

    return (
        <div>
            {settings.enableAnnouncementBar && settings.announcementText && (
                <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-white text-center text-xs md:text-sm py-1 px-3">
                    {settings.announcementText}
                </div>
            )}
            {/* Main Navbar - Fixed at top */}
            <nav
                className={`bg-white py-3 fixed w-full top-0 z-50 transition-all duration-300 ${
                    isScrolled ? 'shadow-md' : ''
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Left Section: Logo and desktop menu */}
                        <div className="flex items-center space-x-4">
                            {/* Logo */}
                            <BrandLogo onClick={closeMenu} />

                            {/* Desktop Menu Links */}
                            <div className="hidden lg:flex items-center space-x-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
                                            pathname === link.href
                                                ? 'text-blue-600 font-semibold bg-blue-50'
                                                : 'text-gray-700'
                                        }`}>
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Center Section: Search Bar */}
                        <div className="hidden md:block flex-grow max-w-lg mx-auto px-4">
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full p-2 pl-10 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    placeholder="Search products..."
                                    aria-label="Search"
                                />
                                <div className="absolute left-3 top-2.5 text-gray-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                        aria-label="Clear search">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708z" />
                                        </svg>
                                    </button>
                                )}
                                {showSearchResults && (
                                    <div
                                        ref={searchResultsRef}
                                        className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                        {isSearching ? (
                                            <div className="p-4 text-center text-gray-500">Searching...</div>
                                        ) : searchResults.length > 0 ? (
                                            searchResults.map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="p-4 cursor-pointer hover:bg-gray-100"
                                                    onClick={() => handleSearchResultClick(product.id, product.slug)}>
                                                    <div className="flex items-center space-x-4">
                                                        <div className="relative w-10 h-10 rounded overflow-hidden">
                                                            <Image
                                                                src={getImageUrl(product.thumbnail)}
                                                                alt={product.title}
                                                                fill
                                                                className="object-cover rounded"
                                                                sizes="40px"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {product.title}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {(() => {
                                                                    const priceDetails = calculatePrice(
                                                                        Number(product.price) || 0,
                                                                        product.discount || 0,
                                                                    );
                                                                    return (
                                                                        <div className="flex items-center gap-1">
                                                                            <span>৳{priceDetails.salePrice}</span>
                                                                            {priceDetails.hasDiscount && (
                                                                                <span className="line-through text-xs text-gray-400">
                                                                                    ৳{priceDetails.originalPrice}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-gray-500">No results found</div>
                                        )}
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Right Section: Cart Icon with Mobile Menu Button */}
                        <div className="flex items-center space-x-2">
                            {/* Cart Icon */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Shopping cart"
                                title="Shopping Cart">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-6 w-6">
                                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                </svg>

                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartItems?.length ?? 0}
                                </span>
                            </button>

                            {/* Hamburger button for mobile view */}
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                aria-label="Open menu">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search (shown on smaller screens) */}
                    <div className="md:hidden mt-3">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full p-2 pl-10 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Search products..."
                                aria-label="Search"
                            />
                            <div className="absolute left-3 top-2.5 text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a.007.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                    aria-label="Clear search">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708z" />
                                    </svg>
                                </button>
                            )}
                            {showSearchResults && (
                                <div
                                    ref={searchResultsRef}
                                    className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    {isSearching ? (
                                        <div className="p-4 text-center text-gray-500">Searching...</div>
                                    ) : searchResults.length > 0 ? (
                                        searchResults.map((product) => (
                                            <div
                                                key={product.id}
                                                className="p-4 cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSearchResultClick(product.id, product.slug)}>
                                                {' '}
                                                <div className="flex items-center space-x-4">
                                                    <div className="relative w-10 h-10 rounded overflow-hidden">
                                                        <Image
                                                            src={getImageUrl(product.thumbnail)}
                                                            alt={product.title}
                                                            fill
                                                            className="object-cover rounded"
                                                            sizes="40px"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {product.title}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {(() => {
                                                                const priceDetails = calculatePrice(
                                                                    Number(product.price) || 0,
                                                                    product.discount || 0,
                                                                );
                                                                return (
                                                                    <div className="flex items-center gap-1">
                                                                        <span>৳{priceDetails.salePrice}</span>
                                                                        {priceDetails.hasDiscount && (
                                                                            <span className="line-through text-xs text-gray-400">
                                                                                ৳{priceDetails.originalPrice}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-gray-500">No results found</div>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </nav>

            {/* Categories Bar */}
            <div className="bg-gray-50 py-0.5 lg:py-0 fixed top-[60px] md:top-[65px] lg:top-[65px] w-full z-40 border-y border-gray-100 shadow-sm overflow-hidden">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    <div className="flex items-center justify-center relative">
                        {/* Left scroll button - Enhanced for better UI feedback */}
                        <button
                            onClick={() => scrollCategoriesLeft()}
                            className="absolute left-0 z-10 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1 sm:p-1.5 shadow-md flex items-center justify-center border border-gray-200 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
                            aria-label="Scroll left">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 sm:h-5 sm:w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Category pills with enhanced centering */}
                        <div
                            ref={categoryPillsRef}
                            className="category-pills smooth-scroll flex overflow-x-auto touch-pan-x scrollbar-hide py-1.5 px-0.7 no-scrollbar w-full snap-x snap-mandatory"
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                            onMouseDown={onMouseDown}
                            onMouseLeave={onMouseLeave}
                            onMouseUp={onMouseUp}
                            onMouseMove={onMouseMove}
                            style={{
                                cursor: isDragging ? 'grabbing' : 'grab',
                                userSelect: 'none',
                                scrollBehavior: 'smooth',
                                paddingLeft: '28px',
                                paddingRight: '28px',
                            }}>
                            {/* Spacer div for centering */}
                            <div className="flex-shrink-0 w-full"></div>
                            {categories && categories.length > 0 ? (
                                categories.map((category: any) => (
                                    <Link
                                        key={category.id}
                                        href={`/productPage?category=${encodeURIComponent(category.id)}`}
                                        className="category-pill flex-shrink-0 snap-start inline-flex items-center whitespace-nowrap py-0.7 sm:py-1 px-3 sm:px-4 mx-1 rounded-full text-xs md:text-sm font-medium 
                                    bg-white border border-gray-200 text-gray-700 shadow-sm
                                    hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:border-transparent
                                    active:scale-95 transform transition-all duration-200"
                                        onClick={closeMenu}>
                                        {category.title}
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-2 w-full">Loading...</div>
                            )}
                            {/* Spacer div for centering */}
                            <div className="flex-shrink-0 w-full"></div>
                        </div>

                        {/* Right scroll button - Enhanced for better UI feedback */}
                        <button
                            onClick={() => scrollCategoriesRight()}
                            className="absolute right-0 z-10 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1 sm:p-1.5 shadow-md flex items-center justify-center border border-gray-200 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
                            aria-label="Scroll right">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 sm:h-5 sm:w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Enhanced gradient fades with smoother transition */}
                        <div className="absolute left-0 w-12 sm:w-16 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
                        <div className="absolute right-0 w-12 sm:w-16 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
                    </div>
                </div>
            </div>

            {/* Mobile Side Navigation */}
            {isMenuOpen && (
                <SideNav
                    open={isMenuOpen}
                    onOpenChange={() => setIsMenuOpen(false)}
                    navLinks={navLinks}
                    categories={categories} // Pass the categories to the SideNav component
                />
            )}

            {/* Shopping Cart Side Drawer */}
            <SideCart open={isCartOpen} onOpenChange={setIsCartOpen} />
        </div>
    );
};

// Add custom CSS for hiding scrollbars while allowing scrolling
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        
        /* Improved scroll behavior and touch handling */
        .category-pills {
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
            overscroll-behavior-x: contain; /* Prevents overscrolling */
            display: flex;
            justify-content: center; /* Center flex items */
        }
        
        .category-pill {
            scroll-snap-align: center; /* Snap to center, not start */
            -webkit-tap-highlight-color: transparent; /* Remove tap highlight on mobile */
            box-shadow: 0 1px 2px rgba(0,0,0,0.07);
            border: 1px solid rgba(226, 232, 240, 0.8);
            transition: all 0.2s ease;
        }
        
        .category-pill:hover {
            box-shadow: 0 3px 6px rgba(0,0,0,0.1);
            border-color: rgba(203, 213, 224, 1);
        }
        
        /* Hardware acceleration for smoother animations */
        .smooth-scroll {
            transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-font-smoothing: subpixel-antialiased;
        }
    `;
    document.head.appendChild(style);
}

export default memo(Navbar);
