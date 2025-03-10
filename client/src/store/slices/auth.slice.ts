import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'src/interfaces/user.interface';

const initialState: { user: IUser | null } = {
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
