import Image from "next/image";
import img1 from "../utils/imagefile-1746072565496-35198562.webp";
import img2 from "../utils/imagefile-1746072565952-155355850.webp";

export default function WithUs() {
    return (
        <div className="container max-auto px-4 py-8">
            <div className="flex flex-col items-center">
                <div className="flex flex-row items-center justify-between w-full">
                    <Image src={img1} alt={"Contact Us"} className="w-auto h-auto"/>
                    <div className="font-bold text-4xl text-center flex flex-col">
                        <div>Ganesh Lakshmi Yagya</div>
                        <div className="font-semibold text-4xl">C e l e b r a  o n s</div>
                    </div>
                    <Image src={img2} alt={"Contact Us"}  className="w-auto h-auto"/>
                </div>
                <div className="lg:max-w-3xl text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, minima quo nesciunt distinctio, perspiciatis excepturi itaque sed blanditiis, odio officia libero molestiae. Reprehenderit architecto vero molestias! Debitis laboriosam inventore dolores!</div>
            </div>
        </div>
    )
};
