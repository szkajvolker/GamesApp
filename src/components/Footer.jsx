const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 bg-white border-t-2 border-black/30 text-white w-full p-2">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="flex flex-row gap-8 justify-between">
          <div>
            <h3 className="lg:text-3xl text-2xl dark:color-gray-700 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-bold mb-4">
              GameStore.
            </h3>
            <p className="text-gray-500 mb-4 max-w-md">
              {" "}
              Your{" "}
              <span className="font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                ultimate
              </span>{" "}
              destination for the latest and greatest games.{" "}
              <span className="font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                {" "}
                Discover, play, and enjoy{" "}
              </span>
              thousands of titles.
            </p>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 font-bold">
              © {new Date().getFullYear()} GameStore. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
