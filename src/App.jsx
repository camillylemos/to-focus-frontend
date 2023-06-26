import { HelmetProvider } from 'react-helmet-async'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import { CadastroScreen, HomeScreen, LoginScreen } from '@screen'
import { Footer, Header } from '@components'
import {
  AlertGlobalProvider,
  RoutesConfigGlobalProvider,
  TokenGlobalProvider,
  UserGlobalProvider,
} from '@contexts'
import './App.scss'

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#F29166',
    },
    secondary: {
      main: '#2E7F7B',
    },
    tertiary: {
      main: '#808080',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  components: {
    MuiTextarea: {
      defaultProps: {
        disableFocusRipple: true,
      },
    },
  },
})

function App() {
  return (
    <>
      <div className="App">
        <RoutesConfigGlobalProvider>
          <HelmetProvider>
            <AlertGlobalProvider>
              <TokenGlobalProvider>
                <UserGlobalProvider>
                  <ThemeProvider theme={defaultTheme}>
                    <Header />
                    <Routes>
                      <Route path="/" element={<HomeScreen />} exact />
                      <Route path="/login" element={<LoginScreen />} exact />
                      <Route
                        path="/cadastro"
                        element={<CadastroScreen />}
                        exact
                      />
                    </Routes>
                    <Footer />
                  </ThemeProvider>
                </UserGlobalProvider>
              </TokenGlobalProvider>
            </AlertGlobalProvider>
          </HelmetProvider>
        </RoutesConfigGlobalProvider>
      </div>
    </>
  )
}

export default App
