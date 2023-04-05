import logo from "./images/cover.png";
import profile from "./images/icon.png";
import "./App.css";
import { Outlet, NavLink, useNavigation } from "react-router-dom";

const App = () => {
  const navigation = useNavigation();
  const setLinkState = ({isActive, isPending}) => {
    return isActive ? "active" : isPending ? "pending" : "";
  }
  
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
            <NavLink className={setLinkState} to="rated" role="button" data-tooltip="RATED">
              <i className="fas fa-star"></i>
            </NavLink>
          </nav>
          <img className="profile" src={profile} alt="User Profie" title="PROFILE"/>
          <i className="fas fa-life-ring support" title="SUPPORT"></i>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <small>&copy;Copyright {new Date().getFullYear()} • built by Adhham Dev with ❤️ • All Rights Reserved</small>
      </footer>
    </div>
  );
}
export default App;
