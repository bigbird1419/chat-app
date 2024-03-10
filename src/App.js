import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react';

import './App.css';
import { publicRoutes } from './routes'
import DefaultLayout from './layouts/DefaultLayout'
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { curUser } = useContext(AuthContext)

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, ind) => {
            // console.log(Object.keys(curUser).length)
            // if (Object.keys(curUser).length === 0) {
            //   return <Navigate key={ind} to='/login' />
            // }

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
