import { Lock, MessageCircle, RefreshCw, Trophy } from "lucide-react";

const benefits = [
  {
    icon: <Trophy size={32} />,
    title: "Free Shipping",
    description: "Free shipping on all orders",
  },
  {
    icon: <RefreshCw size={32} />,
    title: "30 Days Return",
    description: "Simply return it within 30 days",
  },
  {
    icon: <Lock size={32} />,
    title: "Secure Payment",
    description: "Your payment information is safe",
  },
  {
    icon: <MessageCircle size={32} />,
    title: "24/7 Support",
    description: "We are here to help anytime",
  },
];

export default function BenefitsBar() {
  return (
    <section className="mt-10 w-full bg-[#faf5ed] py-12">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flex items-center justify-start gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center text-[#B88E2F]">
              {benefit.icon}
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                {benefit.title}
              </h3>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}