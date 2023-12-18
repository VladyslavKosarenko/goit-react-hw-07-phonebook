import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: { value: '' },
  reducers: {
    updateFilter: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
