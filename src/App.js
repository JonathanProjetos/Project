import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
