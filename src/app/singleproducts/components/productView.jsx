import Image from "next/image"
import img1 from "../utils/imagefile-1746350971291-628662384.webp"

export default function ProductView() {
    return (
        <div className="container px-4 py-8">
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-2xl md:text-4xl font-bold font-baskville text-textColor mb-4 mt-2">
                            <div className="font-bold text-6xl text-center text-orange-700">Mangal Yatra</div>
                        </h1>
                        <div className="text-gray-700 leading-relaxed text-justify font-montserrat text-base sm:text-lg md:text-xl">
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut inventore similique dolorum doloremque aspernatur, qui, ratione et reprehenderit accusantium voluptatibus, provident consectetur. Neque sunt consequatur tempore esse reprehenderit laborum illo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illum commodi dolorum.</span>
                        </div>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                        <Image 
                            src={img1} 
                            alt="Sofa" 
                            className="w-full h-52 md:h-auto rounded-lg shadow-lg object-contain" 
                        />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row-reverse items-center gap-8 justify-between">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-2xl md:text-4xl font-bold font-baskville text-textColor mb-4 mt-2">
                            <div className="font-bold text-6xl text-center text-orange-700">Mangal Yatra</div>
                        </h1>
                        <div className="text-gray-700 leading-relaxed text-justify font-montserrat text-base sm:text-lg md:text-xl">
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut inventore similique dolorum doloremque aspernatur, qui, ratione et reprehenderit accusantium voluptatibus, provident consectetur. Neque sunt consequatur tempore esse reprehenderit laborum illo!</span>
                        </div>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                        <Image 
                            src={img1} 
                            alt="Sofa" 
                            className="w-full h-52 md:h-auto rounded-lg shadow-lg object-contain" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};
