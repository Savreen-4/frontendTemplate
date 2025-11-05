import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./features/auth/authSlice";
import { companiesReducer} from "./features/companies/companiesSlice";
import { majorCategoryCommonReducer } from "./features/majors/majorSlice";
import { driversReducer } from "./features/drivers/driverSlice";
import { dashboardReducer } from "./features/dashboard/dashbaordSlice";
import { persistReducer, persistStore } from "redux-persist";
import { vehicleTypesReducer } from "./features/vehicleTypes/vehicleTypesSlice";
import { companyJobsReducer, driverJobsReducer } from "./features/Jobs/jobsSlice";
import { policyDataReducer } from "./policies/policiesSlice";
import { contactusReducer } from "./Contactus/contactSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  companiesSlice: companiesReducer,
  majorCategoryCommonSlice: majorCategoryCommonReducer,
  driverSlice: driversReducer,
  dashboardSlice: dashboardReducer,
  vehicleTypesSlice:vehicleTypesReducer,
  companyJobsSlice: companyJobsReducer,
  driverJobsSlice: driverJobsReducer,
  policyDataSlice: policyDataReducer,
  contactusSlice: contactusReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['notificationsSlice','vehicleTypesSlice'], 
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(logger as any),
});

export const persistor = persistStore(store); 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
