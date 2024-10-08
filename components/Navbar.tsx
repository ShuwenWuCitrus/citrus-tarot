import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-purple-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Tarot Reader
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-purple-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/cards" className="hover:text-purple-200">
              Cards
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-purple-200">
              About
            </Link>
          </li>
          <li>
            <Link href="/history" className="hover:text-purple-200">
              History
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
