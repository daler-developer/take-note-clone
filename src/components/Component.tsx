import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'



type Props = PropsFromRedux & {

}

type PropsFromRedux = ConnectedProps<typeof connector>

const Component = (props: Props) => {
  return (
    <div>
      
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  
})

const mapDispatchToProps = {
  
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Component)
