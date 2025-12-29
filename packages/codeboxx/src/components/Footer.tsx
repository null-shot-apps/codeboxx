export function Footer() {
  return (
    <footer className="bg-navy-darker border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">CryptoRWA Hub</h3>
            <p className="text-gray-400 text-sm">
              Your one-stop hub for unbiased crypto, RWA, and DeFi news with real-time price feeds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                  Education
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-navy-dark rounded-lg flex items-center justify-center hover:bg-neon-green hover:text-navy-dark transition-colors"
                aria-label="Twitter"
              >
                𝕏
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-navy-dark rounded-lg flex items-center justify-center hover:bg-neon-green hover:text-navy-dark transition-colors"
                aria-label="Discord"
              >
                💬
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-navy-dark rounded-lg flex items-center justify-center hover:bg-neon-green hover:text-navy-dark transition-colors"
                aria-label="Telegram"
              >
                ✈️
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 text-sm">
              <strong>⚠️ Disclaimer:</strong> This is not financial advice. All information provided is for educational purposes only. 
              Always do your own research (DYOR) and consult with a qualified financial advisor before making investment decisions.
            </p>
          </div>
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} CryptoRWA Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

