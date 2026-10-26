import Image from 'next/image';

const inspirationCards = [
  {
    title: 'Bedroom',
    subtitle: 'Inner Peace',
    image: '/images/home/mask_group_1.jpg',
    className: 'md:col-span-2',
  },
  {
    title: 'Living Room',
    subtitle: 'Comfort & Style',
    image: '/images/home/mask_group_2.png',
    className: 'md:col-span-1',
  },
  {
    title: 'Dining Area',
    subtitle: 'Gather Around',
    image: '/images/home/mask_group_3.png',
    className: 'md:col-span-1',
  },
];

export default function Inspiration() {
  return (
    <section className="bg-[#FCF8F3] py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 text-center md:text-left md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#B88E2F]">
              Inspiration
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#3A3A3A] md:text-4xl">
              50+ Beautiful rooms <br className="hidden md:block" /> inspiration
            </h2>
          </div>

          <button className="w-fit rounded-md bg-[#B88E2F] px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]">
            Explore More
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {inspirationCards.map((card, index) => (
            <div
              key={card.title}
              className={`${card.className} group relative overflow-hidden rounded-[24px] bg-white shadow-sm`}
            >
              <div className="relative h-[320px] md:h-[420px]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 via-black/10 to-transparent p-5 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                    {card.subtitle}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">{card.title}</h3>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/10 text-lg">
                  →
                </span>
              </div>

              {index === 0 && (
                <div className="absolute left-6 top-6 max-w-[200px] rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#B88E2F]">
                    Room Setup
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[#3A3A3A]">
                    Cozy & modern
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
