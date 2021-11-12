import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { categoriesActions, selectCategories } from 'redux/reducers/categoriesReducer'
import { RootState } from 'redux/store'
import SidebarCategory from './SidebarCategory'



type Props = PropsFromRedux & {
  className?: string
}

type PropsFromRedux = ConnectedProps<typeof connector>

const Sidebar = (props: Props) => {
  const [categoryNameInputValue, setCategoryNameInputValue] = useState<string>('')
  const [addCategoryFormVisibility, setAddCategoryFormVisibility] = useState<boolean>(false)
  const [categoriesListVisibility, setCategoriesListVisibility] = useState<boolean>(true)

  const addCategoryInputRef = useRef<HTMLInputElement>(null!)

  const documentClickHandlerRef = useRef((e: any) => {
    if ( setAddCategoryFormVisibility && !addCategoryInputRef.current.contains(e.target) ) {
      setAddCategoryFormVisibility(false)
    }
  })

  useEffect(() => {
    if (addCategoryFormVisibility) {
      document.addEventListener('click', documentClickHandlerRef.current)
    } else {
      document.removeEventListener('click', documentClickHandlerRef.current)
    }
  }, [addCategoryFormVisibility])

  useEffect(() => {
    if (addCategoryFormVisibility) {
      addCategoryInputRef.current.focus()
    }
  }, [addCategoryFormVisibility])

  const resetForm = () => {
    setCategoryNameInputValue('')
  }

  const handleAddCategoryFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    if (categoryNameInputValue.trim()) {
      props.createCategory(categoryNameInputValue)
      resetForm()
    } else {

    }
  }

  const handleAddCategoryBtnClick = () => {
    setAddCategoryFormVisibility(true)
  }

  const handleCategoriesTitleLeftClick = () => {
    setCategoriesListVisibility(!categoriesListVisibility)
  }

  return (
    <aside className={`sidebar ${props.className}`}>

      <button className="sidebar__add-note-btn">
        <span className="sidebar__icon sidebar__add-icon material-icons-outlined">add</span>
        <span>New note</span>
      </button>

      <nav className="sidebar__nav">
        <ul className="sidebar__nav-links">

          <li className="sidebar__nav-links-item">
            <NavLink to="/scatchpad" className="sidebar__link" activeClassName="sidebar__link--active">
              <span className="sidebar__icon sidebar__nav-icon material-icons-outlined">rate_review</span>
              <span>Scatchpad</span>
            </NavLink>
          </li>

          <li className="sidebar__nav-links-item">
            <NavLink to="/notes" className="sidebar__link" activeClassName="sidebar__link--active">
              <span className="sidebar__icon sidebar__nav-icon material-icons-outlined">book</span>
              <span>Notes</span>
            </NavLink>
          </li>

          <li className="sidebar__nav-links-item">
            <NavLink to="/favourites" className="sidebar__link" activeClassName="sidebar__link--active">
              <span className="sidebar__icon sidebar__nav-icon material-icons-outlined">star_outline</span>
              <span>Favourites</span>
            </NavLink>
          </li>

          <li className="sidebar__nav-links-item">
            <NavLink to="/trash" className="sidebar__link" activeClassName="sidebar__link--active">
              <span className="sidebar__icon sidebar__nav-icon material-icons-outlined">delete</span>
              <span>Trash</span>
            </NavLink>
          </li>


        </ul>
      </nav>

      <div className="sidebar__categories">

        <h2 className="sidebar__categories-title">
          <div className="sidebar__categories-title-left" onClick={handleCategoriesTitleLeftClick}>
            <span className={`sidebar__icon sidebar__arrow-icon material-icons-outlined ${categoriesListVisibility || 'sidebar__arrow-icon--rotated'}`}>
              expand_more
            </span>
            <span className="sidebar__categories-text">Categories</span>
          </div>
          <button className="sidebar__add-category-btn" type="button" onClick={handleAddCategoryBtnClick}>
            <span className="sidebar__icon sidebar__add-icon material-icons-outlined">add</span>
          </button>
        </h2>

        {categoriesListVisibility && (
          <ul className="sidebar__categories-list">
            {props.categories.map((category) => (
              <li className="sidebar__categories-list-item">
                <SidebarCategory data={category} />
              </li>
            ))}
          </ul>
        )}

        <form
          className={`sidebar__add-category-form ${!addCategoryFormVisibility && 'sidebar__add-category-form--hidden'}`}
          onSubmit={handleAddCategoryFormSubmit}
        >
          <input
            type="text"
            className="sidebar__category-name-input"
            value={categoryNameInputValue}
            onChange={(e) => setCategoryNameInputValue(e.target.value)}
            ref={addCategoryInputRef}
            placeholder="Category name..."
          />
        </form>

      </div>

    </aside>
  )
}

const mapStateToProps = (state: RootState) => ({
  categories: selectCategories(state)
})

const mapDispatchToProps = {
  createCategory: categoriesActions.addCategory
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Sidebar)
