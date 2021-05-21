import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ForgotPassword from "./Auth/ForgotPassword";
import Login from "./Auth/Login";
import CreateLink from './Link/CreateLink';
import SearchLinks from './Link/SearchLinks';
import LinkDetail from './Link/LinkDetail';
import LinkList from './Link/LinkList';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/create" component={CreateLink} />
        <Route path="/login" component={Login} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/search" component={SearchLinks} />
        <Route path="/top" component={LinkList} />
        <Route path="/new/:page" component={LinkList} />
        <Route path="/search" component={SearchLinks} />
        <Route path="/link/:linkId" component={LinkDetail} />
        <Route exact path="/" render={() => <Redirect to="new/1" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
