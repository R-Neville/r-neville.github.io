import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import Main from './layout/Main'
import { store } from './store'

class App {
    public init() {
        return createRoot(document.getElementById('root')!).render(
            <StrictMode>
                <Provider store={store}>
                    <Main />
                </Provider>
            </StrictMode>,
        )
    }
}

export default App
