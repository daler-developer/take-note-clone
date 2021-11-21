import { nanoid } from '@reduxjs/toolkit'
import { FormikErrors, useFormik } from 'formik'
import { useAppSelector } from 'hooks/redux'
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { categoriesActions, selectCategories } from 'redux/reducers/categoriesReducer'
import { notesActions } from 'redux/reducers/notesReducer'
import SidebarCategory from './SidebarCategory'



type Props = {
  className?: string
}

type CreateCategoryFormValues = {
  name: string
}

const Sidebar = (props: Props) => {
  const [addCategoryFormVisibility, setAddCategoryFormVisibility] = useState<boolean>(false)
  const [categoriesListVisibility, setCategoriesListVisibility] = useState<boolean>(true)

  const history = useHistory()

  const dispatch = useDispatch()

  const categories = useAppSelector((state) => selectCategories(state))

  const addCategoryInputRef = useRef<HTMLInputElement>(null!)

  const documentClickHandlerRef = useRef((e: any) => {
    if ( setAddCategoryFormVisibility && !addCategoryInputRef.current.contains(e.target) ) {
      setAddCategoryFormVisibility(false)
    }
  })

  const createCategoryForm = useFormik({
    initialValues: {
      name: ''
    },
    validate(v: CreateCategoryFormValues) {
      const errors: FormikErrors<CreateCategoryFormValues> = {}

      const categoryWithNameExists = (name: string): boolean => {
        const category = categories.find((e) => e.name === name)

        return Boolean(category)
      }

      if (!v.name.trim()) {
        errors.name = 'Name is empty'
      } else if (categoryWithNameExists(v.name.trim())) {
        errors.name = 'Duplicate name'
      }

      return errors
    },
    onSubmit(v: CreateCategoryFormValues) {
      dispatch(categoriesActions.createCategory(v.name))
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
    if (!addCategoryFormVisibility) {
      createCategoryForm.resetForm()
    }
  }, [addCategoryFormVisibility])

  useEffect(() => {
    if (addCategoryFormVisibility) {
      addCategoryInputRef.current.focus()
    }
  }, [addCategoryFormVisibility])

  const handlers = {
    handleAddCategoryBtnClick() {
      !addCategoryFormVisibility && setAddCategoryFormVisibility(true)
    },
    handleCategoriesTitleBodyClick() {
      setCategoriesListVisibility(!categoriesListVisibility)
    },
    handleNewNoteBtnClick() {
      const id = nanoid()
      
      dispatch(notesActions.createNote({
        id,
        title: '',
        content: '',
        categoryId: null,
        isFavorite: false,
        isInTrash: false
      }))
      dispatch(notesActions.setSelectedNoteId(id))

      history.push('/notes')
    }
  }

  return (
    <aside className={`sidebar ${props.className}`}>

      <button className="sidebar__new-note-btn" onClick={handlers.handleNewNoteBtnClick}>
        <span className="sidebar__icon sidebar__add-icon material-icons-outlined">add</span>
        <span>New note</span>
      </button>

      <nav className="sidebar__nav">
        <ul className="sidebar__nav-links">

          {/* <li className="sidebar__nav-links-item">
            <NavLink to="/scatchpad" className="sidebar__link" activeClassName="sidebar__link--active">
              <span className="sidebar__icon sidebar__nav-icon material-icons-outlined">content_paste</span>
              <span>Scatchpad</span>
            </NavLink>
          </li> */}

          <li className="sidebar__nav-links-item">
            <NavLink to="/notes" className="sidebar__link" activeClassName="sidebar__link--active">
              <span className="sidebar__icon sidebar__nav-icon material-icons-outlined">book</span>
              <span>Notes</span>
            </NavLink>
          </li>

          <li className="sidebar__nav-links-item">
            <NavLink to="/favorites" className="sidebar__link" activeClassName="sidebar__link--active">
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
          <div className="sidebar__categories-title-body" onClick={handlers.handleCategoriesTitleBodyClick}>
            <span className={`sidebar__icon sidebar__arrow-icon material-icons-outlined ${categoriesListVisibility || 'sidebar__arrow-icon--rotated'}`}>
              expand_more
            </span>
            <span className="sidebar__categories-text">Categories</span>
          </div>
          <button className="sidebar__add-category-btn" type="button" onClick={handlers.handleAddCategoryBtnClick}>
            <span className="sidebar__icon sidebar__add-icon material-icons-outlined">add</span>
          </button>
        </h2>

        {categoriesListVisibility && (
          <ul className="sidebar__categories-list">
            {categories.map((category) => (
              <li className="sidebar__categories-list-item" key={category.id}>
                <SidebarCategory data={category} />
              </li>
            ))}
          </ul>
        )}

        <form
          className={`sidebar__add-category-form ${!addCategoryFormVisibility && 'sidebar__add-category-form--hidden'}`}
          onSubmit={createCategoryForm.handleSubmit}
        >
          <input
            type="text"
            className={`sidebar__category-name-input ${createCategoryForm.touched.name && createCategoryForm.errors.name && 'sidebar__category-name-input--error'}`}
            ref={addCategoryInputRef}
            placeholder="Category name..."
            {...createCategoryForm.getFieldProps('name')}
          />
        </form>

      </div>

    </aside>
  )
}


export default Sidebar
