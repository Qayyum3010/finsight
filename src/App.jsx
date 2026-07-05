import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import TransactionsPage from './pages/TransactionsPage.jsx';
import GoalsPage from './pages/GoalsPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/goals" element={<GoalsPage />} />
    </Routes>
  );
}

export default App;
