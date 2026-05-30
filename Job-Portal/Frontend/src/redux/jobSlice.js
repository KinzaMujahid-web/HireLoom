import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  allAdminJobs: [], 
  singleJob: null, 
  searchJobByText: "",
  allAppliedJobs: [], 
  searchedQuery: "",
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,

  reducers: {

    // Store all jobs
    setAllJobs(state, action) {
      state.allJobs = action.payload;
    },

    // Store single selected job
    setSingleJob(state, action) {
      state.singleJob = action.payload;
    },

    // Store all admin jobs
    setAllAdminJobs(state, action) {
      state.allAdminJobs = action.payload;
    },

    // Update search text for jobs
    setSearchJobByText(state, action) {
      state.searchJobByText = action.payload;
    },

    // Store applied jobs
    setAllAppliedJobs(state, action) {
      state.allAppliedJobs = action.payload;
    },

    // Store searched query
    setSearchedQuery(state, action) {
      state.searchedQuery = action.payload;
    },

  }

});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
