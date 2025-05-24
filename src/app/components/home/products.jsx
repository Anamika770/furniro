import Image from "next/image";
import { Share2, BarChart2, Heart } from "lucide-react";
import product1 from "./utils/image_1.png"
import product2 from "./utils/image_2.png"
import product3 from "./utils/image_3.png"
import product4 from "./utils/image_4.png"
import product5 from "./utils/image_5.png"
import product6 from "./utils/image_6.png"
import product7 from "./utils/image_7.png"


export default function Product() {
  const products = [
    {
      id: 1,
      image: product1,
      name: "Slythering",
      description: "Stylish cafe chair",
      price: 2500000,
      originalPrice: 3500000,
      discount: 30,
      isNew: false
    },
    {
      id: 2,
      image: product2,
      name: "Leviosa",
      description: "Stylish cafe chair",
      price: 2500000,
      originalPrice: null,
      discount: null,
      isNew: false
    },
    {
      id: 3,
      image: product3,
      name: "Lolito",
      description: "Luxury big sofa",
      price: 7000000,
      originalPrice: 14000000,
      discount: 50,
      isNew: false
    },
    {
      id: 4,
      image: product4,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: 500000,
      originalPrice: null,
      discount: null,
      isNew: true
    },
    {
      id: 5,
      image: product5,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: 500000,
      originalPrice: null,
      discount: null,
      isNew: true
    },
    {
      id: 6,
      image: product6,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: 500000,
      originalPrice: null,
      discount: null,
      isNew: true
    },
    {
      id: 7,
      image: product7,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: 500000,
      originalPrice: null,
      discount: null,
      isNew: true
    },
    {
      id: 8,
      image: product1,
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: 500000,
      originalPrice: null,
      discount: null,
      isNew: true
    },
    // Add more products as needed
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((item, index) =>(
          <div key={index} className="relative flex flex-col w-full bg-white">
          {/* Image container with badge */}
          <div className="relative w-full  overflow-hidden bg-gray-100">
            <Image 
              src={item?.image} 
              alt={item?.name}
              className="object-cover w-full h-full"
            />
            
            {/* Discount or New badge */}
            {item?.discount ? (
              <span className="absolute top-4 right-4 bg-red-400 text-white rounded-full px-2 py-1 text-xs font-medium">
                -{item?.discount}%
              </span>
            ) : item?.isNew ? (
              <span className="absolute top-4 right-4 bg-teal-400 text-white rounded-full px-2 py-1 text-xs font-medium">
                New
              </span>
            ) : null}
            
            {/* Add to cart button - only shown on hover */}
           <div className="absolute inset-0 space-y-5 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button className="bg-white text-[#B88E2F]  py-2 px-4 text-sm font-bold">
                Add to cart
              </button>
              <div className="flex items-center text-white cursor-pointer font-bold space-x-4 mb-3">
                <Share2 size={16} className="mr-1" /> Share
                <BarChart2 size={16} className="mr-1" /> Compare
                <Heart size={16} className="mr-1" /> Like
              </div>
            </div>

          </div>
          
          {/* Product info */}
          <div className=" bg-[#F4F5F7] p-4">
            
            {/* Product name */}
            <h3 className="font-medium text-lg text-gray-800">{item?.name}</h3>
            
            {/* Product description */}
            <p className="text-sm text-gray-500 mb-2">{item?.description}</p>
            
            {/* Price */}
            <div className="flex items-center justify-between space-x-2">
              <span className="font-medium">Rp {item?.price.toLocaleString()}</span>
              {item?.originalPrice && (
                <span className="text-gray-400 text-sm line-through">
                  Rp {item?.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-10">
        <button className="border-2 border-cyan text-cyan font-bold px-8 py-2 hover:bg-cyan hover:text-white hover:scale-110 transition-all duration-300 rounded-lg">
          Show More
        </button>
      </div>
    </div>
  );
}