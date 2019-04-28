import React from 'react';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './state/store';

// Router
import { BrowserRouter } from 'react-router-dom';

// SubComponents
import Header from './components/Layout/Header';
import MainBody from './components/Layout/Body';
// import Footer from './components/Layout/Footer';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <div className="flex-vert">
            <Header />
            <div className="mainbody container">
              <MainBody />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
