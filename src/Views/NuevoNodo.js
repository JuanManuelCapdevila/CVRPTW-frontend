import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { Form, Button, Row, Col } from 'react-bootstrap';
import { HighlightOff, Home, TaskAlt } from '@mui/icons-material';
import { COSaService } from '../services/COSaService'; // Importar el servicio, si es necesario.
import { ConfigContext } from '../context/ConfigContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/App.css';
import '../Styles/Botones.css';
import '../Styles/Container.css';

const NuevoNodo = () => {
    // Inicialización del estado como un objeto
    const [nodo, setNodo] = useState({
        latitud: '',
        longitud: '',
        demanda: '',
        horaInicio: '',
        horaFin: ''
    });
    const [message, setMessage] = useState(null);
    const { nodes } = useContext(ConfigContext);

    // Maneja los cambios en los campos de formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNodo((prevNodo) => ({
            ...prevNodo,
            [name]: value
        }));
    };

    // Función para guardar el nuevo nodo
    const handleSave = async () => {
        // Supongamos que los nodos se guardan con un servicio.
        try {
            let currentNodes = nodes;
            console.log(currentNodes);
            
            const maxId = currentNodes.length;
            const nuevoNodoID = maxId + 1;

            const nuevoNodo = {
                id: nuevoNodoID, 
                x: nodo.latitud, 
                y: nodo.longitud,
                demand: nodo.demanda,   
                begin: nodo.horaInicio,
                end: nodo.horaFin,
                service:  nodo.horaFin-nodo.horaInicio
            };

            currentNodes.push(nuevoNodo);


            // Llamada al servicio para guardar el nodo (si es necesario)
            await COSaService.saveCustNodes({ custNode: currentNodes });

            setMessage('Nodo guardado exitosamente.');
            // Redirigir a la lista de nodos (puedes usar el `useHistory` de react-router si es necesario)
            setTimeout(() => {
                window.location.href = '/lista-nodos'; // O usa un hook de historia
            }, 1000); 
        } catch (error) {
            console.error('Error guardando el nodo:', error);
            setMessage('Error al guardar el nodo.');
        }
    };

    return (
        <div className="addmargin">
            <div className="main-container">
                <div className='top-button'>
                    <Link to="/lista-nodos" className='home-button btn'><Home /></Link>
                </div>

                <div className="sec-container">
                    <div className="sec-header">
                        <h2 className="title">Crear Nodo</h2>
                    </div>
                    <Form className='config-form'>
                        <Form.Group as={Row} className="mb-3" controlId="formCoordenadas">
                            <Form.Label column sm={4}>Coordenadas</Form.Label>
                            <Col sm={2}>
                                <Form.Control
                                    type="text"
                                    placeholder="Latitud"
                                    name="latitud"
                                    value={nodo.latitud}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col sm={2}>
                                <Form.Control
                                    type="text"
                                    placeholder="Longitud"
                                    name="longitud"
                                    value={nodo.longitud}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formDemanda">
                            <Form.Label column sm={4}>Demanda</Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="text"
                                    placeholder="Demanda"
                                    name="demanda"
                                    value={nodo.demanda}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHInicio">
                            <Form.Label column sm={4}>Hora Inicio</Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="text"
                                    placeholder="Hora Inicio"
                                    name="horaInicio"
                                    value={nodo.horaInicio}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHFin">
                            <Form.Label column sm={4}>Hora Fin</Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="text"
                                    placeholder="Hora Fin"
                                    name="horaFin"
                                    value={nodo.horaFin}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Form.Group>
                    </Form>

                    <div className="action-buttons">
                        <Button onClick={handleSave} disabled={!nodo.latitud || !nodo.longitud || !nodo.demanda || !nodo.horaInicio || !nodo.horaFin}>
                            <TaskAlt />Guardar
                        </Button>
                        <Link to="/lista-nodos">
                            <Button><HighlightOff />Regresar</Button>
                        </Link>
                        {message && <label className="action-buttons">{message}</label>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevoNodo;
