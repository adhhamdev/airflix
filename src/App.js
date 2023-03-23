import logo from "./images/logo.jpg";
import profile from "./images/profile.jpg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <a href="/">
          <img className="logo" src={logo} alt="Airflix logo" role="banner" />
        </a>
        <div className="userActions">
          <img className="profile" src={profile} alt="User Profie" />
          <i className="fas fa-life-ring"></i>
        </div>
      </header>
      <nav>
        <a href="/" role="button">
          <i className="fas fa-compass"></i>
        </a>
        <a href="#" role="button">
          <i className="fas fa-search"></i>
        </a>
        <a href="#" role="button">
          <i className="fas fa-play"></i>
        </a>
        <a href="#" role="button">
          <i className="fas fa-list-ul"></i>
        </a>
        <a href="#" role="button">
          <i className="fab fa-heart"></i>
        </a>
        <a href="#" role="button">
          <i className="fas fa-lines-leaning"></i>
        </a>
      </nav>
    </div>
  );
}
export default App;
