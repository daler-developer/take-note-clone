import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "redux/store"


export type Category = {
  id: string,
  name: string,
}

type CategoriesState = Category[]

const initialState: CategoriesState = [
  { id: nanoid(), name: 'Home' },
  { id: nanoid(), name: 'Inha' },
  { id: nanoid(), name: 'West' },
]

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: {
      reducer(state, action: PayloadAction<Category>) {
        state.push(action.payload)
      },
      prepare(payload: string) {
        return { payload: { id: nanoid(), name: payload } }
      }
    }
  }
})

export const selectCategories = (state: RootState) => {
  return state.categories
}

export const categoriesActions = categoriesSlice.actions

export default categoriesSlice.reducer
