import { useAppSelector } from "hooks/redux"
import { selectNotesInTrash } from "redux/reducers/notesReducer"
import Editor from "./Editor"
import Layout from "./Layout"
import NotesPanel from "./NotesPanel"



type Props = {}

const TrashPage = (props: Props) => {

  const notes = useAppSelector((state) => selectNotesInTrash(state))
  
  return (
    <Layout classes={{ root: 'trash-page', body: 'trash-page__body' }}>
      <NotesPanel
        classes={{ root: 'trash-page__notes-panel' }}
        notes={notes}
        withClearNotesBtn
      />
      <Editor
        classes={{ root: 'trash-page__editor' }}
      />
    </Layout>
  )
}

export default TrashPage
