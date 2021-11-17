import { useAppDispatch, useAppSelector } from "hooks/redux"
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import { selectCategories, selectCategoryById } from "redux/reducers/categoriesReducer"
import { notesActions, NoteType, selectSelectedNoteId } from "redux/reducers/notesReducer"

type Props = {
  classes?: {
    root?: string
  },
  data: NoteType
}

const Note = (props: Props) => {
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const categories = useAppSelector(selectCategories)
  const noteId = useAppSelector(selectSelectedNoteId)
  const noteCategory = useAppSelector((state) => props.data.categoryId ? selectCategoryById(state, props.data.categoryId) : null)

  const menuRef = useRef<HTMLDivElement>(null!)

  const outsideMenuClickHandlerRef = useRef((e: Event) => {
    if (!menuRef.current.contains(e.target as Node)) {
      setMenuVisibility(false)
    }
  })

  useEffect(() => {
    if (menuVisibility) {
      document.addEventListener('click', outsideMenuClickHandlerRef.current)
    } else {
      document.removeEventListener('click', outsideMenuClickHandlerRef.current)
    }
  }, [menuVisibility])

  const isCurrentNoteSelected = (): boolean => {
    return Boolean(noteId === props.data.id)
  }

  const handlers = {
    handleOpenMenuBtnClick(e: SyntheticEvent) {
      e.stopPropagation()

      menuVisibility || setMenuVisibility(true)
    },
    handleNoteClick() {
      dispatch(notesActions.setSelectedNoteId(props.data.id))
    },
    handleMoveToFavoriteBtnClick() {
      dispatch(notesActions.setIsNoteFavorite({ noteId: props.data.id, to: false }))
    }
  }

  return (
    <div className={`note ${props.classes?.root} ${isCurrentNoteSelected() && 'note--active'}`} onClick={handlers.handleNoteClick}>

      <div className="note__left">
        <span className="note__icon note__star-icon material-icons-outlined">grade</span>
      </div>

      <div className="note__center">
        <div className="note__title">
          {props.data.title}
        </div>
        <div className={`note__category ${noteCategory || 'note__category--hidden'}`}>
          <span className="note__icon note__folder-icon material-icons-outlined">folder</span>
          <span className="note__category-name">
            {noteCategory?.name}
          </span>
        </div>
      </div>

      <div className="note__right">
        <button className="note__open-menu-btn" onClick={handlers.handleOpenMenuBtnClick}>
          <span className="note__icon note__more-icon material-icons-outlined">more_vert</span>

          <div className={`note__menu ${menuVisibility || 'note__menu--hidden'}`} ref={menuRef}>

            <div className="note__menu-select-wrapper">
              <select className="note__menu-select">
                {categories.map((category) => (
                  <option value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <ul className="note__menu-actions">

              <li className="note__menu-action">
                <button className="note__menu-btn" type="button" onClick={handlers.handleMoveToFavoriteBtnClick}>
                  <span className="note__icon note__menu-icon note__star-icon material-icons-outlined">grade</span>
                  <span className="note__menu-btn-text">Mark as favorite</span>
                </button>
              </li>

              <li className="note__menu-action">
                <button className="note__menu-btn" type="button">
                  <span className="note__icon note__menu-icon note__trash-icon material-icons-outlined">delete</span>
                  <span className="note__menu-btn-text">Move to trash</span>
                </button>
              </li>

              <li className="note__menu-action">
                <button className="note__menu-btn" type="button">
                  <span className="note__icon note__menu-icon note__download-icon material-icons-outlined">download</span>
                  <span className="note__menu-btn-text">Download</span>
                </button>
              </li>

              <li className="note__menu-action">
                <button className="note__menu-btn" type="button">
                  <span className="note__icon note__menu-icon note__close-icon material-icons-outlined">close</span>
                  <span className="note__menu-btn-text">Remove category</span>
                </button>
              </li>

            </ul>
          </div>
        </button>
      </div>

    </div>
  )
}

export default Note
