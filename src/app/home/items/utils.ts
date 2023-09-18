
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const handleSelectChangeEvent = (
  e: any,
  onChange: any,
  selectedValue: any
) => {
  // console.log("selectedValue.values().next().value",selectedValue.values().next().value,)
  if (e.target.value === "") {
    onChange(new Set([]));
  } else {
    onChange(new Set([e.target.value]));
  }
};

export const deleteItem = async (pathname: any, itemcode: any) => {

  const response = await fetch(pathname + "/api/items", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemcode }),
  });

  const res = await response.json();
  if (res == "SUCCESS") {
    toast.success("Item deleted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    window.location.href = "/home/products";
  } else {
    toast.error("Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
