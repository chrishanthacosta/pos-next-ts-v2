"use client";

import { toast } from "react-toastify";
import { deleteItem } from "@/app/home/items/utils";
import { fetchSelItemDataForEdit } from "@/store/items/utils";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { MdOutlineEditNote } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

export const ItemTable = ({ itemRowObjects }: { itemRowObjects: any[] }) => {
  let pathname: string = "";

  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const dispatch = useDispatch();
  const router = useRouter();

  const tableHeads = [
    "#",
    "",
    "",
    "Code",
    "Extra code",
    "Name",
    "Category",
    "Subcategory",
    "Brand",
    "Sales price",
    "Cost",
    "Markup",
    "Current stock",
    "Stock limit",
    "Unit",
    "Net weight",
    "Gross weight",
    "Location",
  ];

  const editItem = async (itemcode: any) => {
    dispatch(fetchSelItemDataForEdit({ apiUrl: pathname, itemcode }));
    router.push("/home/items");
  };

  const handleDelete = async (itemcode: any) => {
    // Display a toast notification with a confirmation message.
    toast.warning("Are you sure you want to delete this item?", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false, // This ensures the notification doesn't auto-close
      closeOnClick: false, // This prevents the notification from closing when clicked
      closeButton: (
        <div>
          <Button
            color="default"
            onClick={() => confirmDelete(itemcode)}
            className="mb-1"
          >
            Yes
          </Button>
          <Button
            color="danger"
            onClick={() => {
              toast.dismiss();
            }}
          >
            No
          </Button>
        </div>
      ),
    });
  };

  const confirmDelete = async (itemcode: any) => {
    await deleteItem(pathname, itemcode);
    toast.dismiss();
    // router.push("/home/products");
  };
  return (
    <div className="md:px-2 py-2 w-fit">
      <div className="shadow overflow-y-scroll rounded border-b border-gray-200 w-full">
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            {tableHeads.map((head) => (
              <TableColumn key={head}>{head}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {itemRowObjects?.map((tableRow: any, index: number) => (
              <TableRow key={tableRow.itemcode} className="bg-purple-gray-300">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Button
                    isIconOnly
                    color="warning"
                    variant="faded"
                    aria-label="Create Item"
                  >
                    <MdOutlineEditNote
                      onClick={() => editItem(tableRow.itemcode)}
                      className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
                    />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    isIconOnly
                    color="warning"
                    variant="faded"
                    aria-label="Create Item"
                  >
                    <RiDeleteBin5Line
                      onClick={() => handleDelete(tableRow.itemcode)}
                      className="inline-block h-6 w-6 text-red-700 hover:text-indigo-500 cursor-pointer"
                    />
                  </Button>
                </TableCell>
                <TableCell>
                  {tableRow.itemcode.toString().padStart(5, "0")}
                </TableCell>
                <TableCell>{tableRow.extraitemcode}</TableCell>
                <TableCell>{tableRow.itemname}</TableCell>
                <TableCell>{tableRow.categoryname}</TableCell>
                <TableCell>{tableRow.subcategoryname ?? "-"}</TableCell>
                <TableCell>{tableRow.brandname}</TableCell>
                <TableCell>{tableRow.salesprice}</TableCell>
                <TableCell>{tableRow.cost}</TableCell>
                <TableCell>{tableRow.markup}</TableCell>
                <TableCell>{tableRow.currentstock}</TableCell>
                <TableCell>{tableRow.stocklimit}</TableCell>
                <TableCell>{tableRow.unit}</TableCell>
                <TableCell>{tableRow.netweight}</TableCell>
                <TableCell>{tableRow.grossweight}</TableCell>
                <TableCell>{tableRow.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
