"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import { getProductById } from "@/APIS/apis";
import { overFlow } from "@/ReusableFunction/Overflow";

const description =
  "Men Cotton Hoodies Sleeveless Muscle Gym Sport Slim Vest Bodybuilding Hooded Hip Hop Streetwear Workout T-shirt";

export default function ProductDescription({
  params,
}: {
  params: { productId: string };
}) {
  const { data, isError, isLoading } = useQuery(
    ["productid"],
    async () => await getProductById(params.productId)
  );

  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const magnifierRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverPosition({ x, y });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleAddToCart = () => {
    // Here you can implement the logic to add the item to the cart,
    // either by updating state, dispatching a Redux action, etc.
  };

  return (
    <div className="pt-5 container mx-auto px-4">
      <Card className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-5 bg-slate-100/70">
        <div className="relative flex flex-col items-start justify-evenly rounded-lg lg:w-1/2 w-full">
          <div
            className="relative flex justify-center items-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={data?.products?.image}
              alt="Product Image"
              width={600}
              height={800}
              className="w-full h-[300px] object-contain  lg:h-[400px] mix-blend-multiply p-4"
            />

            {isHovering && (
              <div
                ref={magnifierRef}
                className="absolute border-2 border-gray-300"
                style={{
                  width: "50px",
                  height: "50px",
                  top: `${hoverPosition.y - 50}px`,
                  left: `${hoverPosition.x - 50}px`,
                  backgroundImage: `url(${data?.products.image})`,
                  backgroundPositionX: `${-hoverPosition.x * 2}px`,
                  backgroundPositionY: `${-hoverPosition.y * 2}px`,
                  backgroundSize: "1200px 1600px", // Double the size of original image
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
          {isHovering && (
            <div
              className="absolute z-50 top-0 left-full hidden lg:block w-[600px] h-full border border-gray-300 ml-8"
              style={{
                backgroundImage: `url(${data?.products?.image})`,
                backgroundPositionX: -hoverPosition.x * 2.2 + "px",
                backgroundPositionY: -hoverPosition.y * 2.2 + "px",
                backgroundSize: "1200px 1600px", // Double the size of original image
              }}
            />
          )}
        </div>
        <CardHeader className="p-4 flex-1 space-y-4 relative lg:w-1/2 w-full">
          <CardDescription className="text-lg font-normal text-black tracking-wider">
            {overFlow(data?.products.description, 100)}
            {/* {} */}
          </CardDescription>

          <hr />

          <div className="container mx-auto space-y-4">
            <span className="text-2xl text-[#f57224]">
              {data?.products.price}
            </span>
            <div className="flex justify-between gap-4 items-center">
              <CardDescription>Color Options</CardDescription>
              <div className="flex gap-3">
                <Button
                  size="icon"
                  className="rounded-full bg-red-600 hover:bg-red-600"
                />
                <Button
                  size="icon"
                  className="rounded-full bg-black hover:bg-black"
                />
                <Button
                  size="icon"
                  className="rounded-full bg-white hover:bg-white"
                />
              </div>
            </div>
            <div className="flex justify-between gap-4 items-center">
              <CardDescription>Size</CardDescription>
              <div className="flex gap-3">
                <Button
                  size="icon"
                  className="border rounded-lg bg-white text-black hover:bg-white"
                >
                  M
                </Button>
                <Button
                  size="icon"
                  className="border rounded-lg bg-white text-black hover:bg-white"
                >
                  L
                </Button>
                <Button
                  size="icon"
                  className="border rounded-lg bg-white text-black hover:bg-white"
                >
                  XL
                </Button>
              </div>
            </div>

            <div className="flex justify-between gap-4 items-center">
              <CardDescription>Quantity</CardDescription>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                  size="icon"
                  className="border rounded-lg text-lg bg-white text-black hover:bg-white"
                >
                  -
                </Button>
                <Button
                  size="icon"
                  className="border rounded-lg bg-white text-black hover:bg-white"
                >
                  {quantity}
                </Button>
                <Button
                  size="icon"
                  className="border rounded-lg text-lg bg-white text-black hover:bg-white"
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex justify-center gap-4 items-center">
              <Button
                className="w-full bg-[#f57224] hover:bg-[#f57224] text-white"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
