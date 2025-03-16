import React, { useContext, useEffect, useState  } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/App.css';
import '../Styles/Botones.css';
import '../Styles/Container.css';
import { ConfigContext } from '../context/ConfigContext'; // Importamos el contexto
import { COSaService } from '../services/COSaService'; // Importamos el servicio

import { HighlightOff, Home, TaskAlt } from '@mui/icons-material';
const Configuracion = () => {
    const { config, setConfig } = useContext(ConfigContext);  // Usamos el hook useContext para acceder al contexto
    const [message, setMessage] = useState(null);
    useEffect(() => {
        getConfig();
    }, []);
    const getConfig = async () => {
            try {
                const response = await COSaService.getConfig();  // Usamos el servicio aquí
                if (response) {
                    
                    setConfig(response.data[0]);  // Actualiza el contexto con la respuesta de la API
                }
            } catch (error) {
                console.error('Error loading configuration data:', error);
                setError('No se pudo cargar la configuración');
            }
        };

    const handleOnButtonClick = async () => {
        try {
            const newConfig = {
                maxVehicles: config?.maxVehicles,
                capacity: config?.capacity,
                depotx: config?.depotx,
                depoty: config?.depoty,
                horizon: config?.horizon
            };
            console.log(newConfig);
            const response = await COSaService.saveConfig({config: newConfig});
            if (response) {
                setConfig(newConfig);
                setMessage("Actualizado correctamente!")
            }
        } catch (error) {
            console.error('Error updating configuration data:', error);
            setMessage("Error al intentar actualizar")

        }
    };
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
                                <Form.Control type='text' placeholder='Cantidad' value={config?.maxVehicles||""}></Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formCapacidad">
                            <Form.Label column sm={4}>Capacidad</Form.Label>
                            <Col sm={4}>
                                <Form.Control type="text" placeholder="Capacidad" value={config?.capacity||""}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formCoordenadas">
                            <Form.Label column sm={4}>Coordenadas de Depósito</Form.Label>
                            <Col sm={2}>
                                <Form.Control type="text" placeholder="Latitud" value={config?.depotx||""}/>
                            </Col>
                            <Col sm={2}>
                                <Form.Control type="text" placeholder="Longitud" value={config?.depoty||""} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizonte">
                            <Form.Label column sm={4}>Horizonte</Form.Label>
                            <Col sm={4}>
                                <Form.Control type="text" placeholder="Horizonte" value={config?.horizon||""} />
                            </Col>
                        </Form.Group>
                    </Form>
                    <div className="action-buttons">
                    <Button onClick={handleOnButtonClick}><TaskAlt />Guardar</Button>
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

export default Configuracion;