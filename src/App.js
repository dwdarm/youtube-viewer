import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import InitialProps from './InitialProps';
import Index from './pages/Index';
import Category from './pages/Category';
import Video from './pages/Video';
import Search from './pages/Search';

const store = configureStore();

function App() {
  return (
    <div>
      <Provider store={store}>
        <InitialProps>
          <BrowserRouter>
            <Switch>
              <Route path="/search/:keyword"><Search/></Route>
              <Route path="/video/:id"><Video/></Route>
              <Route path="/category/:id"><Category/></Route>
              <Route path="/"><Index/></Route>
            </Switch>
          </BrowserRouter>
        </InitialProps>
      </Provider>
    </div>
  );
}

export default App;
