import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EnterpriseState {
  enterpriseId: string;
}

const initialState: EnterpriseState = {
  enterpriseId: "",
};

const enterpriseSlice = createSlice({
  name: "enterprise",
  initialState,
  reducers: {
    setEnterpriseId: (state, action: PayloadAction<string>) => {
      state.enterpriseId = action.payload;
    },
  },
});

export const { setEnterpriseId } = enterpriseSlice.actions;

export default enterpriseSlice.reducer;
