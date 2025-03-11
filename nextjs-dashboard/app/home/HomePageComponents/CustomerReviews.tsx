"use client";

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';

const reviews = [
    {
        id: 1,
        name: 'John Doe',
        image: '/users/user1.jpg',
        date: 'January 20, 2025',
        rating: 5,
        review: 'This platform has helped me improve my English skills tremendously.'
    },
    {
        id: 2,
        name: 'Jane Smith',
        image: '/users/user2.jpg',
        date: 'February 3, 2025',
        rating: 4,
        review: 'Great content and excellent teaching methods. I feel more confident in my English now!'
    },
    {
        id: 3,
        name: 'Alex Brown',
        image: '/users/user3.png',
        date: 'March 15, 2025',
        rating: 5,
        review: 'The structured lessons and interactive exercises make learning fun and effective!'
    },
    {
        id: 4,
        name: 'Alex Brown',
        image: '/users/user4.jpg',
        date: 'March 15, 2025',
        rating: 5,
        review: 'The structured lessons and interactive exercises make learning fun and effective!'
    },
    {
        id: 5,
        name: 'Alex Brown',
        image: '/users/user5.jpg',
        date: 'March 15, 2025',
        rating: 5,
        review: 'The structured lessons and interactive exercises make learning fun and effective!'
    },
    {
        id: 6,
        name: 'Alex Brown',
        image: '/users/user6.jpg',
        date: 'March 15, 2025',
        rating: 5,
        review: 'The structured lessons and interactive exercises make learning fun and effective!'
    },
    {
        id: 7,
        name: 'Alex Brown',
        image: '/users/user7.jpg',
        date: 'March 15, 2025',
        rating: 5,
        review: 'The structured lessons and interactive exercises make learning fun and effective!'
    },
    {
        id: 8,
        name: 'Alex Brown',
        image: '/users/user8.jpg',
        date: 'March 15, 2025',
        rating: 5,
        review: 'The structured lessons and interactive exercises make learning fun and effective!'
    },
    {
        id: 9,
        name: 'Alex Brown',
        image: '/users/user9.jpg',
        date: 'March 15, 2025',
        rating: 5,
        review: 'The structured lessons and interactive exercises make learning fun and effective!'
    },
    {
        id: 10,
        name: 'Alex Brown',
        image: '/users/user10.jpg',
        date: 'March 15, 2025',
        rating: 5,
        review: 'The structured lessons and interactive exercises make learning fun and effective!'
    },
    {
        id: 11,
        name: 'Alex Brown',
        image: '/users/user11.jpg',
        date: 'March 15, 2025',
        rating: 5,
        review: 'The structured lessons and interactive exercises make learning fun and effective!'
    },
    {
        id: 12,
        name: 'Alex Brown',
        image: '/users/user12.jpg',
        date: 'March 15, 2025',
        rating: 5,
        review: 'The structured lessons and interactive exercises make learning fun and effective!'
    },
    {
        id: 13,
        name: 'Alex Brown',
        image: '/users/user13.jpg',
        date: 'March 15, 2025',
        rating: 5,
        review: 'The structured lessons and interactive exercises make learning fun and effective!'
    }
];

export default function CustomerReviews() {
    return (
        <div className="max-w-full mx-auto p-8 prp text-white shadow-lg" suppressHydrationWarning={true}>
            <h2 className="lg:text-5xl text-3xl text-neutral-300-800 font-bold text-center">What Our Customers Say</h2>
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active',
                }}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    240: {
                        slidesPerView: 1, // 1 slide on small screens
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 1, // 1 slide on small screens
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2, // 2 slides on medium screens
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3, // 3 slides on large screens
                        spaceBetween: 20,
                    },
                }}
                className="p-4"
            >
                {reviews.map(({ id, name, image, date, rating, review }) => (
                    <SwiperSlide key={id} className='mb-20 mt-20 '>
                        <div className="bg-white shadow-lg p-8 text-black rounded-lg px-8 flex flex-col items-start">
                            <div className="flex items-center  gap-4 mb-4">
                                <Image
                                    src={image}
                                    alt={name}
                                    width={64}
                                    height={64}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{name}</h3>
                                    <p className="text-neutral-300-500 text-sm">{date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, index) => (
                                    <FaStar key={index} className={index < rating ? 'text-red-500' : 'text-neutral-300-300'} />
                                ))}
                            </div>
                            <p className="text-neutral-300-600 mt-2">"{review}"</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}