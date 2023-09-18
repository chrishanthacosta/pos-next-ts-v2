"use client";
import Image from "next/image";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { useEffect, useState, useRef } from "react";
import InlineTextInputField from "@/app/components/input-fields/inline-text-input-fields";
import Label from "@/app/components/input-fields/label";
import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import {
  BsFillExclamationOctagonFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { AiFillEdit, AiFillCopy, AiFillSave } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { GiCancel } from "react-icons/gi";
import AddnewPopup from "@/app/components/baseinfoaddnew-popup/addnew-popup";
import { useDispatch, useSelector } from "react-redux";
import { inputFieldValidation } from "@/app/utils/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NextTextInputField from "@/app/components/nextui-input-fields/next-text-input-fields";
import NextSelectInputField from "@/app/components/nextui-input-fields/next-select-input-fields";
import { deleteItem, handleSelectChangeEvent } from "./utils";
import BaseinfoAddnewPopup from "@/app/components/baseinfoaddnew-popup/addnew-popup";
import {
  fetchBrandData,
  fetchCategoryData,
  fetchSubcatgoryData,
  fetchUnitData,
} from "@/store/items/utils";
import { PriceComponent } from "@/app/components/items/price-add-comp";
import NextTextReadOnlyInputField from "@/app/components/nextui-input-fields/next-text-readonly-input-fields";
import NextTextRequiredInputField from "@/app/components/nextui-input-fields/next-text-required-input-fields";
import NextSelectRequiredInputField from "@/app/components/nextui-input-fields/next-select-required-input-fields";
import NextAutoFocusTextInputField from "@/app/components/nextui-input-fields/next-autofocus-text-input-fields";

export default function Item() {
  const router = useRouter();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  //get pathname
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

  //optionvalues
  const categoryOptionValues = useSelector(
    (state: any) => state.itemReducer.categoryOptionValues
  );

  const brandOptionValues = useSelector(
    (state: any) => state.itemReducer.brandOptionValues
  );

  const unitOptionValues = useSelector(
    (state: any) => state.itemReducer.unitOptionValues
  );

  const subCategoryOptionValues = useSelector(
    (state: any) => state.itemReducer.subCategoryOptionValues
  );

  const curBaseinfoId = useSelector(
    (state: any) => state.baseinfoReducer.curBaseinfoId
  );

  const curBaseinfoType = useSelector(
    (state: any) => state.baseinfoReducer.curBaseinfoType
  );

  const isBaseinfoUpdated = useSelector(
    (state: any) => state.baseinfoReducer.isBaseinfoUpdated
  );

  const selItemForEdit = useSelector(
    (state: any) => state.itemReducer.selItemForEdit
  );

  const tmpSelItemForEdit = selItemForEdit[0];
  const [itemcode, setItemcode] = useState(
    tmpSelItemForEdit?.itemcode.toString().padStart(5, "0") ?? ""
  );
  const [extraitemcode, setExtraitemcode] = useState(
    tmpSelItemForEdit?.extraitemcode ?? ""
  );
  const [barcode, setBarcode] = useState(tmpSelItemForEdit?.barcode ?? "");
  const [itemname, setItemname] = useState(tmpSelItemForEdit?.itemname ?? "");
  const [category, setCategory] = useState(
    (tmpSelItemForEdit?.category
      ? new Set([tmpSelItemForEdit?.category.toString()])
      : new Set([])) ?? new Set([])
  );
  const [subcategory, setSubcategory] = useState(
    tmpSelItemForEdit?.subcategory
      ? new Set([tmpSelItemForEdit?.subcategory.toString()])
      : new Set([])
  );
  const [brand, setBrand] = useState(
    tmpSelItemForEdit?.brand
      ? new Set([tmpSelItemForEdit?.brand.toString()])
      : new Set([])
  );
  const [cost, setCost] = useState(tmpSelItemForEdit?.cost ?? "");
  const [stockcontrol, setStockcontrol] = useState(
    tmpSelItemForEdit?.stockcontrol ?? false
  );
  const [currentstock, setCurrentstock] = useState(
    tmpSelItemForEdit?.currentstock ?? ""
  );
  const [stocklimit, setStocklimit] = useState(
    tmpSelItemForEdit?.stocklimit ?? ""
  );
  const [unit, setUnit] = useState(
    tmpSelItemForEdit?.unit
      ? new Set([tmpSelItemForEdit?.unit.toString()])
      : new Set([])
  );
  const [netweight, setNetweight] = useState(
    tmpSelItemForEdit?.netweight ?? ""
  );
  const [grossweight, setGrossweight] = useState(
    tmpSelItemForEdit?.grossweight ?? ""
  );
  const [location, setLocation] = useState(tmpSelItemForEdit?.location ?? "");

  //retail price
  const [retailsalesprice, setRetailsalesprice] = useState(
    tmpSelItemForEdit?.retailsalesprice ?? ""
  );
  const [retailautosalesprice, setRetailautosalesprice] = useState(
    tmpSelItemForEdit?.retailautosalesprice ?? false
  );
  const [retailmarkup, setRetailmarkup] = useState(
    tmpSelItemForEdit?.retailmarkup ?? ""
  );
  const [retailpricechange, setRetailpricechange] = useState(
    tmpSelItemForEdit?.retailpricechange ?? true
  );

  //smallwhole price
  const [smallwholesalesprice, setSmallwholesalesprice] = useState(
    tmpSelItemForEdit?.smallwholesalesprice ?? ""
  );
  const [smallwholeautosalesprice, setSmallwholeautosalesprice] = useState(
    tmpSelItemForEdit?.smallwholeautosalesprice ?? false
  );
  const [smallwholemarkup, setSmallwholemarkup] = useState(
    tmpSelItemForEdit?.smallwholemarkup ?? ""
  );
  const [smallwholepricechange, setSmallwholepricechange] = useState(
    tmpSelItemForEdit?.smallwholepricechange ?? true
  );

  //largewhole price
  const [largewholesalesprice, setLargewholesalesprice] = useState(
    tmpSelItemForEdit?.largewholesalesprice ?? ""
  );
  const [largewholeautosalesprice, setLargewholeautosalesprice] = useState(
    tmpSelItemForEdit?.largewholeautosalesprice ?? false
  );
  const [largewholemarkup, setLargewholemarkup] = useState(
    tmpSelItemForEdit?.largewholemarkup ?? ""
  );
  const [largewholepricechange, setLargewholepricechange] = useState(
    tmpSelItemForEdit?.largewholepricechange ?? true
  );

  useEffect(() => {
    dispatch(fetchCategoryData(pathname));
    dispatch(fetchBrandData(pathname));
    dispatch(fetchUnitData(pathname));
  }, []);

  useEffect(() => {
    switch (curBaseinfoType) {
      case "Category":
        dispatch(fetchCategoryData(pathname));
        setCategory(new Set([curBaseinfoId.toString()]));
        break;
      case "Brand":
        dispatch(fetchBrandData(pathname));
        setBrand(new Set([curBaseinfoId.toString()]));
        break;
      case "Unit":
        dispatch(fetchUnitData(pathname));
        setUnit(new Set([curBaseinfoId.toString()]));
        break;
      case "Subcategory":
        dispatch(fetchSubcatgoryData({ apiUrl: pathname, category }));
        setSubcategory(new Set([curBaseinfoId.toString()]));
        break;
      default:
        "";
    }
  }, [isBaseinfoUpdated]);

  useEffect(() => {
    if (category.values().next().value) {
      dispatch(fetchSubcatgoryData({ apiUrl: pathname, category }));
    } else {
      const cat = new Set(["0"]);
      dispatch(fetchSubcatgoryData({ apiUrl: pathname, category: cat }));
    }
  }, [category]);

  const saveButtonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (itemcode) {
      updateItem();
    } else {
      saveItem();
    }
    // dispatch(updatebaseinfo());
  };

  useEffect(() => {
    // Focus on the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const saveItem = async () => {
    const Category = category.values().next().value;
    const Brand = brand.values().next().value;
    const Unit = unit.values().next().value;
    const validation = inputFieldValidation({
      itemname,
      Category,
      Brand,
      cost,
      Unit,
      retailsalesprice,
    });
    if (validation == 0) {
      console.log("subcategory", subcategory);
      const response = await fetch(pathname + "/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          extraitemcode,
          barcode,
          itemname,
          category: category.values().next().value,
          subcategory: subcategory.values().next().value,
          brand: brand.values().next().value,
          retailsalesprice,
          retailautosalesprice,
          retailpricechange,
          retailmarkup,
          smallwholesalesprice,
          smallwholeautosalesprice,
          smallwholepricechange,
          smallwholemarkup,
          largewholesalesprice,
          largewholeautosalesprice,
          largewholepricechange,
          largewholemarkup,
          cost,
          stockcontrol,
          currentstock,
          stocklimit,
          unit: unit.values().next().value,
          netweight,
          grossweight,
          location,
        }),
      });
      const res = await response.json();
      if (res == "SUCCESS") {
        toast.success(`Item created successfully!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/home/products");
      } else {
        toast.error("Error!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      return res;
    }
  };

  const updateItem = async () => {
    const Category = category.values().next().value;
    const Brand = brand.values().next().value;
    const Unit = unit.values().next().value;
    const validation = inputFieldValidation({
      itemname,
      Category,
      Brand,
      cost,
      Unit,
      retailsalesprice,
    });
    if (validation == 0) {
      const response = await fetch(pathname + "/api/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemcode,
          extraitemcode,
          barcode,
          itemname,
          category: category.values().next().value,
          subcategory: subcategory.values().next().value,
          brand: brand.values().next().value,
          retailsalesprice,
          retailautosalesprice,
          retailpricechange,
          retailmarkup,
          smallwholesalesprice,
          smallwholeautosalesprice,
          smallwholepricechange,
          smallwholemarkup,
          largewholesalesprice,
          largewholeautosalesprice,
          largewholepricechange,
          largewholemarkup,
          cost,
          stockcontrol,
          currentstock,
          stocklimit,
          unit: unit.values().next().value,
          netweight,
          grossweight,
          location,
        }),
      });
      const res = await response.json();
      if (res == "SUCCESS") {
        toast.success(`Item updated successfully!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/home/products");
      } else {
        toast.error("Error!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      return res;
    }
  };

  const handleDelete = async () => {
    // Display a toast notification with a confirmation message.
    toast.warning("Are you sure you want to delete this item?", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false, // This ensures the notification doesn't auto-close
      closeOnClick: false, // This prevents the notification from closing when clicked
      closeButton: (
        <div>
          <Button color="default" onClick={confirmDelete} className="mb-1">
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

  const confirmDelete = async () => {
    await deleteItem(pathname, itemcode);
    toast.dismiss();
    router.push("/home/products");
  };

  return (
    <div className="flex ml-3 flex-col w-full bg-slate-200">
      <span className="text-3xl font-black leading-none text-gray-900 select-none  pt-3">
        Add <span className="text-indigo-600">item</span>
      </span>
      <div>
        <div className="w-full flex flex-col gap-4 mt-2 pb-2 pt-2 border border-gray-400 border-solid rounded-lg">
          <div className="flex flex-wrap">
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <NextTextReadOnlyInputField
                label="Code"
                value={itemcode}
                onChange={(e) => setItemcode(e.target.value)}
              />
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              {/* <input
                ref={inputRef}
                type="text"
                value={extraitemcode}
                onChange={(e) => setExtraitemcode(e.target.value)}
                className="opacity-0 absolute w-0 h-0"
              /> */}
              <NextAutoFocusTextInputField
                label="Extra Code"
                value={extraitemcode}
                onChange={(e) => setExtraitemcode(e.target.value)}
              />
            </div>

            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              {/* <input ref={inputRef} type="text" /> */}
              <NextTextInputField
                label="Barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 w-full">
              <NextTextRequiredInputField
                label="Name"
                value={itemname}
                onChange={(e) => setItemname(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3 flex items-center justify-center">
              <BaseinfoAddnewPopup baseinfoType="Category" />
              <NextSelectRequiredInputField
                label="Category"
                value={category}
                onChange={(e) =>
                  handleSelectChangeEvent(e, setCategory, category)
                }
                optionValues={categoryOptionValues}
              />
              {category.size != 0 ? (
                <BaseinfoAddnewPopup
                  baseinfoType="Category"
                  baseinfoId={category}
                  optionArray={categoryOptionValues}
                />
              ) : null}
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3  flex items-center justify-center">
              {category.size != 0 ? (
                <BaseinfoAddnewPopup
                  baseinfoType="Subcategory"
                  parentbaseinfoId={category}
                />
              ) : null}
              <NextSelectInputField
                label="Subcategory"
                value={subcategory}
                onChange={(e) =>
                  handleSelectChangeEvent(e, setSubcategory, subcategory)
                }
                optionValues={subCategoryOptionValues}
              />
              {subcategory.size != 0 ? (
                <BaseinfoAddnewPopup
                  baseinfoType="Subcategory"
                  baseinfoId={subcategory}
                  optionArray={subCategoryOptionValues}
                />
              ) : null}
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3  flex items-center justify-center">
              <BaseinfoAddnewPopup baseinfoType="Brand" />
              <NextSelectRequiredInputField
                label="Brand"
                value={brand}
                onChange={(e) => handleSelectChangeEvent(e, setBrand, brand)}
                optionValues={brandOptionValues}
              />
              {brand.size != 0 ? (
                <BaseinfoAddnewPopup
                  baseinfoType="Brand"
                  baseinfoId={brand}
                  optionArray={brandOptionValues}
                />
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <NextTextInputField
                label="Net weight"
                value={netweight}
                onChange={(e) => setNetweight(e.target.value)}
              />
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <NextTextInputField
                label="Gross weight"
                value={grossweight}
                onChange={(e) => setGrossweight(e.target.value)}
              />
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <NextTextInputField
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <NextTextRequiredInputField
                label="Cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3 flex items-center justify-center">
              <BaseinfoAddnewPopup baseinfoType="Unit" />
              <NextSelectRequiredInputField
                label="Unit"
                value={unit}
                onChange={(e) => handleSelectChangeEvent(e, setUnit, unit)}
                optionValues={unitOptionValues}
              />
              {unit.size != 0 ? (
                <BaseinfoAddnewPopup
                  baseinfoType="Unit"
                  baseinfoId={unit}
                  optionArray={unitOptionValues}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 mt-3 border-b pb-1 border-gray-400">
          <div className="flex flex-wrap sm:flex-nowrap gap-x-0.5">
            <PriceComponent
              autosalesprice={retailautosalesprice}
              salesprice={retailsalesprice}
              pricechange={retailpricechange}
              markup={retailmarkup}
              setSalesprice={setRetailsalesprice}
              setMarkup={setRetailmarkup}
              setAutosalesprice={setRetailautosalesprice}
              setPricechange={setRetailpricechange}
              title="Retail price"
            />
            <PriceComponent
              autosalesprice={smallwholeautosalesprice}
              salesprice={smallwholesalesprice}
              pricechange={smallwholepricechange}
              markup={smallwholemarkup}
              setSalesprice={setSmallwholesalesprice}
              setMarkup={setSmallwholemarkup}
              setAutosalesprice={setSmallwholeautosalesprice}
              setPricechange={setSmallwholepricechange}
              title="Small wholesale price"
            />
          {/* </div>
          <div className="flex"> */}
            <PriceComponent
              autosalesprice={largewholeautosalesprice}
              salesprice={largewholesalesprice}
              pricechange={largewholepricechange}
              markup={largewholemarkup}
              setSalesprice={setLargewholesalesprice}
              setMarkup={setLargewholemarkup}
              setAutosalesprice={setLargewholeautosalesprice}
              setPricechange={setLargewholepricechange}
              title="Large wholesale price"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 mt-2 pb-2 pt-2  border border-gray-400 border-solid rounded-lg">
          <div className="flex flex-wrap">
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 flex sm:w-1/5">
              <div className="flex items-center">
                <input
                  checked={stockcontrol}
                  onChange={(e) => setStockcontrol(e.target.checked)}
                  type="checkbox"
                  className="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5"
                />
              </div>
              <h1 className="flex items-center font-semibold">Control stock</h1>
            </div>
            <div
              className={`flex flex-wrap w-full sm:w-4/5 ${
                stockcontrol ? "" : "pointer-events-none"
              }`}
            >
              <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/2">
                <NextTextInputField
                  label="Current stock"
                  value={currentstock}
                  onChange={(e) => setCurrentstock(e.target.value)}
                />
              </div>
              <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/2">
                <NextTextInputField
                  label="Stock limit"
                  value={stocklimit}
                  onChange={(e) => setStocklimit(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 mt-2">
          <div className="flex flex-wrap">
            <div className="px-1">
              <Button
                color="primary"
                startContent={<AiFillSave />}
                onClick={saveButtonHandler}
              >
                Save
              </Button>
            </div>
            <div>
              <Button color="default" startContent={<GiCancel />}>
                Cancel
              </Button>
            </div>
            <div className={itemcode ? "ml-auto" : "hidden"}>
              <Button
                color="default"
                startContent={<BsFillExclamationOctagonFill />}
              >
                Disable product
              </Button>
            </div>
            <div className={itemcode ? "px-3" : "hidden"}>
              <Button color="default" startContent={<AiFillCopy />}>
                Copy
              </Button>
            </div>
            <div className={itemcode ? "px-3" : "hidden"}>
              <Button
                color="default"
                startContent={<ImBin />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
