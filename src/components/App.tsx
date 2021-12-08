import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Switch, Route, Redirect } from 'react-router-dom'
import 'scss/index.scss'
import ScatchpadPage from './ScatchpadPage'
import CategoryPage from './CategoryPage'
import NotesPage from './NotesPage'
import TrashPage from './TrashPage'
import FavoritesPage from './FavoritesPage'



type Props = PropsFromRedux & {

}

type PropsFromRedux = ConnectedProps<typeof connector>

const App = (props: Props) => {
  return (
    <div className='app'>
      <Switch>

        <Route path="/" exact>
          <Redirect to="/notes" />
        </Route>

        <Route path="/notes" exact>
          <NotesPage />
        </Route>

        <Route path="/category/:id" exact>
          <CategoryPage />
        </Route>

        <Route path="/trash" exact>
          <TrashPage />
        </Route>

        <Route path="/favorites" exact>
          <FavoritesPage />
        </Route>

      </Switch>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  
})

const mapDispatchToProps = {
  
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(App)
