import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface baseInfoState {
  isBaseinfoUpdated:any
  curBaseinfoId: any;
  curBaseinfoType: any;
}

const initialState: baseInfoState = {
  isBaseinfoUpdated:false,
  curBaseinfoId: "",
  curBaseinfoType: "",
};

const baseinfoSlice = createSlice({
  name: "baseinfo",
  initialState,
  reducers: {
    setIsBaseinfoUpdated: (state) => {
      state.isBaseinfoUpdated = !state.isBaseinfoUpdated;
    },
    setBaseinfoId: (state, action) => {
      state.curBaseinfoId = action.payload;
    },
    setBaseinfoTitle: (state, action) => {
      state.curBaseinfoType = action.payload;
    },
  },
});

export const { setBaseinfoId, setBaseinfoTitle,setIsBaseinfoUpdated } = baseinfoSlice.actions;

export default baseinfoSlice.reducer;
