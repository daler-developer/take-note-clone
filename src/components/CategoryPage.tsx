import { useAppSelector } from 'hooks/redux'
import { useParams } from 'react-router'
import { selectNotesByCategoryId } from 'redux/reducers/notesReducer'
import { RootState } from 'redux/store'
import Layout from './Layout'
import NotesPanel from './NotesPanel'



type Props = {

}

const CategoryPage = (props: Props) => {
  const params = useParams<{ id: string }>()

  const filteredNotesByCategory = useAppSelector((state: RootState) => selectNotesByCategoryId(state, params.id))

  return (
    <Layout classes={{ root: 'category-page', body: 'category-page__body' }}>
      <NotesPanel
        classes={{ root: 'category-page__notes-panel' }}
        notes={filteredNotesByCategory}  
      />
    </Layout>
  )
}

export default CategoryPage
