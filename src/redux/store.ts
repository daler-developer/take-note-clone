import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './reducers/categoriesReducer'
import notesReducer from './reducers/notesReducer'


const store = configureStore({
  reducer: {
    notes: notesReducer,
    categories: categoriesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
