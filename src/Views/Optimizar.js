import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { Table } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/App.css';
import '../Styles/Botones.css';
import '../Styles/Container.css';
import '../Styles/Tablas.css';
import '../Styles/Vehiculos.css';
import { Home, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

class Optimizar extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            vehiculos: [], 
            expandedVehiculos: {}, 
        };
    }

    componentDidMount() {
        this.getNodeData();
    }

    getNodeData() {
        axios
            .get('assets/samplejson/vehiculos.json') 
            .then((response) => {
                this.setState({ vehiculos: response.data });
        })
        .catch((error) => {
        console.error('Error al cargar el JSON', error);
        });
    }

    toggleExpand(vehiculoID) {
        this.setState((prevState) => ({
            expandedVehiculos: {
                ...prevState.expandedVehiculos,
                [vehiculoID]: !prevState.expandedVehiculos[vehiculoID],
            },
        }));
    }

    render() {
        const { vehiculos, expandedVehiculos } = this.state;

        return (
            <div className='addmargin'>
                <div className="main-container"> 
                    <div className='top-button'>
                        <Link to="/lista-nodos" className='home-button btn'><Home /></Link>
                    </div>
    
                    {vehiculos.map((vehiculo) => (
                        <div key={vehiculo.vehiculoID} className="sec-container">
                            <div className="sec-header">
                                <div className='header-grid-vehic'>
                                    <h2 className="title">{vehiculo.vehiculoID}</h2>
                                    <p className="capacity">Capacidad: {vehiculo.capacidad}</p>
                                    <button className="expand-button" onClick={() => this.toggleExpand(vehiculo.vehiculoID)}>
                                        {expandedVehiculos[vehiculo.vehiculoID] ? 'Ocultar' : `Ver ${vehiculo.nodos.length} nodos`}
                                        {expandedVehiculos[vehiculo.vehiculoID] ? (
                                            <KeyboardArrowUp style={{ marginLeft: '8px' }} />
                                            ) : (
                                                <KeyboardArrowDown style={{ marginLeft: '8px' }} />
                                            )}
                                    </button>
                                </div>
                            </div>

                            {expandedVehiculos[vehiculo.vehiculoID] && (
                                <div id={`panel-${vehiculo.vehiculoID}`} className="table-wrapper">
                                    <Table striped hover className="custom-table">
                                        <thead>
                                            <tr>
                                                <th>Nodo ID</th>
                                                <th>Latitud</th>
                                                <th>Longitud</th>
                                                <th>Demanda</th>
                                                <th>Tiempo Inicio</th>
                                                <th>Tiempo Fin</th>
                                                <th>Duración</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vehiculo.nodos.map((nodo) => (
                                                <tr key={nodo.nodoID}>
                                                    <td>{nodo.nodoID}</td>
                                                    <td>{nodo.latitud}</td>
                                                    <td>{nodo.longitud}</td>
                                                    <td>{nodo.demanda}</td>
                                                    <td>{nodo.tiempoInicio}</td>
                                                    <td>{nodo.tiempoFin}</td>
                                                    <td>{nodo.servicioDuración} minutos</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </div>
                    ))}

                </div>
            </div>
        );
    }      
    
};

export default Optimizar;