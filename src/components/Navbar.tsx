import { Link } from "react-router";
const Navbar = () => {
  return (
    <header className="bg-orange-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider">
          Palora Cafe
        </Link>

        <ul className="flex gap-4">
          <li>
            <Link to="/" className="hover:text-orange-200 transition-colors">
              Pesan Menu
            </Link>
          </li>
          {/* <li>
            <Link
              to="/kasir"
              className="hover:text-orange-200 transition-colors"
            >
              Dapur Kasir
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
