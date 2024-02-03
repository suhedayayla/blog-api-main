import React, { useContext } from 'react';
import TopBar from './components/TopBar/TopBar';
import Home from './Pages/Home/Home';
import Single from './Pages/Single/Single';
import Write from './Pages/Write/Write';
import Settings from './Pages/Settings/Settings';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Search from "./Pages/Search/Search";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Context } from './context/Context';

function App() {
  const {user}= useContext(Context);

  return (
    <Router forceRefresh={true}>
   <TopBar/>
   <Switch>
      <Route exact path="/"><Home/></Route>
      <Route path="/register">{user? <Home/> :<Register/>}</Route>
      <Route path="/login">{user? <Home/> :<Login/>}</Route>
      <Route path="/write"> {user? <Write/> :<Register/>}</Route>
      <Route path="/settings">{user? <Settings/> :<Register/>}</Route>
      <Route path="/post/:postId"><Single/></Route>
      <Route path="/search/:searchTerm" exact component={Search} />

   </Switch>
   </Router>
  );
}

export default App;
