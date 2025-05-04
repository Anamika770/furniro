import Image from "next/image";
import group1 from "./utils/mask_group_1.jpg"
import group2 from "./utils/mask_group_2.png"
import group3 from "./utils/mask_group_3.png"

export default function Category() {
    const categoryItems = [
        { image: group1, title: "Dining" },
        { image: group2, title: "Living" },
        { image: group3, title: "Bedroom" }
    ]
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center justify-center mb-8">
                <h2 className="text-[#333333] text-2xl font-extrabold mb-2">Browse The Range</h2>
                <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit!</p>
            </div>
            
            <div className="flex flex-row justify-center gap-4">
                {categoryItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center group cursor-pointer">
                        <div className="mb-2 overflow-hidden">
                            <Image 
                                src={item.image} 
                                alt={`${item.title} category`}
                                width="auto"
                                height="auto"
                                className="transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <h3 className="text-lg font-medium text-[#333333] transition-colors duration-300 group-hover:text-[#2a6877]">{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
};