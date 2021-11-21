import { useAppSelector } from 'hooks/redux'
import { useParams } from 'react-router'
import { NoteType, selectNotesByCategoryId } from 'redux/reducers/notesReducer'
import { RootState } from 'redux/store'
import Editor from './Editor'
import Layout from './Layout'
import NotesPanel from './NotesPanel'



type Props = {

}

const CategoryPage = (props: Props) => {
  const params = useParams<{ id: string }>()

  const notes = useAppSelector((state: RootState) => selectNotesByCategoryId(state, params.id))

  const getNotesNotInTrash = (notes: NoteType[]) => notes.filter((note) => !note.isInTrash ? true : false)

  return (
    <Layout classes={{ root: 'category-page', body: 'category-page__body' }}>
      <NotesPanel
        classes={{ root: 'category-page__notes-panel' }}
        notes={getNotesNotInTrash(notes)}
      />
      <Editor
        classes={{ root: 'category-page__editor' }}
      />
    </Layout>
  )
}

export default CategoryPage
