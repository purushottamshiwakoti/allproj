import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  users: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(`https://dummyjson.com/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }
  return await response.json();
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addUser } = userSlice.actions;

export { fetchUsers }; // Exporting the thunk for use in components or other files
export default userSlice.reducer;
