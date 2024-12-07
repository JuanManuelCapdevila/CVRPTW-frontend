import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';
import './Styles/Botones.css';
import './Styles/Container.css';
import { HighlightOff, Home, TaskAlt } from '@mui/icons-material';

const Configuracion = () => {
    {/*AGREGAR FUNCIONALIDAD PARA GUARDAR LA CONFIGURACIÓN EN BACKEND */}

    return (
        <div className='addmargin'>
            <div className="main-container"> 
                <div className='top-button'>
                    <Link to="/lista-nodos" className='home-button btn'><Home /></Link>
                </div>

                <div className="sec-container">
                    <div className="sec-header">
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
                        <Button><TaskAlt />Guardar</Button> {/*AGREGAR FUNCIONALIDAD PARA GUARDAR LA CONFIGURACIÓN EN BACKEND */}
                        <Link to="/lista-nodos">
                            <Button><HighlightOff />Cancelar</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Configuracion;