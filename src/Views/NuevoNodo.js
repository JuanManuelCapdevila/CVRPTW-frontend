import React, { useState} from 'react';
import { Link } from 'react-router-dom'; 
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';
import './Styles/Botones.css';
import './Styles/Container.css';
import { HighlightOff, Home, TaskAlt } from '@mui/icons-material';

const NuevoNodo = () => {
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [demanda, setDemanda] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');

    const handleSave = () => {
        const storedNodes = localStorage.getItem('nodos');
        let nodes = storedNodes ? JSON.parse(storedNodes) : [];

        const maxId = nodes.reduce((max, node) => Math.max(max, node.nodoID), 0);
        const nuevoNodoID = maxId + 1;

        const nuevoNodo = {
            nodoID: nuevoNodoID, 
            latitud, 
            longitud,
            demanda,
            tiempoInicio : horaInicio,
            tiempoFin : horaFin, 
            servicioDuración: calcularDuracion(horaInicio, horaFin) 
        };

        nodes.push(nuevoNodo);

        localStorage.setItem('nodos', JSON.stringify(nodes));

        alert('Nodo guardado exitosamente.');
    };

    const calcularDuracion = (horaInicio, horaFin) => {
        const [inicioH, inicioM] = horaInicio.split(':');
        const [finH, finM] = horaFin.split(':');
        const duracionH = finH - inicioH;
        const duracionM = finM - inicioM;
        return duracionH * 60 + duracionM;
    };

    return (
        <div className="addmargin">
            <div className="main-container">
                <div className='top-button'>
                    <Link to="/lista-nodos" className='home-button btn'><Home /></Link>
                </div>

                <div className="sec-container">
                    <div className="sec-header">
                        <h2 className="title">Crear Tarea</h2>
                    </div>
                <Form className='config-form'>
                    <Form.Group as={Row} className="mb-3" controlId="formCoordenadas">
                        <Form.Label column sm={4}>Coordenadas de Depósito</Form.Label>
                        <Col sm={2}>
                            <Form.Control type="text" placeholder="Latitud" value={latitud} onChange={(e) => setLatitud(e.target.value)}/>
                        </Col>
                        <Col sm={2}>
                            <Form.Control type="text" placeholder="Longitud" value={longitud} onChange={(e) => setLongitud(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formDemanda">
                        <Form.Label column sm={4}>Demanda</Form.Label>
                        <Col sm={4}>
                            <Form.Control type='text' placeholder='Demanda' value={demanda} onChange={(e) => setDemanda(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHInicio">
                        <Form.Label column sm={4}>Hora Inicio</Form.Label>
                        <Col sm={4}>
                            <Form.Control type="text" placeholder="Hora Inicio" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHFin">
                        <Form.Label column sm={4}>Hora Fin</Form.Label>
                        <Col sm={4}>
                            <Form.Control type="text" placeholder="Hora Fin" value={horaFin} onChange={(e) => setHoraFin(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </Form>

                <div className="action-buttons">
                    <Button onClick={handleSave}><TaskAlt />Guardar</Button>
                    <Link to="/lista-nodos">
                        <Button><HighlightOff />Cancelar</Button>
                    </Link>
                </div>
            </div>
            </div>
        </div>
    );
};
export default NuevoNodo;