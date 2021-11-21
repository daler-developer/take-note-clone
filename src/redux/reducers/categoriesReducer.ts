import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "redux/store"


export type Category = {
  id: string,
  name: string,
}

type CategoriesState = Category[]

const initialState: CategoriesState = [
  { id: 'cat001', name: 'Home' },
  { id: 'cat002', name: 'Inha' },
  { id: 'cat003', name: 'West' },
  // { id: 'cat004', name: 'West' },
  // { id: 'cat005', name: 'West' },
  // { id: 'cat006', name: 'West' },
  // { id: 'cat007', name: 'West' },
  // { id: 'cat008', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
  // { id: 'cat009', name: 'West' },
]

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory: {
      reducer(state, action: PayloadAction<Category>) {
        state.push(action.payload)
      },
      prepare(payload: string) {
        return { payload: { id: nanoid(), name: payload } }
      }
    },
    deleteCategory(state, action: PayloadAction<string>) {
      state.splice(state.findIndex((cat) => cat.id === action.payload), 1)
    },
    renameCategory(state, action: PayloadAction<{ categoryId: string, newName: string }>) {
      const category = state.find((el) => el.id === action.payload.categoryId)
      if (category) {
        category.name = action.payload.newName
      }
    }
  }
})

export const selectCategories = (state: RootState) => {
  return state.categories
}

export const selectCategoryById = (state: RootState, id: string) => {
  return state.categories.find((category) => category.id === id)
}

export const categoriesActions = categoriesSlice.actions

export default categoriesSlice.reducer
