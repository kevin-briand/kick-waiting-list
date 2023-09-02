import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { WaitingList } from './waitingList/waiting_list';


export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<WaitingList />} />
        </Routes>
      </Router>
    </div>
  );
}
