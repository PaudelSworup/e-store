import Image from "next/image";

export default function SuccessPage() {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-md shadow-md text-center flex flex-col items-center">
        <div className="mb-4">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWN-SLzk5eeEuA9zBJKzsM0qbvtLsKDfJ-w&s" // Ensure you have this image in your public folder or change the path
            alt="Success"
            width={100}
            height={100}
            className="w-28 h-28 rounded-full"
          />
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700">
          Your payment has been received and your order has been successfully placed.
        </p>
      </div>
    </div>
  );
}
