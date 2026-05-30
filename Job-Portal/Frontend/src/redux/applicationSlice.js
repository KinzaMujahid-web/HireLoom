import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({

    name: 'application',

    initialState: {
        applicants: null,
    },

    reducers: {

        // Store all applicants in state
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        },

        // Update applicant status
        updateApplicantStatus: (state, action) => {
            const { id, status } = action.payload;

            const app = state.applicants?.applications?.find(
                (item) => item._id === id
            );

            if (app) {
                app.status = status;
            }
        },
    }
});

export const { setAllApplicants, updateApplicantStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
export const applicationReducer = applicationSlice.reducer;
