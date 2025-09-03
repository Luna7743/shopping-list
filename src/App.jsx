//ルーティング＆認証制御
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from "./pages/LoginPage"
// import db from "./firebase"

function App() {

  return (
    <>
  <Login/>

      {/* <BrowsetRouter>
        <Routes> */}
          {/* {!user ? (
            <Route path='/*' element={<Login/>} />
          ) : (
              <>
                <Route path='' element />
                <Route path='' element/>
                <Route path='' element />
              </>
          )} */}
      {/* </Routes>
      </BrowsetRouter> */}
    </>
  )
}

export default App
