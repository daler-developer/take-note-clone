import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import Editor from './Editor'
import Layout from './Layout'



type Props = PropsFromRedux & {

}

type PropsFromRedux = ConnectedProps<typeof connector>

const ScatchpadPage = (props: Props) => {
  return (
    <Layout classes={{ root: 'scatchpad-page', body: 'scatchpad-page__body' }}>
      <Editor
        classes={{ root: 'scatchpad-page__editor' }}
        isScatchpad={true}
      />
    </Layout>
  )
}

const mapStateToProps = (state: RootState) => ({
  
})

const mapDispatchToProps = {
  
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(ScatchpadPage)
