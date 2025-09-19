const Footer = () => {
  return (
    <footer className=" bg-gray-900 text-white w-full">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="flex flex-row gap-8 justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-4">GameStore</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              {" "}
              Your ultimate destination for the latest and greatest games. Discover, play, and enjoy
              thousands of titles.
            </p>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 GameStore. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
