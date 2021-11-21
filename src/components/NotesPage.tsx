import { useAppSelector } from "hooks/redux"
import { selectNotesNotInTrash } from "redux/reducers/notesReducer"
import Editor from "./Editor"
import Layout from "./Layout"
import NotesPanel from "./NotesPanel"


type Props = {
  
}

const NotesPage = (props: Props) => {

  const notes = useAppSelector((state) => selectNotesNotInTrash(state))

  return (
    <Layout classes={{ root: 'notes-page', body: 'notes-page__body' }}>
      <NotesPanel
        classes={{ root: 'notes-page__notes-panel' }}
        notes={notes}
      />
      <Editor
        classes={{ root: 'notes-page__editor' }}
      />
    </Layout>
  )
}

export default NotesPage
