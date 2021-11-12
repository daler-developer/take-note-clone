import { connect, ConnectedProps } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Category } from 'redux/reducers/categoriesReducer'
import { RootState } from 'redux/store'



type Props = PropsFromRedux & {
  data: Category
}

type PropsFromRedux = ConnectedProps<typeof connector>

const SidebarCategory = (props: Props) => {
  return (
    <div className="sidebar-category">
      <div className="sidebar-category__body">
        <span className="sidebar-category__folder-icon material-icons-outlined">folder</span>
        <NavLink
          to={`/category/${props.data.name}`}
          className="sidebar-category__name"
          activeClassName="sidebar-category--active"
        >
          {props.data.name}
        </NavLink>
      </div>
      <button className="sidebar-category__more-btn">
        <span className="sidebar-category__more-icon material-icons-outlined">more_vert</span>
      </button>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  
})

const mapDispatchToProps = {
  
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(SidebarCategory)
