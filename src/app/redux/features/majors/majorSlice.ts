import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    majors: [],
    loading: false,
    error: null,
    openMajorCategoryModal: false
};

const majorCategoryCommonSlice = createSlice({
    name: 'majorCategory',
    initialState,
    reducers: {
        setOpenMajorCreateCategory: (state) => {
            state.openMajorCategoryModal = true
        },
        setCloseMajorCreateCategory: (state) => {
            state.openMajorCategoryModal = false
        }
    },
  
});


export const { setOpenMajorCreateCategory, setCloseMajorCreateCategory } = majorCategoryCommonSlice.actions;

export const majorCategoryCommonReducer = majorCategoryCommonSlice.reducer;
// export const deleteCategorySlice = deleteCategory.reducer;













