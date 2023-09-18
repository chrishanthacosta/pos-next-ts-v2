import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategoryData: any = createAsyncThunk(
  "itembaseinfo/fetchCategoryData",
  async (apiUrl: string) => {
    const response = await fetch(
      `${apiUrl}/api/addnew-baseinfo?title=Category&category=0`
    );
    const res = await response.json();
    // Create option array
    const optionArray: { value: number; name: string }[] = res.fetchData.map(
      (c: any) => {
        return { value: c.categoryid, name: c.categoryname };
      }
    );
    return optionArray;
  }
);

export const fetchBrandData: any = createAsyncThunk(
  "itembaseinfo/fetchBrandData",
  async (apiUrl: string) => {
    const response = await fetch(
      `${apiUrl}/api/addnew-baseinfo?title=Brand&category=0`
    );
    const res = await response.json();
    // Create option array
    const optionArray: { value: number; name: string }[] = res.fetchData.map(
      (c: any) => {
        return { value: c.brandid, name: c.brandname };
      }
    );
    return optionArray;
  }
);

export const fetchUnitData: any = createAsyncThunk(
  "itembaseinfo/fetchUnitData",
  async (apiUrl: string) => {
    const response = await fetch(
      `${apiUrl}/api/addnew-baseinfo?title=Unit&category=0`
    );
    const res = await response.json();
    // Create option array
    const optionArray: { value: number; name: string }[] = res.fetchData.map(
      (c: any) => {
        return { value: c.unitid, name: c.unit };
      }
    );
    return optionArray;
  }
);

export const fetchSubcatgoryData: any = createAsyncThunk(
  "itembaseinfo/fetchSubcategoryData",
  async (params: { apiUrl: string; category: any }) => {
    const { apiUrl, category } = params;
    const curCategoryId = category.values().next().value;
    const response = await fetch(
      `${apiUrl}/api/addnew-baseinfo?title=Subcategory&category=${curCategoryId}`
    );
    const res = await response.json();
    // Create option array
    const optionArray: { value: number; name: string }[] = res.fetchData.map(
      (c: any) => {
        return { value: c.subcategoryid, name: c.subcategoryname };
      }
    );
    return optionArray;
  }
);

export const fetchSelItemDataForEdit: any = createAsyncThunk(
  "itembaseinfo/fetchSelItemDataForEditData",
  async (params: { apiUrl: string; itemcode: any }) => {
    const { apiUrl, itemcode } = params;

    const response = await fetch(
      `${apiUrl}/api/items/get-selected-item?item-code=${itemcode}`
    );
    const res = await response.json();

    return res.itemData;
  }
);
