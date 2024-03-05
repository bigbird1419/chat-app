import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react';

import './App.css';
import { publicRoutes } from './routes'
import DefaultLayout from './layouts/DefaultLayout'
import { AuthContext } from './contexts/AuthContext'
import Home from './pages/Home';

function App() {
  const { curUser } = useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    if (!curUser) {
      return <Navigate to={'/login'} />
    }
    return children
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index element={
            <ProtectedRoute>
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            </ProtectedRoute>
          } />
          {publicRoutes.map((route, ind) => {
            const Page = route.component
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            }
            return (
              <Route
                key={ind}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
