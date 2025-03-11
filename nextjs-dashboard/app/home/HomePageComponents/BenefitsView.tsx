import Image from 'next/image';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { MotionDiv } from '../../ui/motion';

export default function MainPage() {
    const features = [
        "Usavršite engleski jezik",
        "Učite bilo kada i bilo gde.",
        "Gledajte video predavanja neograničeno.",
        "Zakažite online časove sa našim predavačima.",
    ];

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-evenly h-fit px-8 py-12">
            {/* Image Section */}
            <div className="mt-12 md:w-1/2 sm:w-full flex justify-center md:mt-0">
                <Image
                    className="rounded-md"
                    src="/woman.jpg"
                    width={800}
                    height={600}
                    objectFit="contain"
                    alt="Screenshots of the dashboard project showing desktop version"
                />
            </div>

            {/* Text Section */}
            <div className="flex flex-col items-left justify-left min-h-fit w-full md:w-1/2 ">
                {/* Wrapper for Title and Description */}
                <div className="w-full ">
                    {/* Title Section */}
                    <div className="lg:text-5xl text-3xl text-left md:text-4xl font-bold mb-8">
                        Benefiti Nase Platforme
                    </div>
                    
                    {/* Feature List */}
                    {features.map((feature, index) => (
                        <MotionDiv
                            key={index}
                            className="flex items-center gap-4 mb-4"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                        >
                            <CheckCircleIcon className="h-8 w-8 ib" />
                            <p className="text-xl md:text-3xl">{feature}</p>
                        </MotionDiv>
                    ))}
                </div>
            </div>
        </div>
    );
}
