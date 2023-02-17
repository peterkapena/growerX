import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STR_TOKEN } from "../common";

// Define a type for the slice state
interface UserState {
  username?: string | null | undefined;
  email?: string | null | undefined;
  surName?: string | null | undefined;
  givenName?: string | null | undefined;
  organisationId: string;
}

// Define the initial state using that type
const initialState: UserState = {
  organisationId: "",
};
export const UserSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: UserState }>) => {
      state.email = action.payload.user.email;
      state.givenName = action.payload.user.givenName;
      state.surName = action.payload.user.surName;
      state.username = action.payload.user.username;
      state.organisationId = action.payload.user.organisationId;
    },
    signOut: () => {
      sessionStorage.removeItem(STR_TOKEN);
      window.location.href = "/";
    },
  },
});

export const { setUser, signOut } = UserSlice.actions;

export default UserSlice.reducer;