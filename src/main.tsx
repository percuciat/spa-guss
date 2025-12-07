import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import { store } from '@/store'
import { App } from './App'
import './index.css'

const theme = createTheme({
  primaryColor: 'cyan',
  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262b',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>
)

