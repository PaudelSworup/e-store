"use client";
import { signIn } from "@/APIS/apis";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/userSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image component

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const mutation = useMutation<any, any, any>({
    mutationFn: (payload) => signIn(payload),
    onSuccess: (res) => {
      if (res.success === false) {
        toast.error(res?.error, { position: "top-right" });
        return;
      }

      dispatch(
        loginSuccess({
          token: res.token,
          userInfo: res.user,
        })
      );

      setFormData({
        email: "",
        password: "",
      });

      toast.success("Login Success", { position: "top-center" });

      router.push("/");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    mutation.mutate(data);
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">
                  Sign in
                </h3>
                <p className="text-sm mt-4 text-gray-800">
                  Don&apos;t have an account
                  <Link href="">
                    <span className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                      {" "}
                      Register here
                    </span>
                  </Link>
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-xs block mb-2">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    onChange={handleInputChange}
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter email"
                  />
                  <Mail className="w-4 h-4 text-gray-600 absolute right-4" />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    onChange={handleInputChange}
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                  <Lock className="w-4 h-4 text-gray-600 absolute right-4" />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <Link href="">
                    <span className="text-blue-600 font-semibold text-sm hover:underline">
                      Forgot Password?
                    </span>{" "}
                  </Link>
                </div>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
            <Image
              src="https://readymadeui.com/signin-image.webp"
              className="w-full h-full object-contain"
              alt="Login image"
              width={500} // Add width and height for optimization
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
