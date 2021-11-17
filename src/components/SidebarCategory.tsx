import { FormikErrors, useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { categoriesActions, Category, selectCategories } from 'redux/reducers/categoriesReducer'
import { RootState } from 'redux/store'



type Props = PropsFromRedux & {
  data: Category
}

type PropsFromRedux = ConnectedProps<typeof connector>

type RenameCategoryFormValues = {
  name: string
}

const SidebarCategory = (props: Props) => {
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false)
  const [renameInputVisibility, setRenameInputVisibility] = useState<boolean>(false)

  const renameCategoryForm = useFormik<RenameCategoryFormValues>({
    initialValues: {
      name: ''
    },
    validate(v: RenameCategoryFormValues) {
      const errors: FormikErrors<RenameCategoryFormValues> = {}

      const categoryWithNameExists = (name: string): boolean => {
        const category = props.categories.find((e) => e.name === name)

        return Boolean(category)
      }

      if (!v.name.trim()) {
        errors.name = 'Empty name'
      } else if (v.name.trim() !== props.data.name && categoryWithNameExists(v.name.trim())) {
        errors.name = 'Dumplicate name'
      }
      
      return errors
    },
    onSubmit(v: RenameCategoryFormValues) {
      props.renameCategory({ categoryId: props.data.id, newName: v.name })
      setRenameInputVisibility(false)
    }
  })

  const menuRef = useRef<any>(null)
  const renameInputRef = useRef<HTMLInputElement>(null!)

  const outsideMenuClickHandlerRef = useRef((e: Event) => {
    if ( !menuRef.current?.contains(e.target) ) {
      setMenuVisibility(false)
    }
  })

  const outsideRenameInputClickHandlerRef = useRef((e: Event) => {
    if ( !menuRef.current?.contains(e.target) ) {
      setRenameInputVisibility(false)
    }
  })

  const match = useRouteMatch(`/category/${props.data.id}`)

  useEffect(() => {
    if (menuVisibility) {
      document.addEventListener('click', outsideMenuClickHandlerRef.current)
    } else {
      document.removeEventListener('click', outsideMenuClickHandlerRef.current)
    }
  }, [menuVisibility])

  useEffect(() => {
    if (renameInputVisibility) {
      document.addEventListener('click', outsideRenameInputClickHandlerRef.current)
    } else {
      document.removeEventListener('click', outsideRenameInputClickHandlerRef.current)
    }
  }, [renameInputVisibility])

  useEffect(() => {
    if (renameInputVisibility) {
      renameInputRef.current.focus()
      initRenameCategoryForm()
    }
  }, [renameInputVisibility])

  const initRenameCategoryForm = () => {
    renameCategoryForm.setValues({ name: props.data.name })
  }

  const handleMoreBtnClick = () => {
    !menuVisibility && setMenuVisibility(true)
  }

  const handleDeleteCategoryBtnClick = () => [
    props.deleteCategory(props.data.id)
  ]

  const handleRenameCategoryBtnClick = () => {
    setRenameInputVisibility(true)

    setMenuVisibility(false)
  }

  return (
    <div className={`sidebar-category ${match?.isExact && 'sidebar-category--active'}`}>
      <div className="sidebar-category__body">
        <span className="sidebar-category__icon sidebar-category__folder-icon material-icons-outlined">folder</span>
        {renameInputVisibility ? (
          <form className="sidebar-category__rename-form" onSubmit={renameCategoryForm.handleSubmit}>
            <input
              type="text"
              className={`sidebar-category__rename-input ${renameCategoryForm.touched.name && renameCategoryForm.errors.name && 'sidebar-category__rename-input--error'}`}
              ref={renameInputRef}
              {...renameCategoryForm.getFieldProps('name')}
            />
          </form>
        ) : (
          <NavLink
            to={`/category/${props.data.id}`}
            className="sidebar-category__name"
            activeClassName="sidebar-category--active"
          >
            {props.data.name}
          </NavLink>
        )}
      </div>
      <div className="sidebar-category__open-menu-btn" onClick={handleMoreBtnClick}>
        <span className="sidebar-category__icon sidebar-category__more-icon material-icons-outlined">more_vert</span>

        <div className={`sidebar-category__menu ${menuVisibility || 'sidebar-category__menu--hidden'}`} ref={menuRef}>
          <button className="sidebar-category__menu-btn sidebar-category__menu-edit-btn" type="button" onClick={handleRenameCategoryBtnClick}>
            <span className="sidebar-category__icon sidebar-category__menu-icon material-icons-outlined">edit</span>
            Rename category
          </button>
          <button className="sidebar-category__menu-btn sidebar-category__menu-delete-btn" type="button" onClick={handleDeleteCategoryBtnClick}>
            <span className="sidebar-category__icon sidebar-category__menu-icon material-icons-outlined">close</span>
            Delete permanently
          </button>
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  categories: selectCategories(state)
})

const mapDispatchToProps = {
  deleteCategory: categoriesActions.deleteCategory,
  renameCategory: categoriesActions.renameCategory
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(SidebarCategory)
