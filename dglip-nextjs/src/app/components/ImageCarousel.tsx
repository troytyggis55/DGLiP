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
        speed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
        waitForAnimate: false,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    return (
        <Slider {...settings} className="mb-8">
            {imageCarousel.images.map((image: SanityImageSource, index: number) => {
                const imageUrl = urlFor(image)?.url();

                return (
                  <div key={index} className="px-2 flex items-center" style={{ height: "16rem" }}>
                    <img
                      src={imageUrl}
                      alt={"Carousel image " + (index + 1)}
                      className="w-full object-cover"
                      style={{ height: "16rem" }}
                    />
                  </div>
                );
            })}
        </Slider>
    );
}