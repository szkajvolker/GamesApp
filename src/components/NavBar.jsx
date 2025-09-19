const NavBar = () => {
  return (
    <div className="fixed top-0 w-full bg-white shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text text-2xl font-bold text-gray-900">GameStore</h1>

          <div className="flex space-x-8"></div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
