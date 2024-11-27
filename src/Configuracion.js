import React from 'react';
import './Styles/Config.css';
import './Styles/Botones.css';
import './Styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { HighlightOff, Home, TaskAlt } from '@mui/icons-material';

const Configuracion = () => {
    return (
        
        <div className="main-container"> {/* VER COMO HACER PARA QUE ESTE A LA MISMA ALTURA QUE LA PANTALLA PRINCIPPAL */}
            <div className='top-button'>
                <Button className='rounded-circle'><Home /></Button>
            </div>

            <div className="config-container">
                <div className="config-header">
                    <h2 className="title">Configuración</h2>
                </div>
                <Form className='config-form'>
                    <Form.Group as={Row} className="mb-3" controlId="formVehiculos">
                        <Form.Label column sm={4}>Cantidad de Vehículos</Form.Label>
                        <Col sm={4}>
                            <Form.Control type='text' placeholder='Cantidad'></Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formCapacidad">
                        <Form.Label column sm={4}>Capacidad</Form.Label>
                        <Col sm={4}>
                            <Form.Control type="text" placeholder="Capacidad" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formCoordenadas">
                        <Form.Label column sm={4}>Coordenadas de Depósito</Form.Label>
                        <Col sm={2}>
                            <Form.Control type="text" placeholder="Latitud" />
                        </Col>
                        <Col sm={2}>
                            <Form.Control type="text" placeholder="Longitud" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizonte">
                        <Form.Label column sm={4}>Horizonte</Form.Label>
                        <Col sm={4}>
                            <Form.Control type="text" placeholder="Horizonte" />
                        </Col>
                    </Form.Group>
                </Form>
                <div className="action-buttons">
                    <Button><TaskAlt />Guardar</Button>
                    <Button><HighlightOff />Cancelar</Button>
                </div>
            </div>
        </div>
    );
};

export default Configuracion;