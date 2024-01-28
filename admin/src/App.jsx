import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Admin from './Pages/Admin/Admin';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Admin />
      </BrowserRouter>
    </div>
  );
}

export default App;
