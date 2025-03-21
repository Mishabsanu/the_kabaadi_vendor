"use client";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

export default function WeeklyRoutes() {
  const router = useRouter();
  const [vendorList, setVendorList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://kabadiwale-backend.onrender.com/api/V1/vendor/list-request-by-vendor"
        );
        setVendorList(response.data.result || []);
      } catch (error) {
        toast.error("Failed to fetch vendor list.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex flex-col items-center p-6">
      <Head>
        <title>Weekly Routes</title>
      </Head>

      {/* Header */}
      <div className="bg-[#8B008B] text-white w-full max-w-2xl flex items-center px-5 py-4 rounded-xl shadow-lg">
        <button
          onClick={() => router.push("/under-review")}
          className="text-white hover:opacity-80 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="mx-auto text-lg font-bold">My Request</h1>
      </div>

      {/* Vendor List */}
      <div className="mt-6 space-y-5 w-full max-w-2xl">
        {vendorList.map((vendor) => (
          <div
            key={vendor?._id}
            className="p-6 rounded-xl shadow-lg transition transform hover:scale-105 backdrop-blur-lg bg-white text-gray-800 border border-gray-300"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                {vendor?.product?.product_name}
              </span>
              <span
                className={`font-medium ${
                  vendor?.status === "pending"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {vendor?.status?.charAt(0)?.toUpperCase() +
                  vendor?.status?.slice(1)}
              </span>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>
                <strong>Category:</strong> {vendor?.category.category_name}
              </p>
              <p>
                <strong>Unit:</strong> {vendor?.unit}
              </p>

              <p>
                <strong>Quantity:</strong> {vendor?.quantity}
              </p>

              <p>
                <strong>Price:</strong> {vendor?.price}
              </p>
              <p>
                <strong>Total Value:</strong> {vendor?.totalValue}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
