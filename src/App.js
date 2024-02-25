import './App.css';
import LoginPage from './views/LoginPage/LoginPage.jsx';
import HomePage from './views/HomePage/HomePage.jsx';
import { Routes, Route } from "react-router-dom";
import { selectUsers } from "./store/usersSlice.js";
import { useSelector } from "react-redux";
import Header from './components/Header/Header.jsx'

function App() {

  const user = useSelector(selectUsers);

  return (
    <div className="App">
      <Header />
      {user.currentUser ?
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      :
      <LoginPage />
    }
    </div>
  );
}

export default App;
