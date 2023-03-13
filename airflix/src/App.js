import './App.css';
import logo from './images/logo.jpg'
import profile from './images/profile.jpg'
import Lottie from 'lottie-react'
import discoverIcon from './lotties/discover.json'

function App() {
  return (
    <div className="App">
      <header>
        <img className='logo' src={logo} alt="Airflix logo" role='banner' />
        <img className='profile' src={profile} alt="User Profie" />
      </header>
      <nav>
        <a href="/" role='button'><Lottie animationData={discoverIcon} autoplay={true} style={{width: 60}} /></a>
        <a href="#" role='button'></a>
        <a href="#" role='button'></a>
        <a href="#" role='button'></a>
        <a href="#" role='button'></a>
        <a href="#" role='button'></a>
      </nav>
    </div>
  );
}

export default App;
