import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { Table } from 'react-bootstrap';
import axios from 'axios';
import './Styles/App.css';
import './Styles/Botones.css';
import './Styles/Nodos.css';
import './Styles/Tablas.css';
import { AccessTime, AddCircleOutline, Build, LocalShipping, Settings } from '@mui/icons-material';

export default class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
        nodeList: null,
        nodeCount: 0,
        };
    }

    componentDidMount() {
        this.getNodeData();
    }

    getNodeData() {
        axios
            .get('assets/samplejson/nodos.json') 
            .then((response) => {
                localStorage.setItem('nodos', JSON.stringify(response.data));

                this.setState({ 
                nodeList: response.data,
                nodeCount: response.data.length
            });
        })
        .catch((error) => {
        console.error('Error loading node data:', error);
        });
    }

    render() {
        const { nodeList } = this.state;

        if (!nodeList) {
        return <p>Cargando datos...</p>;
        }

        return (
            <div className="addmargin">
                <div className="main-container">
                    <div className="tasks-container">
                        <div className="header-grid">
                            <h2 className="title">Tareas</h2>
                            <p className="coordinates">Coordenadas: -32.485, -68.526 | Horizonte: 480 minutos | Cantidad de Vehículos: 3</p>
                            <div className="task-summary-box">
                                <AccessTime />
                                <h4>{this.state.nodeCount}</h4>
                                <h4>Tareas</h4>
                            </div>
                        </div>

                        <div className='table-wrapper'>
                            <Table striped hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Tarea Nº</th>
                                        <th>Latitud</th>
                                        <th>Longitud</th>
                                        <th>Demanda</th>
                                        <th>Tiempo Inicio</th>
                                        <th>Tiempo Fin</th>
                                        <th>Duración</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nodeList.map((node, index) => (
                                    <tr key={node.nodoID} className="hide_all">
                                        <td>
                                            <Link
                                                to={`/modificar-nodo/${node.nodoID}`}
                                                className="icon-button"
                                                title="Modificar Tarea"
                                            >
                                                <Settings />
                                            </Link>
                                        </td> 
                                        <td>{index.toString().padStart(2, '0')}</td>
                                        <td>{node.latitud}</td>
                                        <td>{node.longitud}</td>
                                        <td>{node.demanda}</td>
                                        <td>{node.tiempoInicio}</td>
                                        <td>{node.tiempoFin}</td>
                                        <td>{node.servicioDuración} minutos</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                        <div className="action-buttons">
                            <Link to="/configuracion" className="btn"><Build /> Configuración</Link>
                            <Link to="/nuevo-nodo" className="btn"><AddCircleOutline /> Nuevo Nodo</Link>
                            <Link to="/optimizar" className="btn"><LocalShipping /> Optimizar</Link>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}