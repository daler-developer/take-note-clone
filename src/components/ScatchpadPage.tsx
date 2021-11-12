import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import Layout from './Layout'



type Props = PropsFromRedux & {

}

type PropsFromRedux = ConnectedProps<typeof connector>

const ScatchpadPage = (props: Props) => {
  return (
    <Layout classes={{ root: 'scatchpad-page', body: 'scatchpad-page__body' }}>
      <h2>Hello World</h2>
    </Layout>
  )
}

const mapStateToProps = (state: RootState) => ({
  
})

const mapDispatchToProps = {
  
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(ScatchpadPage)
