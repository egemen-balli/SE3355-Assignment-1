import './App.css'
import Navbar from './components/Navbar';
import SpecialOffers from './components/SpecialOffers';
import Slider from './components/Slider';
import Recommended from './components/Recommended';
import Visited from './components/Visited';

function App() {

  return (
    <>
      <Navbar />
      <div className="page-container">
        <SpecialOffers />
        <Slider />
        <Recommended />
        <Visited />
      </div>
    </>
  )
}

export default App
