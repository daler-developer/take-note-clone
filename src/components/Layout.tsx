import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import Sidebar from './Sidebar'



type Props = PropsFromRedux & {
  children: any,
  classes?: {
    root?: string,
    body?: string
  }
}

type PropsFromRedux = ConnectedProps<typeof connector>

const Layout = (props: Props) => {
  return (
    <div className={`layout ${props.classes?.root}`}>
      <Sidebar className="layout__sidebar" />
      <div className={`layout__body ${props.classes?.body}`}>
        {props.children}
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  
})

const mapDispatchToProps = {
  
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Layout)
