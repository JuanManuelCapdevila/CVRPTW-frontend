import React, { useState, useEffect, useContext } from 'react';  // Importamos useContext y otros hooks
import { Link } from 'react-router-dom'; 
import { Table } from 'react-bootstrap';
import { AccessTime, AddCircleOutline, Build, LocalShipping, Settings, ShowChart } from '@mui/icons-material';
import { ConfigContext } from '../context/ConfigContext'; // Importamos el contexto
import { COSaService } from '../services/COSaService'; // Importamos el servicio
import '../Styles/App.css';
import '../Styles/Botones.css';
import '../Styles/Nodos.css';
import '../Styles/Tablas.css';
import { IBMService } from '../services/IBMService';

const Customers = () => {
    const { config, setConfig, nodes,setNodes } = useContext(ConfigContext);  // Usamos el hook useContext para acceder al contexto
    const [nodeCount, setNodeCount] = useState(0);
    const [error, setError] = useState(null);
    const [process, setProcess] = useState(false)
    const [message, setMessage] = useState(null);

    // Se llama después de que el componente se monta
    useEffect(() => {
        getConfig();
        getNodeData();
    }, []); // El segundo parámetro vacío asegura que solo se ejecute una vez al montar el componente

    // Función que obtiene la configuración usando el servicio COSaService
    const getConfig = async () => {
        try {
            const response = await COSaService.getConfig();  // Usamos el servicio aquí
            if (response) {
                console.log(response);
                
                setConfig(response.data[0]);  // Actualiza el contexto con la respuesta de la API
            }
        } catch (error) {
            console.error('Error loading configuration data:', error);
            setError('No se pudo cargar la configuración');
        }
    };

    // Función que obtiene los nodos usando el servicio COSaService
    const getNodeData = async () => {
        try {
            const response = await COSaService.getCustNodes();  // Usamos el servicio aquí
            if (response) {
                setNodeCount(response.data.length)
                setNodes(response.data);
            }
        } catch (error) {
            console.error('Error loading node data:', error);
            setError('No se pudieron cargar los nodos');
        }
    };
    const handleOptimize = async () => {
        try {
            const response = await IBMService.resolve();
            if (!response?.error) {
                console.log(response);
                setProcess(true);
            }
    } catch (error) {
        console.error('Error optimizing route:', error);
        setError('No se pudo optimizar la ruta');
    }
};

    if (error) {
        return <p>{error}</p>; // Mostrar un mensaje de error si hay uno
    }

    if (!nodes) {
        return <p>Cargando datos...</p>; // Mostrar un mensaje de carga mientras se esperan los datos
    }

    return (
        <div className="addmargin">
            <div className="main-container">
                <div className="tasks-container">
                    <div className="header-grid">
                        <h2 className="title">Tareas</h2>
                        <p className="coordinates">
                            Coordenadas: {config?.depotx}, {config?.depoty} | 
                            Horizonte: {config?.horizon} minutos | 
                            Cantidad de Vehículos: {config?.maxVehicles}
                        </p>
                        <div className="task-summary-box">
                            <AccessTime />
                            <h4>{nodeCount}</h4>
                            <h4>Tareas</h4>
                        </div>
                    </div>

                    <div className="table-wrapper">
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
                                {nodes.map((node) => (
                                    <tr key={node.id} className="hide_all">
                                        <td>
                                            <Link
                                                to={`/modificar-nodo/${node.id}`}
                                                className="icon-button"
                                                title="Modificar Tarea"
                                            >
                                                <Settings />
                                            </Link>
                                        </td>
                                        <td>{node.id}</td>
                                        <td>{node.x}</td>
                                        <td>{node.y}</td>
                                        <td>{node.demand}</td>
                                        <td>{node.begin}</td>
                                        <td>{node.end}</td>
                                        <td>{node.service} minutos</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <div className="action-buttons">
                        <Link to="/configuracion" className="btn"><Build /> Configuración</Link>
                        <Link to="/nuevo-nodo" className="btn"><AddCircleOutline /> Nuevo Nodo</Link>
                        <button className="btn" onClick={handleOptimize}><LocalShipping /> Optimizar</button>
                        {process && <Link to="/optimizar" className="btn"><ShowChart /> Ver Resultados</Link>}
                        {message && <label className="action-buttons">{message}</label>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customers;
