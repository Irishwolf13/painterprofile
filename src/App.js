import './App.css';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage.jsx';
import { Routes, Route } from "react-router-dom";
import { selectUsers } from "./store/usersSlice.js";
import { useSelector } from "react-redux";
import Header from './components/Header.jsx'

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
