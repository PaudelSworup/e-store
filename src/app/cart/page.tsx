"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Trash,
  Minus,
  Plus,
  Mail,
  Castle,
  Phone,
  MapPin,
  Navigation2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../store/cartSlice";
import { useAppSelector } from "../store/store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createOrder } from "@/APIS/apis";
import { setSignature } from "../store/hashSlice";
import Image from "next/image";

export default function Cart() {
  const { userInfo } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const totalPrice = items
    .reduce((total: number, item: any) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const [formData, setFormData] = useState({
    shipping: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert form data to object
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    // Validate the form data
    if (
      !data.shipping ||
      !data.phone ||
      !data.city ||
      !data.state ||
      !data.zip
    ) {
      toast.error("enter all the feilds", { position: "top-right" });
      return;
    }

    // Prepare data for submission
    const orderDetails = {
      shipping: formData.shipping,
      phone: formData.phone,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      totalPrice,
      items: JSON.stringify(items),
    };

    const queryString = new URLSearchParams(orderDetails).toString();
    router.push(`/checkout?${queryString}`);
  };

  return (
    <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        {items.length > 0 ? "Shopping Cart" : "No Items in your Cart"}
      </h1>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="md:col-span-2 space-y-4">
          {items.map((item: any) => (
            <div key={item?.id} className="grid grid-cols-3 items-start gap-4">
              <div className="col-span-2 flex items-start gap-4">
                <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                  <Image
                    src={item.image}
                    alt="Description"
                    width={500}
                    height={300}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                  {/* <img
                    src={item.image}
                    className="w-full h-full object-contain mix-blend-multiply"
                  /> */}
                </div>

                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">
                    Size: MD
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-6 bg-white font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0"
                  >
                    <Trash
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="w-4 h-4"
                    />
                  </Button>
                </div>
              </div>

              <div className="ml-auto">
                <h4 className="text-lg max-sm:text-base font-bold text-gray-800">
                  Rs.{item.price}
                </h4>

                <button
                  type="button"
                  className="mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                >
                  <Minus
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => dispatch(decrementQuantity(item.id))}
                  />
                  <span className="mx-3 font-bold">{item.quantity}</span>
                  <Plus
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => dispatch(incrementQuantity(item.id))}
                  />
                </button>
              </div>
            </div>
          ))}

          <hr className="border-gray-300" />
        </div>

        <div className="bg-gray-100 rounded-md p-4 h-max">
          <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">
            Order Summary
          </h3>

          <form className="mt-6" onSubmit={handleForm}>
            <div>
              <h3 className="text-base text-gray-800 font-semibold mb-4">
                Enter Details
              </h3>
              <div className="space-y-3">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="shipping"
                    placeholder="shipping address"
                    value={formData.shipping}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none"
                  />
                  <Mail className="w-4 h-4 text-gray-600 absolute right-4" />
                </div>

                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none"
                  />
                  <Castle className="w-4 h-4 text-gray-600 absolute right-4" />
                </div>

                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none"
                  />
                  <Navigation2 className="w-4 h-4 text-gray-600 absolute right-4" />
                </div>

                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none"
                  />
                  <MapPin className="w-4 h-4 text-gray-600 absolute right-4" />
                </div>

                <div className="relative flex items-center">
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone No."
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none appearance-none"
                  />
                  <Phone className="w-4 h-4 absolute text-gray-600 right-4" />
                </div>
              </div>
            </div>

            <ul className="text-gray-800 mt-6 space-y-3">
              <li className="flex flex-wrap gap-4 text-sm">
                Subtotal
                <span className="ml-auto font-bold">Rs.{totalPrice}</span>
              </li>
              <hr className="border-gray-300" />
              <li className="flex flex-wrap gap-4 text-sm font-bold">
                Total <span className="ml-auto">Rs.{totalPrice}</span>
              </li>
            </ul>

            <div className="mt-6 space-y-3">
              <button
                type="submit"
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
              >
                Checkout
              </button>
              <button
                onClick={() => router.replace("/")}
                type="button"
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
              >
                Continue Shopping
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
