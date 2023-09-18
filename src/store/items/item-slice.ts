import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBrandData, fetchCategoryData, fetchSelItemDataForEdit, fetchSubcatgoryData, fetchUnitData } from "./utils";

interface baseInfoState {
  categoryOptionValues: any[];
  brandOptionValues: any[];
  unitOptionValues: any[];
  subCategoryOptionValues: any[];
  selItemForEdit: any[];
}

const initialState: baseInfoState = {
  categoryOptionValues: [],
  brandOptionValues: [],
  unitOptionValues: [],
  subCategoryOptionValues: [],
  selItemForEdit: [],
};

const itemSlice = createSlice({
  name: "itembaseinfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryData.pending, (state) => {
        // Handle pending state if needed
      })
      .addCase(fetchCategoryData.fulfilled, (state, action) => {
        state.categoryOptionValues = action.payload;
      })
      .addCase(fetchCategoryData.rejected, (state, action) => {
        // Handle rejected state if needed
      })
      .addCase(fetchBrandData.fulfilled, (state, action) => {
        state.brandOptionValues = action.payload;
      })
      .addCase(fetchUnitData.fulfilled, (state, action) => {
        state.unitOptionValues = action.payload;
      })
      .addCase(fetchSubcatgoryData.fulfilled, (state, action) => {
        state.subCategoryOptionValues = action.payload;
      })
      .addCase(fetchSelItemDataForEdit.fulfilled, (state, action) => {
        state.selItemForEdit = action.payload;
      });
  },
});

export default itemSlice.reducer;
// export const fetchCategoryData: any = createAsyncThunk(
//   "itembaseinfo/fetchCategoryData",
//   async (apiUrl: string) => {
//     const response = await fetch(
//       `${apiUrl}/api/addnew-baseinfo?title=Category&category=0`
//     );
//     const res = await response.json();
//     // Create option array
//     const optionArray: { value: number; name: string }[] = res.fetchData.map(
//       (c: any) => {
//         return { value: c.categoryid, name: c.categoryname };
//       }
//     );
//     return optionArray;
//   }
// );