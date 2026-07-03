import { configureStore } from "@reduxjs/toolkit";
import businessReducer from "../features/onboarding/onboardingSlice";

const store = configureStore({
    reducer:{
        onboard: businessReducer
    }
})

export default store