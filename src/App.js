import React from 'react';
import { Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (

      <div>

        <p>TrybeTunes</p>
        <switch>
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
          <Route path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/search" component={ Search } />
        </switch>

      </div>

    );
  }
}

export default App;
