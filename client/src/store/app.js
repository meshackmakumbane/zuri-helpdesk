import { configureStore } from "@reduxjs/toolkit";
import businessReducer from "../features/onboarding/onboardingSlice";
import authReducer  from "../features/auth/authSlice";

const store = configureStore({
    reducer:{
        onboard: businessReducer,
        auth: authReducer,
    }
})

export default store