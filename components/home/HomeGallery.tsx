import Image from 'next/image';

const galleryItems = [
  { image: '/images/products/product-1.png', title: 'Minimal desk' },
  { image: '/images/products/product-2.png', title: 'Warm lounge' },
  { image: '/images/products/product-3.png', title: 'Natural textures' },
  { image: '/images/products/product-4.png', title: 'Statement pieces' },
];

export default function Gallery() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#B88E2F]">
            Share Your Setup
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#3A3A3A] md:text-4xl">
            Follow our interior inspiration gallery
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {galleryItems.map((item, index) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-[20px] bg-[#F4F5F7] ${
                index === 0 || index === 3 ? 'md:translate-y-10' : ''
              }`}
            >
              <div className="relative h-[260px] md:h-[320px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-lg font-semibold">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
