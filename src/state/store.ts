import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import rootSaga from "./rootSaga"; // 🔁 Your combined saga file

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const middlewares: any[] = [sagaMiddleware];

// Add logger only in development
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // ✅ Turn off thunk since we're using saga
    }).concat(middlewares),
});

sagaMiddleware.run(rootSaga); // ✅ Start your sagas

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
