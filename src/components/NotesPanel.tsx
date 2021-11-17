import { useState } from 'react'
import { NoteType, selectNotesByTitleIncludes } from 'redux/reducers/notesReducer'
import Note from './Note'


type Props = {
  classes?: {
    root?: string
  },
  notes: NoteType[]
}

const NotesPanel = (props: Props) => {
  const [searchInputValue, setSearchInputValue] = useState<string>('')

  const filteredNotes = (): NoteType[] => {
    return props.notes.filter((note) => note.title?.includes(searchInputValue))
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
      </div>

      <ul className="notes-panel__notes-list">
        {filteredNotes().map((note) => (
          <li>
            <Note data={note} />
          </li>
        ))}
      </ul>

    </div>
  )
}

export default NotesPanel
