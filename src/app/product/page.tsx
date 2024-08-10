"use client";
import { getAllProducts } from "@/APIS/apis";
import ProductDescriptionSkeleton from "@/components/Skeleton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { overFlow } from "@/ReusableFunction/Overflow";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { addToCart, addToFavourite } from "../store/cartSlice";

import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import Login from "../login/page";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";

export default function Product() {
  const dispatch = useDispatch();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useQuery(
    ["products"],
    async () => await getAllProducts()
  );

  useEffect(() => {
    // Check authentication status from session storage
    isAuthenticated === true;
    setShowLoginDialog(!isAuthenticated);
  }, [isAuthenticated]);

  if (isLoading) {
    return <ProductDescriptionSkeleton />;
  }

  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to add items to your cart", {
        position: "top-right",
      });
      setShowLoginDialog(true);
      return;
    }

    dispatch(addToCart(product));
  };

  const handleAddToFavourite = (product: any) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to add in your favourites", {
        position: "top-right",
      });
      setShowLoginDialog(true);
      return;
    }

    dispatch(addToFavourite(product));
  };

  return (
    <div className="pt-5 container mx-auto">
      <div className="sm:grid md:grid-cols-2 xl:grid-cols-4 gap-4 flex flex-wrap items-center justify-center">
        {data?.products?.map((product: any) => (
          <Card
            key={product?.id}
            className="max-w-80 sm:max-w-64 transform transition-transform duration-200 hover:scale-100 hover:shadow-lg cursor-pointer"
          >
            <Link href={`/product/${product?.id}`}>
              <Image
                src={product.image}
                alt="Product Image"
                width={300}
                height={500}
                className="max-w-72 sm:max-w-52 w-full h-48 object-contain p-3"
              />
            </Link>
            <CardHeader className="p-2">
              <CardDescription className="text-xs font-light  ">
                {overFlow(product.description, 60)}
              </CardDescription>
              <div className="flex justify-between text-muted-foreground items-center ">
                <div className=" flex flex-col">
                  <span className="text-lg text-[#f57224]">
                    Rs.{product.price}
                  </span>
                  <span className="text-[10px] font-light text-slate">
                    38% Off
                  </span>
                </div>

                <Heart onClick={() => handleAddToFavourite(product)} />
              </div>
            </CardHeader>

            <CardFooter className="p-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full py-2 bg-[#f57224] text-white font-bold rounded hover:bg-[#e05a1c]"
              >
                Add to Cart
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Dialog for login */}
      <Dialog
        open={showLoginDialog}
        onOpenChange={(open) => setShowLoginDialog(open)}
      >
        <div className="flex items-center justify-center min-h-screen">
          <DialogContent className="w-[80%] max-w-[425px] sm:max-w-[80%]">
            <DialogHeader>
              <DialogTitle>Sign in</DialogTitle>
              <DialogDescription>
                Please sign in to access your account and continue.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Login />
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
