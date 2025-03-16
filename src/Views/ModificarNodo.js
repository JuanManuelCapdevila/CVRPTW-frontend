import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DeleteOutline, HighlightOff, Home, TaskAlt } from '@mui/icons-material';
import { ConfigContext } from '../context/ConfigContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/App.css';
import '../Styles/Botones.css';
import '../Styles/Container.css';
import '../Styles/Nodos.css';
import { COSaService } from '../services/COSaService';

const ModificarNodo = (props) => {
    const nodoID = props.match.params.nodoID;
    const { nodes } = useContext(ConfigContext);
    const [message, setMessage] = useState(null);

    // ✅ Inicialización con objeto vacío para evitar errores en inputs
    const [nodo, setNodo] = useState({
        id: '',
        x: '',
        y: '',
        demand: '',
        begin: '',
        end: '',
    });

    useEffect(() => {
        const nodoEncontrado = nodes.find((n) => n.id === nodoID);
        if (nodoEncontrado) {
            setNodo(nodoEncontrado);
        }
    }, [nodoID, nodes]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNodo((prevNodo) => ({
            ...prevNodo,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!nodo) return;

        const updatedNodes = nodes.map((n) => (n.id === nodo.id ? nodo : n));
        await COSaService.saveCustNodes({custNode: updatedNodes});
        setMessage('Nodo guardado exitosamente.');
    };

    const handleDelete = async () => {
        const updatedNodes = nodes.filter((n) => n.id !== nodoID);
        await COSaService.saveCustNodes({custNode: updatedNodes});
        setMessage('Nodo eliminado exitosamente.');
    };

    return (
        <div className="addmargin">
            <div className="main-container">
                <div className='top-button'>
                    <Link to="/lista-nodos" className='home-button btn'><Home /></Link>
                </div>
                <div className="sec-container">
                    <div className="sec-header">
                        <div className='header-grid-modif'>
                            <h2 className="title">Modificar Tarea N° {nodoID}</h2>
                            <Button className='delete-button' onClick={handleDelete}>
                                <DeleteOutline /> Eliminar
                            </Button>
                        </div>
                    </div>
                    <Form className='config-form'>
                        <Form.Group as={Row} className="mb-3" controlId="formCoordenadas">
                            <Form.Label column sm={4}>Coordenadas de Depósito</Form.Label>
                            <Col sm={2}>
                                <Form.Control type="text" placeholder="Latitud" name="x" value={nodo.x} onChange={handleInputChange} />
                            </Col>
                            <Col sm={2}>
                                <Form.Control type="text" placeholder="Longitud" name="y" value={nodo.y} onChange={handleInputChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formDemanda">
                            <Form.Label column sm={4}>Demanda</Form.Label>
                            <Col sm={4}>
                                <Form.Control type='text' placeholder='Demanda' name="demand" value={nodo.demand} onChange={handleInputChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHInicio">
                            <Form.Label column sm={4}>Hora Inicio</Form.Label>
                            <Col sm={4}>
                                <Form.Control type="text" placeholder="Hora Inicio" name='begin' value={nodo.begin} onChange={handleInputChange} pattern='[0-9]{2}:[0-9]{2}' />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHFin">
                            <Form.Label column sm={4}>Hora Fin</Form.Label>
                            <Col sm={4}>
                                <Form.Control type="text" placeholder="Hora Fin" name='end' value={nodo.end} onChange={handleInputChange} pattern='[0-9]{2}:[0-9]{2}' />
                            </Col>
                        </Form.Group>
                    </Form>
                    <div className="action-buttons">
                        <Button onClick={handleSave}><TaskAlt />Guardar</Button>
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

export default ModificarNodo;
