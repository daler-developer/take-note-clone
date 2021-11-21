import { useAppSelector } from "hooks/redux"
import { SyntheticEvent, useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useDispatch } from "react-redux"
import { notesActions, selectNoteById, selectSelectedNoteId } from "redux/reducers/notesReducer"
import { copy, downloadFile, getFirstLineOfString } from "utils/helpers"

type Props = {
  classes?: {
    root?: string
  },
  isScatchpad?: boolean
}

const Editor = (props: Props) => {
  const [noteTempContentInputValue, setNoteTempContentInputValue] = useState<string>('Temp')
  const [panelSelected, setPanelSelected] = useState<'editor' | 'preview' | null>(null)

  const dispatch = useDispatch()

  const selectedNote = useAppSelector((state) => {
    const selectedNoteId = selectSelectedNoteId(state)
    if (selectedNoteId) {
      return selectNoteById(state, selectedNoteId)
    } else {
      return null
    }
  })

  useEffect(() => {
    if (selectedNote) {
      setPanelSelected('editor')
    }
  }, [selectedNote])

  useEffect(() => {
    if (selectedNote) {
      console.log(selectedNote.content)
      dispatch(notesActions.setNoteTitle({ noteId: selectedNote.id, to: getFirstLineOfString(selectedNote.content) }))
    }
  }, [selectedNote?.content])

  const handlers = {
    handlePreviewBtnClick() {
      setPanelSelected('preview')
    },
    handleEditBtnClick() {
      setPanelSelected('editor')
    },
    handleMoveToTrashBtnClick() {
      if (selectedNote) {
        dispatch(notesActions.sendNoteToTrash({ noteId: selectedNote.id }))
      }
    },
    handleToggleFavoriteFavoriteBtnClick() {
      if (selectedNote) {
        dispatch(notesActions.setIsNoteFavorite({ noteId: selectedNote.id, to: !selectedNote.isFavorite }))
      }
    },
    handleCopyBtnClick() {
      if (selectedNote) {
        copy(selectedNote.content) 
      }
    },
    handleDownloadFileBtnClick() {
      if (selectedNote) {
        downloadFile(selectedNote?.content, 'hello.md')
      }
    },
    handleTextareaInputChange(e: SyntheticEvent) {
      const target = (e.target as HTMLInputElement)
      dispatch(notesActions.setNoteContent({ noteId: selectedNote!.id, to: target.value }))
    }
  }

  return (
    <div className={`editor ${props.classes?.root}`}>

      {panelSelected === null && (
        <div className="editor__body editor__welcome">
          <h2 className="h5">Select any note</h2>
        </div>
      )}

      {panelSelected === 'editor' &&  (
        <div className="editor__body editor__textarea-wrapper">
          <textarea
            className="editor__textarea"
            value={props.isScatchpad ? noteTempContentInputValue : selectedNote?.content}
            onChange={handlers.handleTextareaInputChange}
            placeholder="Type content"
          ></textarea>
        </div>
      )}

      {panelSelected === 'preview' && (
        <div className="editor__body editor__markdown-wrapper">
          <ReactMarkdown className="editor__markdown">
            {selectedNote?.content || ''}
          </ReactMarkdown>
        </div>
      )}

      <div className="editor__footer">

        <div className={`editor__footer-btns ${selectedNote || 'editor__footer-btns--hidden'}`}>

          {panelSelected !== 'preview' && (
            <button className="editor__footer-btn" onClick={handlers.handlePreviewBtnClick}>
              <span className="editor__icon editor__footer-icon editor__eye-icon material-icons-outlined">visibility</span>
            </button>
          )}
          
          {panelSelected !== 'editor' && (
            <button className="editor__footer-btn" onClick={handlers.handleEditBtnClick}>
              <span className="editor__icon editor__footer-icon editor__eye-icon material-icons-outlined">content_paste</span>
            </button>
          )}

          {!props.isScatchpad && <>
            <button className="editor__footer-btn" onClick={handlers.handleToggleFavoriteFavoriteBtnClick}>
              <span className="editor__icon editor__footer-icon editor__star-icon material-icons-outlined">grade</span>
            </button>

            <button className="editor__footer-btn" onClick={handlers.handleMoveToTrashBtnClick}>
              <span className="editor__icon editor__footer-icon editor__delete-icon material-icons-outlined">delete</span>
            </button>
          </>}

          <button className="editor__footer-btn" onClick={handlers.handleDownloadFileBtnClick}>
            <span className="editor__icon editor__footer-icon editor__delete-icon material-icons-outlined">file_download</span>
          </button>

          <button className="editor__footer-btn" onClick={handlers.handleCopyBtnClick}>
            <span className="editor__icon editor__footer-icon editor__delete-icon material-icons-outlined">content_copy</span>
          </button>

        </div>

      </div>
      
    </div>
  )
}

export default Editor
