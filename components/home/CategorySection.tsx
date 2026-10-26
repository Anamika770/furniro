'use client'
import Image from "next/image";
import Slider from "react-slick";

export default function Category() {
    const categoryItems = [
        { image: "/images/home/mask_group_1.jpg", title: "Dining" },
        { image: "/images/home/mask_group_2.png", title: "Living" },
        { image: "/images/home/mask_group_3.png", title: "Bedroom" },
    ]
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center justify-center my-8">
                <h2 className="text-[#333333] text-2xl font-extrabold mb-2">Browse The Range</h2>
                <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit!</p>
            </div>
            <Slider {...settings}>
                {categoryItems.map((item, index) => (
                    <div key={index} className="px-2">
                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="mb-2 rounded-lg shadow-lg group-hover:scale-100 transition-all duration-300">
                                <Image
                                    src={item.image}
                                    alt={`${item.title} category`}
                                    width={300}
                                    height={200}
                                    className="transition-transform duration-300 group-hover:scale-105 rounded-lg pt-3"
                                />
                            </div>
                            <h3 className="text-lg font-medium text-[#333333] transition-colors duration-300 group-hover:text-[#2a6877]">
                                {item.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}