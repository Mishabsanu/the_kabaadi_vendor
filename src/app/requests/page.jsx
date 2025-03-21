"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Trash2, PlusCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

const categories = [
  { id: "67aa04c4b7ab4c0d133523fa", name: "Plastic" },
  { id: "67aa044db7ab4c0d133523d6", name: "Copper" },
  // { id: "67aa04f7b7ab4c0d1335240c", name: "Iron" },
  { id: "67aa0498b7ab4c0d133523e8", name: "Aluminum" },
  // { id: "67aa0528b7ab4c0d1335241e", name: "Newspaper" },
  { id: "67aa0572b7ab4c0d1335243e", name: "Cloth" },
  { id: "67aa05ec0aba683d73cf66bf", name: "Footwear" },
];

const products = {
  "67aa04c4b7ab4c0d133523fa": [
    {
      id: "67aa0b8e0aba683d73cf6841",
      name: "Plastic Bags",
      pricePerUnit: { kg: 10, piece: 5, ea: 7, case: 50 },
    },
    {
      id: "67aa0bd10aba683d73cf6854",
      name: "Plastic Toys",
      pricePerUnit: { kg: 8, piece: 3, ea: 6, case: 40 },
    },
    {
      id: "67aa0aff0aba683d73cf681b",
      name: "Plastic Chairs",
      pricePerUnit: { kg: 15, piece: 5, ea: 10, case: 60 },
    },
    {
      id: "67aa0aaa0aba683d73cf6808",
      name: "Plastic Bottles",
      pricePerUnit: { kg: 12, piece: 4, ea: 8, case: 55 },
    },
    {
      id: "67aa0b3c0aba683d73cf682e",
      name: "Plastic Containers",
      pricePerUnit: { kg: 9, piece: 4, ea: 7, case: 45 },
    },
  ],
  "67aa044db7ab4c0d133523d6": [
    // {
    //   id: 6,
    //   name: "Copper Wires",
    //   pricePerUnit: { kg: 50, piece: 10, ea: 15, case: 120 },
    // },
    {
      id: "67aa13977e6d1523fdf26e98",
      name: "Copper Pipes",
      pricePerUnit: { kg: 45, piece: 9, ea: 14, case: 110 },
    },
    {
      id: "67aa13977e6d1523fdf26e99",
      name: "Copper Sheets",
      pricePerUnit: { kg: 60, piece: 12, ea: 18, case: 130 },
    },
    {
      id: "67aa13977e6d1523fdf26e9a",
      name: "Copper Scrap",
      pricePerUnit: { kg: 30, piece: 6, ea: 10, case: 80 },
    },
    {
      id: 10,
      name: "Copper Rods",
      pricePerUnit: { kg: 55, piece: 11, ea: 16, case: 125 },
    },
  ],
  // "67aa04f7b7ab4c0d1335240c": [
  //   {
  //     id: 11,
  //     name: "Iron Rods",
  //     pricePerUnit: { kg: 25, piece: 7, ea: 12, case: 90 },
  //   },
  //   {
  //     id: 12,
  //     name: "Cast Iron Scrap",
  //     pricePerUnit: { kg: 22, piece: 6, ea: 10, case: 85 },
  //   },
  //   {
  //     id: 13,
  //     name: "Iron Sheets",
  //     pricePerUnit: { kg: 30, piece: 8, ea: 14, case: 100 },
  //   },
  //   {
  //     id: 14,
  //     name: "Iron Nails & Screws",
  //     pricePerUnit: { kg: 10, piece: 2, ea: 5, case: 40 },
  //   },
  //   {
  //     id: 15,
  //     name: "Rusty Iron Tools",
  //     pricePerUnit: { kg: 15, piece: 3, ea: 6, case: 50 },
  //   },
  // ],
  "67aa0498b7ab4c0d133523e8": [
    // {
    //   id: 16,
    //   name: "Aluminum Cans",
    //   pricePerUnit: { kg: 12, piece: 4, ea: 8, case: 60 },
    // },
    // {
    //   id: 17,
    //   name: "Aluminum Foil",
    //   pricePerUnit: { kg: 9, piece: 3, ea: 6, case: 45 },
    // },
    // {
    //   id: 18,
    //   name: "Aluminum Sheets",
    //   pricePerUnit: { kg: 18, piece: 7, ea: 12, case: 70 },
    // },
    {
      id: "67aa13977e6d1523fdf26eae",
      name: "Aluminum Utensils",
      pricePerUnit: { kg: 14, piece: 4, ea: 9, case: 55 },
    },
    // {
    //   id: 20,
    //   name: "Aluminum Frames",
    //   pricePerUnit: { kg: 22, piece: 5, ea: 10, case: 75 },
    // },
  ],
  // "67aa0528b7ab4c0d1335241e": [
  //   {
  //     id: 21,
  //     name: "Daily Newspapers",
  //     pricePerUnit: { kg: 5, piece: 2, ea: 4, case: 25 },
  //   },
  //   {
  //     id: 22,
  //     name: "Magazine Papers",
  //     pricePerUnit: { kg: 8, piece: 3, ea: 6, case: 35 },
  //   },
  //   {
  //     id: 23,
  //     name: "Office Waste Paper",
  //     pricePerUnit: { kg: 6, piece: 2, ea: 5, case: 30 },
  //   },
  //   {
  //     id: 24,
  //     name: "Carton Boxes",
  //     pricePerUnit: { kg: 12, piece: 5, ea: 9, case: 40 },
  //   },
  //   {
  //     id: 25,
  //     name: "Shredded Papers",
  //     pricePerUnit: { kg: 4, piece: 1, ea: 3, case: 20 },
  //   },
  // ],
  "67aa0572b7ab4c0d1335243e": [
    // {
    //   id: 26,
    //   name: "Used Cotton Shirts",
    //   pricePerUnit: { kg: 10, piece: 3, ea: 5, case: 35 },
    // },
    {
      id: "67aa13977e6d1523fdf26ea7",
      name: "Denim Jeans",
      pricePerUnit: { kg: 12, piece: 4, ea: 6, case: 40 },
    },
    // {
    //   id: 28,
    //   name: "Woolen Sweaters",
    //   pricePerUnit: { kg: 9, piece: 3, ea: 5, case: 30 },
    // },
    // {
    //   id: 29,
    //   name: "Silk Sarees",
    //   pricePerUnit: { kg: 15, piece: 5, ea: 8, case: 45 },
    // },
    // {
    //   id: 30,
    //   name: "Torn Fabric Pieces",
    //   pricePerUnit: { kg: 5, piece: 2, ea: 4, case: 20 },
    // },
  ],
  "67aa05ec0aba683d73cf66bf": [
    {
      id: "67aa13977e6d1523fdf26ea1",
      name: "Used Sneakers",
      pricePerUnit: { kg: 8, piece: 2, ea: 4, case: 25 },
    },
    {
      id: 32,
      name: "Leather Shoes",
      pricePerUnit: { kg: 10, piece: 5, ea: 7, case: 30 },
    },
    {
      id: "67aa13977e6d1523fdf26ea3",
      name: "Rubber Slippers",
      pricePerUnit: { kg: 6, piece: 1, ea: 3, case: 15 },
    },
    {
      id: "67aa13977e6d1523fdf26ea4",
      name: "Sports Shoes",
      pricePerUnit: { kg: 9, piece: 4, ea: 6, case: 35 },
    },
  ],
};

const units = ["kg", "piece", "ea", "case"];

const OrderPage = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth);
  const router = useRouter();
  const [orders, setOrders] = useState([
    {
      id: Date.now(),
      category: "",
      product: "",
      unit: "kg",
      quantity: 1,
      price: 0,
      totalValue: 0,
      user: user?.user?._id,
    },
  ]);

  const handleChange = (id, field, value) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          let updatedOrder = { ...order, [field]: value };

          if (field === "category") {
            updatedOrder.product = "";
            updatedOrder.price = 0;
            updatedOrder.totalValue = 0;
          }

          if (field === "product") {
            const product = products[updatedOrder.category]?.find(
              (p) => p.id == value
            );
            if (product) {
              updatedOrder.price = product.pricePerUnit[updatedOrder.unit] || 0;
              updatedOrder.totalValue =
                updatedOrder.quantity * updatedOrder.price;
            }
          }

          if (field === "unit" && updatedOrder.product) {
            const product = products[updatedOrder.category]?.find(
              (p) => p.id == updatedOrder.product
            );
            updatedOrder.price = product ? product.pricePerUnit[value] || 0 : 0;
            updatedOrder.totalValue =
              updatedOrder.quantity * updatedOrder.price;
          }

          if (field === "quantity") {
            updatedOrder.totalValue =
              updatedOrder.quantity * updatedOrder.price;
          }

          return updatedOrder;
        }
        return order;
      })
    );
  };

  const addOrder = () => {
    setOrders([
      ...orders,
      {
        id: Date.now(),
        category: "",
        product: "",
        unit: "kg",
        quantity: 1,
        price: 0,
        totalValue: 0,
        user: user?.user?._id,
      },
    ]);
  };

  const removeOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log(orders);

    try {
      await axios.post(
        "https://kabadiwale-backend.onrender.com/api/V1/vendor/add-request",
        { orders },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      toast.success("Request sent successfully!");
      router.push(`/under-review`);
    } catch (error) {
      toast.error("Failed to send Request. Please try again.");
      console.error("Error sending Request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen px-6 bg-white">
      <div className="w-full max-w-xl mt-14">
        <button
          onClick={() => router.back()}
          className="text-left text-black text-base mb-6"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-black mb-6">Create Request</h1>

        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 mb-4 rounded-lg border border-gray-300"
          >
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              className="p-2 border border-gray-400 rounded bg-white w-full mb-2"
              value={order.category}
              onChange={(e) =>
                handleChange(order.id, "category", e.target.value)
              }
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-700">
              Product
            </label>
            <select
              className="p-2 border border-gray-400 rounded bg-white w-full mb-2"
              value={order.product}
              onChange={(e) =>
                handleChange(order.id, "product", e.target.value)
              }
              disabled={!order.category}
            >
              <option value="">Select Product</option>
              {products[order.category]?.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name}
                </option>
              ))}
            </select>

            <div className="flex space-x-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Unit
                </label>
                <select
                  className="p-2 border border-gray-400 rounded bg-white w-full"
                  value={order.unit}
                  onChange={(e) =>
                    handleChange(order.id, "unit", e.target.value)
                  }
                  disabled={!order.product}
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  className="p-2 border border-gray-400 rounded bg-white w-full"
                  value={order.quantity}
                  onChange={(e) =>
                    handleChange(
                      order.id,
                      "quantity",
                      parseFloat(e.target.value) || 1
                    )
                  }
                  disabled={!order.product}
                />
              </div>
            </div>

            <div className="flex space-x-2 mt-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Rate per UOM
                </label>
                <input
                  type="text"
                  className="p-2 border border-gray-400 rounded bg-gray-200 w-full"
                  value={`₹ ${order.price}`}
                  readOnly
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Total Value
                </label>
                <input
                  type="text"
                  className="p-2 border border-gray-400 rounded bg-gray-200 w-full"
                  value={`₹ ${order.totalValue}`}
                  readOnly
                />
              </div>
            </div>

            <button
              className="mt-2 text-red-600 hover:text-red-800"
              onClick={() => removeOrder(order.id)}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <button
            onClick={addOrder}
            className="w-full bg-[#8B008B] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#6A006A] flex items-center justify-center"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
          <button
            onClick={handleSubmit}
            className="w-full bg-[#8B008B] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#6A006A] ml-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
