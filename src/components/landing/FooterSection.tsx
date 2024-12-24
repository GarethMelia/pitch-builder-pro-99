import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Facebook, Youtube, Instagram } from 'lucide-react';

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-bold mb-4 block">
              Pitch Builder Pro
            </Link>
            <p className="text-gray-300 mb-6">
              Automates the annoying parts of proposal writing. No more manual anything. Just insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/resources" className="text-gray-300 hover:text-white">Resources</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link to="/docs" className="text-gray-300 hover:text-white">Docs</Link></li>
              <li><Link to="/university" className="text-gray-300 hover:text-white">PBP University</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white">Pricing</Link></li>
              <li><Link to="/trial" className="text-gray-300 hover:text-white">Free Trial</Link></li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features/autocapture" className="text-gray-300 hover:text-white">Autocapture</Link></li>
              <li><Link to="/features/governance" className="text-gray-300 hover:text-white">Data Governance</Link></li>
              <li><Link to="/features/events" className="text-gray-300 hover:text-white">Virtual Events</Link></li>
              <li><Link to="/features/analytics" className="text-gray-300 hover:text-white">Behavioral Analytics</Link></li>
              <li><Link to="/features/connect" className="text-gray-300 hover:text-white">Connect</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link to="/solutions/cro" className="text-gray-300 hover:text-white">Conversion Rate Optimization</Link></li>
              <li><Link to="/solutions/analytics" className="text-gray-300 hover:text-white">Product Analytics</Link></li>
              <li><Link to="/solutions/ecommerce" className="text-gray-300 hover:text-white">eCommerce</Link></li>
              <li><Link to="/solutions/financial" className="text-gray-300 hover:text-white">Financial Services</Link></li>
              <li><Link to="/solutions/saas" className="text-gray-300 hover:text-white">SaaS</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
              <li><Link to="/partners" className="text-gray-300 hover:text-white">Partners</Link></li>
              <li><Link to="/customers" className="text-gray-300 hover:text-white">Customers</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">© {currentYear} Pitch Builder Pro</p>
          <div className="flex space-x-6">
            <Link to="/security" className="text-gray-300 hover:text-white">Security</Link>
            <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy</Link>
            <Link to="/terms" className="text-gray-300 hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};