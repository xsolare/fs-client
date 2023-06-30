import { Global } from '@emotion/react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './pages/App'
import { GlobalStyles } from './styles/common'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <>
    <Global styles={GlobalStyles} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
)
