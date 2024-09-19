import './App.css';
import {Home,Searched,NavBar, Recipe} from './components'
import {Route, Router, Routes, useLocation} from 'react-router-dom'

function App() {
  const location = useLocation();
  return (
    <Routes Location={location} key={location.pathname}>
      <Route key={'Home'} exact path="/" element={[<NavBar/>,<Home/>]}/>
      <Route key={'Searched'} path="/Searched/:search" element={[<NavBar/>,<Searched/>]}/>
      <Route path="/Recipe/:name" element={[<NavBar/>,<Recipe/>]}/>
    </Routes>
  );
}
export default App;
