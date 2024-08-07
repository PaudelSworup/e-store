"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import { clearCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";

export default function CheckoutPage() {
  const { hashData, uuid } = useAppSelector((state) => state.hash);
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const shipping = searchParams.get("shipping");

    const phone = searchParams.get("phone");
    const totalPrice = searchParams.get("totalPrice");
    const city = searchParams.get("city");
    const zip = searchParams.get("zip");
    // const shippingAddress =
    const items = searchParams.get("items");

    setOrderDetails({
      shipping,
      city,
      zip,
      phone,
      totalPrice,
      items: items ? JSON.parse(items) : [],
    });
  }, [searchParams]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const makePayment = () => {
    const form = document.createElement("form");
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    form.method = "POST";
    form.target = "_blank";

    const fields = {
      amount: orderDetails.totalPrice,
      tax_amount: "0",
      total_amount: orderDetails.totalPrice,
      transaction_uuid: uuid, // Replace with your transaction UUID
      product_code: "EPAYTEST",
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: "http://localhost:3030/api/complete-payment",
      failure_url: "https://developer.esewa.com.np/failure",
      signed_field_names: hashData?.signed_field_names,
      signature: hashData?.signature, // Replace with your actual signature
      secret: "8gBm/:&EnhH.1/q", // Replace with your actual secret key
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    dispatch(clearCart());
    // form.remove();
  };

  return (
    // <div>
    //   <h1>Checkout Page</h1>
    //   <p>Name: {orderDetails.name}</p>
    //   <p>Email: {orderDetails.email}</p>
    //   <p>Phone: {orderDetails.phone}</p>
    //   <p>Total Price: {orderDetails.totalPrice}</p>
    //   <h2>Items:</h2>
    //   <ul>
    //     {orderDetails.items.map((item: any) => (
    //       <li key={item.id}>
    //         {item.title} - Quantity: {item.quantity}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {orderDetails?.items?.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col rounded-lg bg-white sm:flex-row"
              >
                <Image
                  className="m-2 h-24 w-28 rounded-md border object-contain object-center"
                  src={item.image}
                  width={300}
                  height={300}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item?.title}</span>
                  <span className="float-right text-gray-400">
                    quantity-{item.quantity}
                  </span>
                  <p className="text-lg font-bold">{item?.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Your Details</p>
          <p className="text-gray-400">
            Complete your order by providing your details.
          </p>
          <div>
            <label
              htmlFor="shipping adddress"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Shipping
            </label>
            <div>
              <input
                type="text"
                id="shipping"
                name="shipping"
                disabled
                value={orderDetails?.shipping}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="john doe"
              />
            </div>
            <label
              htmlFor="city"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              city
            </label>
            <div>
              <input
                type="text"
                id="city"
                name="city"
                disabled
                value={orderDetails?.city}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="city"
              />
            </div>
            <label
              htmlFor="zip"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              zip
            </label>
            <div>
              <input
                type="number"
                id="zip"
                name="zip"
                disabled
                value={orderDetails?.zip}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="city"
              />
            </div>

            <label
              htmlFor="phone"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              phone
            </label>
            <div>
              <input
                type="number"
                id="phone"
                name="phone"
                disabled
                value={orderDetails?.phone}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="city"
              />
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  Rs.{orderDetails.totalPrice}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {" "}
                Rs.{orderDetails.totalPrice}
              </p>
            </div>
          </div>

          <button
            onClick={makePayment}
            className="mt-4 mb-8 w-full rounded-md bg-[#60bb46] hover:bg-[#51a538]  px-6 py-3 font-medium text-white"
          >
            Pay with Esewa
          </button>
        </div>
      </div>
    </>
  );
}
