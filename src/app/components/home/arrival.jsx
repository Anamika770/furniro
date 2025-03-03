import Image from "next/image";
import arrivalSection from "../home/utils/Arrival_section.jpg"

export default function Arrival() {
    return (
        <>
        {/* // Desktop */}
        <section className="relative">
            <Image src={arrivalSection} alt="New Arrival Section" className="w-full" />

            <div className="absolute inset-0 container mx-auto items-center justify-end pr-10 hidden px-2 lg:flex">
                <div className="bg-[#FFF3E3] border border-[#FFF3E3] p-6 shadow-lg max-w-md">
                <h3 className="text-lg">New Arrival</h3>
                <h2 className="text-[#B88E2F] font-bold text-4xl">
                    Discover Our <br /> New Collection
                </h2>
                <div className="text-sm mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                    tellus, luctus nec ullamcorper mattis.
                </div>
                <button className="bg-[#B88E2F] transition-all duration-300 hover:scale-95 text-white font-bold px-4 py-2 mt-4 rounded-md">
                    BUY NOW
                </button>
                </div>
            </div>
        </section>

        {/* Mobile */}
        <section className="lg:hidden py-4 px-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800">New Arrival</h3>
            <h2 className="text-xl font-bold text-[#B88E2F] mt-2">
                Discover Our New Collection
            </h2>
            <div className="text-sm text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </div>
            <button className="bg-[#B88E2F] text-white font-bold px-4 py-2 mt-4 rounded-md">
                BUY NOW
            </button>
        </section>
        </>
    )
};
