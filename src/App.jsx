import React from 'react';
import isEmpty from "./utils/isEmpty";
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './state/store';

// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// SubComponents
import Header from './components/Layout/Header';
// import MainBody from './components/Layout/Body';
import AudioPage from './pages/AudioPage';
import PreviewPage from './pages/PreviewPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExplorePage from './pages/ExplorePage';



// import Footer from './components/Layout/Footer';

// Redux Functions
import { pauseSnippet } from './features/audioplayer/actions';

// Auth
import { setCurrentUser } from './features/auth/actions';
import {addToken} from './utils/setAuthToken';


// 
// Check for token
if (!isEmpty(localStorage.jwtToken)) {
  console.log(localStorage.jwtToken, typeof localStorage.jwtToken)

  addToken(localStorage.jwtToken)

  // // Check for expired token
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  //   // Logout user
  //   store.dispatch(logoutUser());
  //   // Clear current Profile

  //   // Redirect to login
  //   // window.location.href = "/login";
  // }
}



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="mainbody">
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  pauseSnippet();
                  return <HomePage />;
                }}
              />
              <Route
                exact
                path="/login"
                render={() => {
                  pauseSnippet();
                  return <LoginPage />;
                }}
              />
              <Route
                exact
                path="/register"
                render={() => {
                  pauseSnippet();
                  return <RegisterPage />;
                }}
              />
              <Route
                exact
                path="/explore"
                render={() => {
                  pauseSnippet();
                  return <ExplorePage />;
                }}
              />
              <Route exact path="/preview/:shortID" component={PreviewPage} />
              <Route exact path="/:shortID" component={AudioPage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
