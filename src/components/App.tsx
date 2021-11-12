import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Switch, Route, Redirect } from 'react-router-dom'
import 'scss/index.scss'
import ScatchpadPage from './ScatchpadPage'



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
