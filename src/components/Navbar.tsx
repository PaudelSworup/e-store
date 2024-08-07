"use client";
import { useState } from "react";
import { Menu, Search, User, ShoppingCart, Heart } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/app/store/store";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { items, favourite } = useAppSelector((state) => state.cart);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-white ">
        <div className="container mx-auto px-4 py-4 flex items-center">
          {/* <!-- logo --> */}
          <div
            className="mr-auto md:w-48 cursor-pointer flex-shrink-0"
            onClick={() => router.push("/")}
          >
            <Image
              src="/logo3.png"
              alt=""
              width={900}
              height={900}
              className="w-20"
              priority
            />
          </div>

          {/* <!-- search --> */}
          <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden xl:flex justify-evenly items-center">
            <select
              className="bg-transparent uppercase font-bold text-sm p-4 mr-4"
              name=""
              id=""
            >
              <option>All Categories</option>
              <option> Jewlery</option>
              <option> Clothes</option>
              <option> Electronics</option>
            </select>
            <SearchInput placeholder="search an item" />
          </div>

          {/* <!-- phone number --> */}
          <div className="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
            <span className="font-bold text-black/70 md:text-xl">
              9863459076
            </span>
            <span className="font-semibold text-sm text-gray-400">
              Support 24/7
            </span>
          </div>

          {/* <!-- buttons --> */}
          <nav className="contents">
            <ul className="ml-4 xl:w-48 flex items-center justify-end">
              <li className="ml-2 lg:ml-4 relative inline-block">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-9 lg:h-10  text-gray-500" />
                </Button>
              </li>
              <li className="ml-2 lg:ml-4 relative inline-block">
                {favourite.length > 0 && (
                  <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">
                    {favourite?.length > 0 && favourite.length}
                  </div>
                )}
                <Link href="/favourite">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Heart className="h-9 lg:h-10  text-gray-500" />
                  </Button>
                </Link>
              </li>
              <li className="ml-2 lg:ml-4 relative inline-block">
                {items.length > 0 && (
                  <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">
                    {items?.length > 0 && items.length}
                  </div>
                )}
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ShoppingCart className="h-9 lg:h-10 text-gray-500" />
                  </Button>
                </Link>
                {/* <Button variant="ghost" size="icon" className="rounded-full">
               
                    <ShoppingCart className="h-9 lg:h-10  text-gray-500" />
                  </Button> */}
              </li>
            </ul>
          </nav>

          {/* <!-- hamburger menu button --> */}
          <div className="ml-4 xl:hidden">
            <button onClick={toggleMenu}>
              <Menu className="h-8 w-8 text-gray-500" />
            </button>
          </div>
        </div>

        {/* <!-- Mobile Menu --> */}
        {isMenuOpen && (
          // <div className="xl:hidden bg-gray-100 p-4 z-50">
          // <div className="xl:hidden bg-gray-100 p-4 absolute top-25 left-0 right-0 z-50">
          <div className="xl:hidden bg-gray-100 p-4 absolute top-full left-0 right-0 z-50">
            <div className="flex items-center">
              <SearchInput placeholder="search an item" />
            </div>
            <ul className="mt-4">
              <li className="py-2">
                <a className="text-gray-700 font-semibold" href="#">
                  Jwelery
                </a>
              </li>
              <li className="py-2">
                <a className="text-gray-700 font-semibold" href="#">
                  Clothes
                </a>
              </li>
              <li className="py-2">
                <a className="text-gray-700 font-semibold" href="#">
                  Electronics
                </a>
              </li>
              <li className="py-2">
                <a className="text-gray-700 font-semibold" href="#">
                  All categories
                </a>
              </li>
            </ul>
          </div>
        )}

        <hr />
      </header>
    </>
  );
}
