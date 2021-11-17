import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Switch, Route, Redirect } from 'react-router-dom'
import 'scss/index.scss'
import ScatchpadPage from './ScatchpadPage'
import CategoryPage from './CategoryPage'



type Props = PropsFromRedux & {

}

type PropsFromRedux = ConnectedProps<typeof connector>

const App = (props: Props) => {
  return (
    <div className='app'>
      <Switch>

        <Route path="/" exact>
          <Redirect to="/scatchpad" />
        </Route>

        <Route path="/scatchpad" exact>
          <ScatchpadPage />
        </Route>

        <Route path="/category/:id">
          <CategoryPage />
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
