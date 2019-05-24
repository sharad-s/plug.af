import React from 'react';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './state/store';

// Router
import { BrowserRouter, Route } from 'react-router-dom';

// SubComponents
import Header from './components/Layout/Header';
// import MainBody from './components/Layout/Body';
import AudioPage from './components/AudioPage';
// import Footer from './components/Layout/Footer';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
            <Header />
            <div className="mainbody">
             <Route exact path="/" component={AudioPage} />
             <Route exact path="/:shortID" component={AudioPage} />
            </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
