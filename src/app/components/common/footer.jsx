export default function Footer() {
  const links = [
    { name: "Home", href: "/home" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  const help = [
    { name: "Payment Options", href: "/payment-options" },
    { name: "Returns", href: "/returns" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between text-left">
          <div className="mb-8 md:space-y-10">
            <div className="font-bold text-3xl mb-4">Funiro.</div>
            <address className="text-gray-600 text-xl not-italic">
              <div>400 University Drive Suite 200 Coral</div>
              <div>Gables, <br /> FL 33134 USA</div>
            </address>
          </div>

          <div className="md:flex sm:gap-8  lg:gap-24">
            <div className="mb-8 md:space-y-10">
              <h6 className="font-bold text-gray-800 mb-4">Links</h6>
              <ul className="space-y-10">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-black transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 md:space-y-10">
              <h6 className="font-bold text-gray-800 mb-4">Help</h6>
              <ul className="space-y-10">
                {help.map((item) => (
                  <li key={item.name}  >
                    <a
                      href={item.href}
                      className="text-gray-600 hover:text-black transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 md:space-y-10">
              <h6 className="font-bold text-gray-800 mb-4">Newsletter</h6>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="border border-gray-300 rounded-l-md py-2 px-3 w-full focus:outline-none focus:border-blue-500 text-sm"
                />
                <button className="bg-black text-white rounded-r-md py-2 px-4 hover:bg-gray-800 focus:outline-none transition-colors duration-300 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 py-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Funiro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}