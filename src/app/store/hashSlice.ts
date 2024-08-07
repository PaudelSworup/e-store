import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface signatureState {
  uuid: any | null;
  hashData: {
    signature: string;
    signed_field_names: string;
  } | null;
}

const initialState: signatureState = {
  uuid: null,
  hashData: null,
};

const hashSlice = createSlice({
  name: "hash",
  initialState,
  reducers: {
    setSignature: (
      state,
      action: PayloadAction<{ uuid: any; hashData: signatureState["hashData"] }>
    ) => {
      (state.uuid = action.payload.uuid),
        (state.hashData = action.payload.hashData);
    },
  },
});

export const { setSignature } = hashSlice.actions;
export default hashSlice.reducer;
