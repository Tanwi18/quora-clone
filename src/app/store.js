import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import questionReducer from '../features/QuestionSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    question:questionReducer,
  },
});
