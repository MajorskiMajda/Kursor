'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default function MainPage(props: {
    image: string | StaticImport;
    text: string;
    subH: ReactNode | string;
    opis: string;
    subHColor?: string;
    showButton?: boolean;
    showButton2?: boolean;
    className?: string;
    hideImageOnMobile?: boolean;
    textSizeClass?: string; // New prop for text size customization
}) {
    const router = useRouter();

    const handleSignUpClick = () => {

        router.push('/adultpricing'); // Navigate to the login page if no token exists

    };
    const handleKidsClick = () => {

        router.push('/kidspricing'); // Navigate to the login page if no token exists

    };

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-evenly h-fit p-8">
            {/* Image Section */}
            <div
                className={`mt-12 lg:w-2/4 md:w-10/12 sm:w-full flex justify-center md:mt-0 
                    ${props.className || ''} 
                    ${props.hideImageOnMobile ? 'hidden sm:block' : ''} // Hide on mobile if prop is true
                `}
            >
                <Image
                    className="rounded-md"
                    src={props.image}
                    width={800}
                    height={600}
                    objectFit="contain"
                    alt="Screenshots of the dashboard project showing desktop version"
                />
            </div>

            {/* Text Section */}
            <div className="flex flex-col items-center justify-center min-h-fit w-full md:w-6/12">
                {/* Wrapper for Title and Description */}
                <div className="w-full md:w-2/4 lg:w-3/4">
                    {/* Title Section */}
                    <div className={`font-bold lg:mb-4 lg:p-0 pt-4 pb-4 ${props.textSizeClass || 'lg:text-8xl text-6xl md:text-5xl text-3xl text-left'}`}>
                        {props.text}
                    </div>
                    <div
                        className={`font-bold mb-4  'lg:text-6xl text-4xl md:text-5xl text-left`}
                        style={{ color: props.subHColor || 'inherit' }}
                    >
                        {props.subH}
                    </div>
                    {/* Description Section */}
                    <div className={`text-left text-neutral-300-600 lg:text-2xl text-lg`}>
                        {props.opis}
                    </div>

                    {/* Conditional Button */}
                    {props.showButton && (
                        <div>
                            <button
                                onClick={handleSignUpClick}
                                className={`mt-6 px-6 py-2 lg:text-2xl text-lg font-semibold special-btn rounded-md ${props.className || ''}`}
                            >
                                Zapocni
                            </button>
                            <button
                                onClick={handleKidsClick}
                                className={`mt-6 px-6 py-2 lg:text-2xl text-lg  kids rounded-md ${props.className || ''}`}
                            >
                                Kids
                            </button>
                        </div>
                    )}
                    {props.showButton2 && (
                        <div>
                            <button
                                onClick={handleKidsClick}
                                className={`mt-6 px-6 py-2 lg:text-2xl text-lg font-semibold special-btn rounded-md ${props.className || ''}`}
                            >
                                Zapocni Deciji
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
