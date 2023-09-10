import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employee/employeeSlice";
import { save, load } from "redux-localstorage-simple";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
  preloadedState: load(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
