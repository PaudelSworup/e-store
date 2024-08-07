"use client";

import { Button } from "@/components/ui/button";
import { Trash, ShoppingBasket } from "lucide-react";
import { useAppSelector } from "../store/store";

import { useDispatch } from "react-redux";
import { addToCart, removeFromFavourite } from "../store/cartSlice";

export default function page() {
  const { favourite } = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        {favourite.length > 0
          ? "Favourite Items"
          : "No selected favourite Items"}
        {/* Favourite Items */}
      </h1>
      {favourite?.map((data) => (
        <div key={data.id} className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-3 items-start gap-4">
              <div className="col-span-2 flex items-start gap-4">
                <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                  <img
                    src={data.image}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-gray-800">
                    {data.title}
                  </h3>
                  {/* <p className="text-xs font-semibold text-gray-500 mt-0.5">
                    Rs.{data.}
                  </p> */}
                  <div className="flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-6 bg-white font-semibold text-red-500  text-xs flex items-center gap-1 shrink-0"
                    >
                      <Trash
                        onClick={() => dispatch(removeFromFavourite(data.id))}
                        className="w-4 h-4"
                      />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-6 bg-white font-semibold text-muted-foreground text-xs flex items-center gap-1 shrink-0"
                    >
                      <ShoppingBasket
                        onClick={() => dispatch(addToCart(data))}
                        className="w-4 h-4"
                      />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="ml-auto">
                <h4 className="text-lg max-sm:text-base font-bold text-gray-800">
                  Rs.{data.price}
                </h4>
              </div>
            </div>

            <hr className="border-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
}
