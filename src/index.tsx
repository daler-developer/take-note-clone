import App from 'components/App'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from 'redux/store'


ReactDOM.render(
  <StrictMode>
    <BrowserRouter basename="/take-note-clone">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)
