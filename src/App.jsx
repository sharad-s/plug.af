import React from 'react';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './state/store';

// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// SubComponents
import Header from './components/Layout/Header';
// import MainBody from './components/Layout/Body';
import AudioPage from './components/AudioPage';
import PreviewPage from './pages/PreviewPage';
import HomePage from './pages/HomePage';
// import Footer from './components/Layout/Footer';

// Redux Functions
import { pauseSnippet } from './features/audioplayer/actions';

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
