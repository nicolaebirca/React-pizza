import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Sort = {
  name: string;
  sortProperty: "rating" | "popularity";
  sort?: any;
}

interface FilterSliceState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "popularity",
    sortProperty: "rating",
    
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState, 
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, actions: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(actions.payload.categoryId);
      state.sort = actions.payload.sort;
      state.currentPage = Number(actions.payload.currentPage);
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
