import { selectOrder } from "@/store/features/order/orderSlice";
import React from "react";
import { useSelector } from "react-redux";

const Inoce = () => {
  const { products, order, customer, shipping } = useSelector(selectOrder);
  const date = new Date();

  // random number
  const randomNumber = (Math.floor(Math.random() * 1000) + 1).toString();
  return (
    <>
      <div className="mb-6 w-full max-w-full flex-shrink px-4 text-white">
        <div className="rounded-lg bg-zinc-900 p-6 shadow-lg ">
          <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-4 ">
            <div className="flex flex-col">
              <div className="mb-1 text-3xl font-bold">Company Name</div>
              <p className="text-sm">{customer?.address}</p>
            </div>
            <div className="text-4xl font-bold uppercase">Invoice</div>
          </div>
          <div className="flex flex-row justify-between py-3">
            <div className="flex-1">
              <p>
                <strong>Bill to: </strong>
                {customer?.name} {customer?.lastName}, {customer?.address},{" "}
                {customer?.email}, {customer?.phone}
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-2 flex justify-between">
              <div className="flex-1 font-semibold">Invoice ID#:</div>
              <div className="flex-1 ltr:text-right rtl:text-left">
                {" "}
                {randomNumber}
              </div>
            </div>
            <div className="mb-2 flex justify-between">
              <div className="flex-1 font-semibold">Invoice date:</div>
              <div className="flex-1 ltr:text-right rtl:text-left">
                {date.toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="py-4">
            <table className="table-bordered w-full text-white ltr:text-left rtl:text-right">
              <thead className="border-b ">
                <tr className="mb-4 bg-zinc-300 text-slate-800 ">
                  <th>Products</th>
                  <th className="text-center">Qty</th>
                  <th className="text-center">Unit price</th>
                  <th className="text-center">Amount</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="flex flex-row flex-wrap items-center">
                        <div className="mb-1 flex-1 leading-5 ltr:ml-2 rtl:mr-2 ">
                          {product.name}
                        </div>
                      </div>
                    </td>
                    <td className="text-center">{product.quantity}</td>
                    <td className="text-center">{product.price}</td>
                    <td className="text-center">
                      {product.quantity * product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="">
                  <td colSpan={2}></td>
                  <td className="border-t-2 border-white text-center">
                    <b>Sub-Total</b>
                  </td>
                  <td className="border-t-2 border-white text-center">
                    {order?.subTotal}
                  </td>
                </tr>
                {shipping && (
                  <tr>
                    <td colSpan={2}></td>
                    <td className="text-center ">
                      <b>Shipping</b>
                    </td>
                    <td className="text-center">{shipping?.price}</td>
                  </tr>
                )}
                <tr>
                  <td colSpan={2}></td>
                  <td className="text-center">
                    <b>IVA</b>
                  </td>
                  <td className="text-center">{order?.iva}</td>
                </tr>
                <tr className="">
                  <td colSpan={2}></td>
                  <td className="border-y-2 border-l-2 border-neutral-600/50 text-center ">
                    <b>Total</b>
                  </td>
                  <td className="border-y-2 border-r-2 border-neutral-600/50 text-center font-bold">
                    {shipping ? order!.total + shipping.price : order?.total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inoce;
