import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from './Home';
import Playlists from './Playlists';
import Songs from './Songs';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/playlists" component={Playlists} />
          <Route path="/songs" component={Songs} />
        </div>
      </Router>
    </div>
  );
}

export default App;
