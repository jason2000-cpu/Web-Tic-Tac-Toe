import { GameProvider } from './Contexts/GameContext';
import TicTacToe from './components/TicTacToe';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Leaderboard from './pages/Leaderboard';



function App() {
  return (
    <div className="bg-[#473535] h-[100vh] text-white">
      <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
