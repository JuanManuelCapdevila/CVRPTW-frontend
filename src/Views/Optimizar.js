import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/App.css';
import '../Styles/Botones.css';
import '../Styles/Container.css';
import '../Styles/Tablas.css';
import '../Styles/Vehiculos.css';
import { Home, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { IBMService } from '../services/IBMService';
import { ConfigContext } from '../context/ConfigContext';

const Optimizar = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [expandedVehiculos, setExpandedVehiculos] = useState({});
    const { config, nodes } = useContext(ConfigContext);

    useEffect(() => {
        getVehicleData();
        
    }, []);

    const getVehicleData = async () => {
        try {
            const response = await IBMService.getResults(nodes);
            console.log("vehiculos: ", response);
            setVehiculos(response);
            
        } catch (error) {
            console.error('Error al cargar el JSON', error);
        }
    };

    const toggleExpand = (vehiculoID) => {
        setExpandedVehiculos((prev) => ({
            ...prev,
            [vehiculoID]: !prev[vehiculoID],
        }));
    };

    return (
        <div className='addmargin'>
            <div className="main-container"> 
                <div className='top-button'>
                    <Link to="/lista-nodos" className='home-button btn'><Home /></Link>
                </div>
                {vehiculos?.map((vehiculo) => (
                    <div key={vehiculo.vehiculoID} className="sec-container">
                        <div className="sec-header">
                            <div className='header-grid-vehic'>
                                <h2 className="title">Vehiculo {vehiculo.vehiculoID}</h2>
                                <p className="capacity">Capacidad: {config.capacity}</p>
                                <button className="expand-button" onClick={() => toggleExpand(vehiculo.vehiculoID)}>
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
                                            <th>Inicio</th>
                                            <th>Fin</th>
                                            <th>Servicio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehiculo.nodos.map((nodo) => (
                                            <tr key={nodo.id}>
                                                <td>{nodo.id}</td>
                                                <td>{nodo.x}</td>
                                                <td>{nodo.y}</td>
                                                <td>{nodo.demand}</td>
                                                <td>{nodo.begin}</td>
                                                <td>{nodo.end}</td>
                                                <td>{nodo.service} min</td>
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
};

export default Optimizar;
