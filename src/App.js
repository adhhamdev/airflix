import logo from "./images/logo.jpg";
import profile from "./images/profile.jpg";
import "./App.css";
import { Outlet, NavLink, useNavigation } from "react-router-dom";

const App = () => {
  const navigation = useNavigation();
  const setLinkState = ({isActive, isPending}) => {
    return isActive ? "active" : isPending ? "pending" : "";
  }
  const genres = [
    {id: 28, name: "Action"},
    {id: 12, name: "Adventure"},
    {id: 16, name: "Animation"},
    {id: 35, name: "Comedy"},
    {id: 80, name: "Crime"},
    {id: 99, name: "Documentary"},
    {id: 18, name: "Drama"},
    {id: 10751, name: "Family"},
    {id: 14, name: "Fantasy"},
    {id: 36, name: "History"},
    {id: 27, name: "Horror"},
    {id: 10402, name: "Music"},
    {id: 9648, name: "Mystery"},
    {id: 10749, name: "Romance"},
    {id: 878, name: "Science Fiction"},
    {id: 10770, name: "TV Movie"},
    {id: 53, name: "Thriller"},
    {id: 10752, name: "War"},
    {id: 37, name: "Western"}
  ];
  
  return (
    <div className="App">
      <header className={(navigation.state == 'submitting' || navigation.state == 'loading') ? 'blackout': null}>
        <a href="/">
          <img className="logo" src={logo} alt="Airflix logo" role="banner" />
        </a>
        <div className="userActions">
          <nav>
            <NavLink className={setLinkState} to="/" role="button" data-tooltip="HOME">
              <i className="fas fa-compass"></i>
            </NavLink>
            <NavLink className={setLinkState} to="search" role="button" data-tooltip="SEARCH">
              <i className="fas fa-search"></i>
            </NavLink>
            <NavLink className={setLinkState} to="watchlist" role="button" data-tooltip="WATCHLIST">
              <i className="fas fa-play"></i>
            </NavLink>
            <NavLink className={setLinkState} to="lists" role="button" data-tooltip="LISTS">
              <i className="fas fa-list-ul"></i>
            </NavLink>
            <NavLink className={setLinkState} to="favorites" role="button" data-tooltip="FAVORITES">
              <i className="fas fa-heart"></i>
            </NavLink>
            <NavLink className={setLinkState} to="collections" role="button" data-tooltip="COLLECTIONS">
              <i className="fas fa-lines-leaning"></i>
            </NavLink>
          </nav>
          <img className="profile" src={profile} alt="User Profie" title="PROFILE"/>
          <i className="fas fa-life-ring support" title="SUPPORT"></i>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default App;
