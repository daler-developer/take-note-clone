import { useAppDispatch, useAppSelector } from "hooks/redux"
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import { selectCategories, selectCategoryById } from "redux/reducers/categoriesReducer"
import { notesActions, NoteType, selectSelectedNoteId } from "redux/reducers/notesReducer"
import { downloadFile } from "utils/helpers"

type Props = {
  classes?: {
    root?: string
  },
  data: NoteType
}

const Note = (props: Props) => {
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false)
  const [categorySelectValue, setCategorySelectValue] = useState<string | null>(null)

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
    setCategorySelectValue(noteCategory?.id || null)
  }, [])

  useEffect(() => {
    if (menuVisibility) {
      document.addEventListener('click', outsideMenuClickHandlerRef.current)
    } else {
      document.removeEventListener('click', outsideMenuClickHandlerRef.current)
    }

    return () => {
      document.removeEventListener('click', outsideMenuClickHandlerRef.current)
    }
  }, [menuVisibility])

  const isCurrentNoteSelected = (): boolean => {
    return Boolean(noteId === props.data.id)
  }

  const hideMenu = () => setMenuVisibility(false)

  const handlers = {
    handleOpenMenuBtnClick(e: SyntheticEvent) {
      e.stopPropagation()
      menuVisibility || setMenuVisibility(true)
    },
    handleNoteClick() {
      dispatch(notesActions.setSelectedNoteId(props.data.id))
      hideMenu()
    },
    handleMoveToFavoriteBtnClick() {
      dispatch(notesActions.setIsNoteFavorite({ noteId: props.data.id, to: true }))
      hideMenu()
    },
    handleRemoveFromFavoriteBtnClick() {
      dispatch(notesActions.setIsNoteFavorite({ noteId: props.data.id, to: false }))
      hideMenu()
    },
    handleMoveToTrashBtnClick() {
      dispatch(notesActions.sendNoteToTrash({ noteId: props.data.id }))
      hideMenu()
    },
    handleRemoveCategoryBtnClick() {
      dispatch(notesActions.setNoteCategory({ noteId: props.data.id, to: null }))
      hideMenu()
    },
    handleCategorySelectChange(e: SyntheticEvent) {
      setCategorySelectValue( (e.target as HTMLSelectElement).value )
      dispatch(notesActions.setNoteCategory({ noteId: props.data.id, to: (e.target as HTMLSelectElement).value} ))
      hideMenu()
    },
    handleRestoreFromTrashBtnClick() {
      dispatch(notesActions.restoreNoteFromTrash(props.data.id))
      hideMenu()
    },
    handleDeletePermanentlyBtnClick() {
      dispatch(notesActions.deleteNote(props.data.id))
      hideMenu()
    },
    handleDownloadBtnClick() {
      if (props.data.content.trim()) {
        downloadFile(props.data.content, 'readme.md')
      }
    }
  }

  return (
    <div className={`note ${props.classes?.root} ${isCurrentNoteSelected() && 'note--active'}`} onClick={handlers.handleNoteClick}>

      <div className="note__left">
        <span className={`note__icon note__star-icon material-icons-outlined ${props.data.isFavorite || 'note__star-icon--hidden'}`}>grade</span>
      </div>

      <div className="note__center">
        <div className="note__title">
          {props.data.title.trim() ? props.data.title.trim() : 'New Note'}
        </div>
        <div className={`note__category`}>
          <span className="note__icon note__folder-icon material-icons-outlined">folder</span>
          <span className="note__category-name">
            {noteCategory ? noteCategory.name : 'No category'}
          </span>
        </div>
      </div>

      <div className="note__right">
        <button className="note__open-menu-btn" onClick={handlers.handleOpenMenuBtnClick}>
          <span className="note__icon note__more-icon material-icons-outlined">more_vert</span>

          <div className={`note__menu ${menuVisibility || 'note__menu--hidden'}`} ref={menuRef}>

            <div className="note__menu-select-wrapper">
              <select className="note__menu-select" value={categorySelectValue || ''} onChange={handlers.handleCategorySelectChange}>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <ul className="note__menu-actions">

              <li className="note__menu-action">
                <button
                  className="note__menu-btn"
                  type="button"
                  onClick={props.data.isFavorite ? handlers.handleRemoveFromFavoriteBtnClick : handlers.handleMoveToFavoriteBtnClick }
                >
                  <span className="note__icon note__menu-icon note__star-icon material-icons-outlined">grade</span>
                  <span className="note__menu-btn-text">
                    {props.data.isFavorite ? 'Remove from favorite' : 'Mark as favorite'}
                  </span>
                </button>
              </li>

              {props.data.isInTrash ? (
                <>
                  <li className="note__menu-action">
                    <button className="note__menu-btn note__menu-remove-note-btn" type="button" onClick={handlers.handleRestoreFromTrashBtnClick}>
                      <span className="note__icon note__menu-icon note__arrow-back-icon material-icons-outlined">arrow_back</span>
                      <span className="note__menu-btn-text">Restore from trash</span>
                    </button>
                  </li>

                  <li className="note__menu-action">
                    <button className="note__menu-btn note__menu-delete-note-btn" type="button" onClick={handlers.handleDeletePermanentlyBtnClick}>
                      <span className="note__icon note__menu-icon note__close-icon material-icons-outlined">close</span>
                      <span className="note__menu-btn-text">Delete permanently</span>
                    </button>
                  </li>
                </>
              ) : (
                <li className="note__menu-action">
                  <button className="note__menu-btn note__menu-move-to-trash-note-btn" type="button" onClick={handlers.handleMoveToTrashBtnClick}>
                    <span className="note__icon note__menu-icon note__trash-icon material-icons-outlined">delete</span>
                    <span className="note__menu-btn-text">Move to trash</span>
                  </button>
                </li>
              )}

              <li className="note__menu-action">
                <button className="note__menu-btn" type="button" onClick={handlers.handleDownloadBtnClick}>
                  <span className="note__icon note__menu-icon note__download-icon material-icons-outlined">download</span>
                  <span className="note__menu-btn-text">Download</span>
                </button>
              </li>

              <li className="note__menu-action">
                <button className="note__menu-btn" type="button" onClick={handlers.handleRemoveCategoryBtnClick}>
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
