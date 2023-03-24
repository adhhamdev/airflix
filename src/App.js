import logo from "./images/logo.jpg";
import profile from "./images/profile.jpg";
import "./App.css";
import { Outlet, NavLink } from "react-router-dom";

const App = () => {
  const setLinkState = ({isActive, isPending}) => {
    return isActive ? "active" : isPending ? "pending" : "";
  }
  return (
    <div className="App">
      <header>
        <a href="/">
          <img className="logo" src={logo} alt="Airflix logo" role="banner" />
        </a>
        <div className="userActions">
          <nav>
            <NavLink className={setLinkState} to="/" role="button" data-tooltip="Discover">
              <i className="fas fa-compass"></i>
            </NavLink>
            <NavLink className={setLinkState} to="search" role="button" data-tooltip="Search">
              <i className="fas fa-search"></i>
            </NavLink>
            <NavLink className={setLinkState} to="watchlist" role="button" data-tooltip="Watchlist">
              <i className="fas fa-play"></i>
            </NavLink>
            <NavLink className={setLinkState} to="lists" role="button" data-tooltip="Lists">
              <i className="fas fa-list-ul"></i>
            </NavLink>
            <NavLink className={setLinkState} to="favorites" role="button" data-tooltip="Favorites">
              <i className="fas fa-heart"></i>
            </NavLink>
            <NavLink className={setLinkState} to="collections" role="button" data-tooltip="Collections">
              <i className="fas fa-lines-leaning"></i>
            </NavLink>
          </nav>
          <img className="profile" src={profile} alt="User Profie" data-tooltip="Profile"/>
          <i className="fas fa-life-ring support" data-tooltip="Support"></i>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default App;
