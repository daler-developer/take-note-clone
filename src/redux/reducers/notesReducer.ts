import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "redux/store"


export type NoteType = {
  id: string,
  title: string,
  content: string,
  categoryId: string | null,
  isFavorite: boolean,
  isInTrash: boolean
}

type NotesState = {
  list: NoteType[],
  selectedNoteId: string | null
}

const initialState: NotesState = {
  list: [
    { id: 'note001', title: '', content: '', categoryId: 'cat001', isFavorite: true, isInTrash: false },
    { id: 'note002', title: '', content: '', categoryId: 'cat002', isFavorite: false, isInTrash: false },
    { id: 'note003', title: '', content: '', categoryId: 'cat003', isFavorite: false, isInTrash: false },
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
    },
    setNoteContent(state, action: PayloadAction<{ noteId: string, to: string }>) {
      const note = state.list.find((note) => note.id === action.payload.noteId)
      note && (note.content = action.payload.to)
    },
    setNoteTitle(state, action: PayloadAction<{ noteId: string, to: string }>) {
      const note = state.list.find((note) => note.id === action.payload.noteId)
      note && (note.title = action.payload.to)
    },
    deleteNote(state, action: PayloadAction<string>) {
      state.list.splice(state.list.findIndex((note) => note.id === action.payload), 1)
    },
    setNoteCategory(state, action: PayloadAction<{ noteId: string, to: string | null }>) {
      const note = state.list.find((note) => note.id === action.payload.noteId)
      note && (note.categoryId = action.payload.to)
    },
    sendNoteToTrash(state, action: PayloadAction<{ noteId: string }>) {
      const note = state.list.find((note) => note.id === action.payload.noteId)
      note && (note.isInTrash = true)
    },
    restoreNoteFromTrash(state, action: PayloadAction<string>) {
      const note = state.list.find((note) => note.id === action.payload)
      note && (note.isInTrash = false)
    },
    deleteNotesInTrash(state) {
      state.list = state.list.filter((note) => !note.isInTrash ? true : false)
    },
    createNote(state, action: PayloadAction<NoteType>) {
      state.list.push(action.payload)
    }
  }
})

export const selectNotes = (state: RootState) => {
  return state.notes.list
}

export const selectNoteById = (state: RootState, id: string) => {
  return state.notes.list.find((note) => note.id === id)
}

export const selectNotesNotInTrash = (state: RootState) => {
  return state.notes.list.filter((note) => !note.isInTrash ? true : false)
}

export const selectFavoriteNotes = (state: RootState) => {
  return state.notes.list.filter((note) => note.isFavorite ? true : false)
}

export const selectNotesInTrash = (state: RootState) => {
  return state.notes.list.filter((note) => note.isInTrash ? true : false)
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
