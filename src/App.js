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
          <nav>
            <a href="/" role="button" data-tooltip="Discover">
              <i className="fas fa-compass"></i>
            </a>
            <a href="#" role="button" data-tooltip="Search">
              <i className="fas fa-search"></i>
            </a>
            <a href="#" role="button" data-tooltip="Watchlist">
              <i className="fas fa-play"></i>
            </a>
            <a href="#" role="button" data-tooltip="Lists">
              <i className="fas fa-list-ul"></i>
            </a>
            <a href="#" role="button" data-tooltip="Favorites">
              <i className="fas fa-heart"></i>
            </a>
            <a href="#" role="button" data-tooltip="Collections">
              <i className="fas fa-lines-leaning"></i>
            </a>
          </nav>
          <img className="profile" src={profile} alt="User Profie" data-tooltip="Profile"/>
          <i className="fas fa-life-ring support" data-tooltip="Support"></i>
        </div>
      </header>
    </div>
  );
}
export default App;
