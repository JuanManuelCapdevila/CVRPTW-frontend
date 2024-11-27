import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';
import './Styles/Tablas.css';
import './Styles/Botones.css';
import Nodos from './Nodos';
import Configuracion from './Configuracion'; 
import NuevoNodo from './NuevoNodo'; 
import Optimizar from './Optimizar'; 
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


class App extends Component {
  render() {
    console.log("Host URL"+process.env.PUBLIC_URL);
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Switch>
            <Route exact path= "/" render={() => (
              <Redirect to="/lista-nodos"/>
            )}/>
            <Route exact path='/lista-nodos' component={Nodos} />
            <Route exact path='/configuracion' component={Configuracion} />
            <Route exact path='/nuevo-nodo' component={NuevoNodo} />
            <Route exact path='/optimizar' component={Optimizar} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;