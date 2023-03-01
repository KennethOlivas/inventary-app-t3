import { api } from "@/utils/api";
import type { Product } from "@prisma/client";
import type { FC} from "react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrder,
  addProduct,
  deleteProduct,
  selectOrder,
  updateQuantity,
} from "@/store/features/order/orderSlice";

interface NewProduct extends Product {
  quantity: number;
}

const AddProductStep: FC = () => {
  const dispatch = useDispatch();
  const { order, products } = useSelector(selectOrder);

  const [search, setSearch] = useState<string>("");
  const { data, isLoading } = api.product.getProductsByName.useQuery({
    name: search,
  });

  const handleAddProduct = (product: Product) => {
    if (products?.find((p) => p.id === product.id)) {
      return;
    }
    dispatch(
      addProduct({
        ...product,
        quantity: 1,
      })
    );
    setSearch("");
  };

  const hadleRemoveProduct = (id: string) => {
    dispatch(
      deleteProduct({
        id,
      })
    );
  };

  const onChangeStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateQuantity({
        id: e.target.id,
        quantity: Number(e.target.value),
      })
    );
  };

  useEffect(() => {
    if (!products) return;
    const subTotal = products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    dispatch(
      addOrder({
        subTotal,
        iva: subTotal * 0.16,
        total: subTotal * 1.16,
        shipping: false,
        status: "PENDING",
      })
    );
  }, [products]);

  return (
    <div className="mt-8 mb-24">
      <div>
        <input
          type="text"
          placeholder="Search product"
          className="w-full rounded-lg border-2 border-gray-300 bg-transparent p-3 pl-4 text-gray-400 outline-none transition-all duration-150 focus:border-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isLoading ? (
          <div className="mt-24 flex items-center justify-center">
            loading...
          </div>
        ) : (
          <>
            {data?.map((product) => (
              <motion.div
                initial={{ x: 10 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleAddProduct(product)}
                key={product.id}
                className="mt-4 flex w-full cursor-pointer items-center justify-between rounded-lg p-2 pl-3 text-gray-400 transition-all duration-150 hover:bg-indigo-500 hover:text-white"
              >
                <div className="flex flex-col">
                  <div className="text-base font-bold">{product.name}</div>
                  <span className="mr-2 text-sm font-semibold">
                    Stock: {product.stock}
                  </span>
                  <span className="mr-2 text-sm">
                    description: {product.description}
                  </span>
                </div>
                <span className="mr-2 text-xl">${product.price}</span>
              </motion.div>
            ))}
          </>
        )}

        {products && products.length > 0 && (
          <div className=" py-6 sm:py-8 lg:py-12">
            <div className="mx-auto ">
              <div className="mb-6 sm:mb-10 lg:mb-16">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-50 md:mb-6 lg:text-3xl">
                  Your Cart
                </h2>
              </div>
              {products.map((product) => (
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleAddProduct(product)}
                  key={product.id}
                  className="mt-4 flex w-full items-center justify-between rounded-lg p-2 pl-3 text-gray-400 transition-all duration-150 hover:text-white"
                >
                  <div className="flex flex-col">
                    <div className="text-base font-bold">{product.name}</div>
                    <span className="mr-2 text-sm font-semibold">
                      Stock: {product.stock}
                    </span>
                    <span className="mr-2 text-sm">
                      description: {product.description}
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex flex-col items-start space-y-2">
                      <input
                        id={product.id}
                        onChange={onChangeStock}
                        type="number"
                        max={product.stock}
                        min={1}
                        value={product.quantity}
                        className="rounded-lg border-2 bg-transparent px-2 py-2 outline-none transition duration-100"
                      />
                      <button
                        onClick={() => {
                          hadleRemoveProduct(product.id);
                        }}
                        className="ml-2 text-gray-400 transition-all duration-150 hover:text-white hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                    <span className="mr-2 text-xl">${product.price}</span>
                  </div>
                </motion.div>
              ))}
              <div className="mt-4 flex flex-col items-end gap-4">
                <div className="w-full rounded-lg  p-4 sm:max-w-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between gap-4 text-gray-50">
                      <span>Subtotal</span>
                      <span>{order?.subTotal}</span>
                    </div>

                    <div className="flex justify-between gap-4 text-gray-50">
                      <span>IVA</span>
                      <span>{order?.iva}</span>
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <div className="flex items-start justify-between gap-4 text-gray-100">
                      <span className="text-lg font-bold">Total</span>

                      <span className="flex flex-col items-end">
                        <span className="text-lg font-bold">
                          {order?.total}
                        </span>
                        <span className="text-sm text-gray-300">
                          including IVA
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductStep;
