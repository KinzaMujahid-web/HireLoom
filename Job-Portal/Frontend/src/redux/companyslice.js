import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({

    name: "company",

    initialState: {
        singleCompany: {}, // Initialize with an empty object
        companies: [],
        searchCompanyByText: "",
    },

    reducers: {

        // Set single company details
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },

        // Store all companies
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },

        // Update search text for filtering
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        },

    },

});

export const {
    setSingleCompany,
    setCompanies,
    setSearchCompanyByText
} = companySlice.actions;

export default companySlice.reducer;

export { companySlice };
