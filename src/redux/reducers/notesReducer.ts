import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "redux/store"


export type NoteType = {
  id: string,
  title: string | null,
  content: string | null,
  categoryId: string | null,
  isFavorite: boolean,
  isRemoved: boolean
}

type NotesState = {
  list: NoteType[],
  selectedNoteId: string | null
}

const initialState: NotesState = {
  list: [
    { id: 'note001', title: 'Hello World', content: 'Some content', categoryId: 'cat001', isFavorite: false, isRemoved: false },
    { id: 'note002', title: 'Daler is good', content: 'My name is Daler', categoryId: 'cat002', isFavorite: false, isRemoved: false },
    { id: 'note001', title: 'Aziz', content: 'This is Aziz', categoryId: 'cat002', isFavorite: false, isRemoved: false },
  ],
  selectedNoteId: null
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setSelectedNoteId(state, action: PayloadAction<string>) {
      state.selectedNoteId = action.payload
    },
    setIsNoteFavorite(state, action: PayloadAction<{ noteId: string, to: boolean }>) {
      const note = state.list.find((note) => note.id === action.payload.noteId)
      note && (note.isFavorite = action.payload.to)
    }
  }
})

export const selectNotes = (state: RootState) => {
  return state.notes
}

export const selectSelectedNoteId = (state: RootState) => {
  return state.notes.selectedNoteId
}

export const selectNotesByCategoryId = (state: RootState, categoryId: string) => {
  return state.notes.list.filter((note) => note.categoryId === categoryId)
}

export const selectNotesByTitleIncludes = (state: RootState, name: string) => {
  return state.notes.list.filter((note: NoteType) => note.title?.includes(name))
}

export const notesActions = notesSlice.actions

export default notesSlice.reducer
