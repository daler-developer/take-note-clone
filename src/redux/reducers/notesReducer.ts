import { createSlice } from "@reduxjs/toolkit"


type Note = {
  name: string | null,
  content: string | null,
  categoryName: string | null,
  isFavourite: boolean,
  isRemoved: boolean
}

type NotesState = {
  list: Note[]
}

const initialState: NotesState = {
  list: []
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {

  }
})


export const notesActions = notesSlice.actions

export default notesSlice.reducer
