import { FaLeaf } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <FaLeaf className="text-green-500 h-8 w-8 mr-2" />
              <span className="text-2xl font-bold">Baraka</span>
            </div>
            <p className="text-gray-400">
              We are committed to connecting Moroccans with fresh food from
              local restaurants while reducing food waste across Morocco.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  For Businesses
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Download App
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Phone: +212 xxx xxx xxx</li>
              <li>Email: hello@baraka.ma</li>
              <li>Address: Casablanca, Morocco</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Baraka. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
