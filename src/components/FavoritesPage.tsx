import { useAppSelector } from "hooks/redux"
import { NoteType, selectFavoriteNotes } from "redux/reducers/notesReducer"
import Editor from "./Editor"
import Layout from "./Layout"
import NotesPanel from "./NotesPanel"

type Props = {

}

const FavoritesPage = (props: Props) => {

  const notes = useAppSelector((state) => selectFavoriteNotes(state))

  const getNotesNotInTrash = (notes: NoteType[]) => notes.filter((note) => !note.isInTrash ? true : false)

  return (
    <Layout classes={{ root: 'favorites-page', body: 'favorites-page__body' }}>
      <NotesPanel
        classes={{ root: 'favorites-page__notes-panel' }}
        notes={getNotesNotInTrash(notes)}
      />
      <Editor
        classes={{ root: 'favorites-page__editor' }}
      />
    </Layout>
  )
}

export default FavoritesPage
