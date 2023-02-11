import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { PayloadAction } from "@reduxjs/toolkit";
// Define a type for the slice state
interface SideBarState {
  value: boolean;
  selectedMenu: string;
}

// Define the initial state using that type
const initialState: SideBarState = {
  value: false,
  selectedMenu: "1",
};

export const showSidebaSlice = createSlice({
  name: "showSidebar",
  initialState,
  reducers: {
    toogle: (state) => {
      state.value = !state.value;
    },
    onChangeMenu: (state, data: PayloadAction<string>) => {
      state.selectedMenu = data.payload;
    },
  },
});

export const { toogle, onChangeMenu } = showSidebaSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectShowSidebar = (state: RootState) => state.sideBar.value;
export const selectMenu = (state: RootState) => state.sideBar.selectedMenu;

export default showSidebaSlice.reducer;
