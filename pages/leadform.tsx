import { Button } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";

export type Contact = {
  name: string;
  email: string;
  phone: string;
  comment: string;
};
const BITRIX_URL_CONTACT =
  "https://b24-nu8yl7.bitrix24.vn/rest/1/vdqs6wk155951ycg";
const BITRIX_URL_DEAL =
  "https://b24-nu8yl7.bitrix24.vn/rest/1/wta91h8u5lyt6rcr";

function LeadForm() {
  const [contact, setContact] = useState<Contact>({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await (
        await fetch(
          `${BITRIX_URL_CONTACT}/crm.contact.add.json?fields[NAME]=${contact.name}&fields[PHONE][0][VALUE]=${contact.phone}&fields[EMAIL][0][VALUE]=${contact.email}`
        )
      ).json();
      console.log(data);

      if (data.result) {
        const data2 = await (
          await fetch(
            `${BITRIX_URL_DEAL}/crm.deal.add.json?fields[TITLE]=${contact.name}&fields[STAGE_ID]=NEW&fields[CONTACT_ID]=${data.result}&fields[COMMENTS]=${contact.comment}&fields[SOURCE_DESCRIPTION]=LEAD-FORM-WEB`
          )
        ).json();
        console.log(data2);
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      setContact({
        name: "",
        email: "",
        phone: "",
        comment: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };
  return (
    <div className="p-5 flex justify-center flex-col items-center min-w-max min-h-screen bg-slate-200 ">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg bg-white p-4 text-gray-800 rounded-2xl mt-3 w-[400px]"
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Họ tên
          </label>
          <input
            value={contact.name}
            onChange={(e) =>
              setContact((pre) => {
                return { ...pre, name: e.target.value };
              })
            }
            type="text"
            name="name"
            id="name"
            placeholder="Họ tên"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Email
          </label>
          <input
            value={contact.email}
            onChange={(e) =>
              setContact((pre) => {
                return { ...pre, email: e.target.value };
              })
            }
            type="email"
            name="email"
            id="email"
            placeholder="example@domain.com"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Số điện thoại
          </label>
          <input
            value={contact.phone}
            onChange={(e) =>
              setContact((pre) => {
                return { ...pre, phone: e.target.value };
              })
            }
            type="number"
            name="phone"
            id="phone"
            placeholder="0123456789"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="message"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Bình luận
          </label>
          <textarea
            value={contact.comment}
            onChange={(e) =>
              setContact((pre) => {
                return { ...pre, comment: e.target.value };
              })
            }
            rows={4}
            name="message"
            id="message"
            placeholder="Rất xinh đẹp, rất tuyệt vời"
            className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          ></textarea>
        </div>
        <div>
          <Button
            htmlType="submit"
            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none h-auto"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LeadForm;
