import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import ManageNotes from './pages/ManageNotes';



function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes >
            <Route path="/" element={<Home />}/>
            <Route path="/note" element={<ManageNotes />} />
            <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App