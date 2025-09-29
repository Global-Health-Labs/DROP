import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";

import MainWorkListPage from "./components/MainWorkListPage";
import ResultOutput from './components/ResultOutput';
import InteractiveInstruction from './components/InteractiveInstruction';

/**
 * Register router for all supported components in the applications.
 * @returns the main component when displays the webpage
 */
function App() {
    
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route exact path="/" element={<MainWorkListPage />} />
          <Route path="/result" element={<ResultOutput />} />
          <Route path="/instruction" element={<InteractiveInstruction />} />
          
          {/* If any route mismatches the upper route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </div>
    </Router>
    
  );
}

export default App;
