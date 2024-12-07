import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';
import './Styles/Botones.css';
import './Styles/Tablas.css';
import Nodos from './Views/Nodos';
import Configuracion from './Views/Configuracion'; 
import NuevoNodo from './Views/NuevoNodo'; 
import Optimizar from './Views/Optimizar'; 
import ModificarNodo from './Views/ModificarNodo';

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
            <Route path='/modificar-nodo/:nodoID' component={ModificarNodo} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;