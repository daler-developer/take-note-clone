import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notesActions, NoteType } from 'redux/reducers/notesReducer'
import Note from './Note'


type Props = {
  classes?: {
    root?: string
  },
  notes: NoteType[],
  withClearNotesBtn?: boolean
}

const NotesPanel = (props: Props) => {
  const dispatch = useDispatch()

  const [searchInputValue, setSearchInputValue] = useState<string>('')

  const filteredNotes = (): NoteType[] => {
    if (searchInputValue.trim()) {
      return props.notes.filter((note) => note.title?.includes(searchInputValue))
    }
    return props.notes
  }

  const handlers = {
    handleEmptyBtnClick() {
      dispatch(notesActions.deleteNotesInTrash())
    }
  }

  return (
    <div className={`notes-panel ${props.classes?.root}`}>
      
      <div className="notes-panel__search-input-wrapper">
        <input
          type="text"
          className="notes-panel__search-input"
          placeholder="Search for notes"
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
        />
        {props.withClearNotesBtn && (
          <button className="notes-panel__empty-btn" type="button" onClick={handlers.handleEmptyBtnClick}>
            Empty
          </button>
        )}
      </div>

      <ul className="notes-panel__notes-list">
        {filteredNotes().map((note) => (
          <li key={note.id}>
            <Note data={note} />
          </li>
        ))}
      </ul>

    </div>
  )
}

export default NotesPanel
