"use client";

import React from "react";
import Slider from "react-slick";
import {urlFor} from "@/sanity/urlFor";
import {SanityDocument} from "@sanity/client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";

export default function ImageCarousel({ imageCarousel, className }: { imageCarousel: SanityDocument, className?: string }) {
    const [slidesToShow, setSlidesToShow] = React.useState(getSlidesToShow());

    React.useEffect(() => {
        function handleResize() {
            setSlidesToShow(getSlidesToShow());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function getSlidesToShow() {
        if (typeof window === "undefined") return 5;
        if (window.innerWidth <= 1200) return Math.floor(window.innerWidth / 200);
        return 5;
    }

    const settings = {
        dots: true,
        infinite: true,
        draggable: false,
        speed: 4000,
        swipe: false,
        slidesToShow,
        slidesToScroll: 1,
        waitForAnimate: false,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "linear"
    };

    return (
        <Slider {...settings} className={`pointer-events-none ${className}`}>
            {imageCarousel.images.map((image: SanityImageSource, index: number) => {
                const imageUrl = urlFor(image)?.url();

                return (
                  <div key={index} className="px-4 flex items-center" style={{ height: "16rem" }}>
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