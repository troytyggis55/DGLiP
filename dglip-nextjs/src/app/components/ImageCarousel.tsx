"use client";

import React from "react";
import Slider from "react-slick";
import {urlFor} from "@/sanity/urlFor";
import {SanityDocument} from "@sanity/client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";

export default function ImageCarousel({ imageCarousel }: { imageCarousel: SanityDocument }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            {imageCarousel.images.map((image: SanityImageSource, index: number) => {
                const imageUrl = urlFor(image)?.url();

                return (
                <div key={index}>
                    <img src={imageUrl}
                         alt={"Carousel image " + (index + 1)} className="w-full h-auto mx-2"
                    />
                </div>
                );
            })}
        </Slider>
    );
}