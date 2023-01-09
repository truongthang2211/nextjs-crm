import { Inter } from "@next/font/google";
import { Button, InputNumber } from "antd";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [dealID, setDealID] = useState();
  const [data, setData] = useState<String | null>("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    var opts = {
      method: "GET",
    };
    try {
      setIsLoading(true);
      let data = await (
        await fetch(
          `https://nestjs-crm.vercel.app/giaohangnhanh/shipmentCreate/${dealID}`,
          opts
        )
      ).json();
      console.log(data);

      setData(data.code === 200 ? "Thành công" : data.message);
    } catch (error) {
      setData(null);
      setIsLoading(false);

      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="p-5 flex justify-center flex-col items-center min-w-max min-h-screen bg-slate-200">
        <div className="shadow-lg bg-white p-4 text-gray-800 rounded-2xl overflow-hidden text-clip">
          <h1 className="font-bold">Kết quả</h1>
          <p className="max-h-[200px] min-w-[350px] max-w-[350px]">
            {data ?? "Có lỗi xảy ra"}
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="shadow-lg bg-white p-4 text-gray-800 rounded-2xl mt-3"
        >
          <h1 className="font-bold">Lên đơn ship</h1>
          <p className="text-sm">
            Nhập Deal ID để thực hiện lên đơn vận chuyển từ bitrix24
          </p>
          <div className="mt-2">
            <label
              htmlFor="DealID"
              className="block text-sm font-medium text-gray-700"
            >
              Deal ID
            </label>
            <InputNumber
              value={dealID}
              onChange={(e: any) => setDealID(e)}
              required
              type="text"
              id="DealID"
              className="mt-1 block w-full rounded-md border-gray-400 border p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none"
            />
          </div>
          <span></span>
          <div className="mt-2">
            <Button
              loading={isLoading}
              disabled={!dealID}
              className="bg-indigo-500 w-full text-white py-2 h-auto"
              htmlType="submit"
            >
              Lên đơn
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
