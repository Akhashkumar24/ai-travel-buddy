// frontend/src/components/common/Footer.js - FIXED VERSION
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-semibold">AI Travel Buddy</span>
          </div>
          
          <div className="text-sm text-gray-400">
            © 2025 AI Travel Buddy. Made with ❤️ for travelers.
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Header, Footer };