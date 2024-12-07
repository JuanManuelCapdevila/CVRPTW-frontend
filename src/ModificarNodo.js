import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';
import './Styles/Botones.css';
import './Styles/Container.css';
import './Styles/Nodos.css';
import { DeleteOutline, HighlightOff, Home, TaskAlt } from '@mui/icons-material';

class ModificarNodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodo: null,
        };
    }

    componentDidMount() {
        this.loadNodeData(this.props.match.params.nodoID);
    }

    loadNodeData(nodoID) {
        const storedNodes = localStorage.getItem('nodos');
        if ( storedNodes) {
            const nodes = JSON.parse(storedNodes);
            const nodo = nodes.find((n) => n.nodoID === parseInt(nodoID, 10));
            if (nodo) {
                this.setState({ nodo });
            } else {
                console.error('Nodo no encontrado');
                this.setState({ nodo: null });
            }
        } else {
            console.error('Nodos no encontrados en el almacenamiento local');
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            nodo: {
                ...prevState.nodo,
                [name]: value
            }
        }));
    }

    handleSave = () => {
        const storedNodes = localStorage.getItem('nodos');
        if (storedNodes) {
            const nodes = JSON.parse(storedNodes);
            const updatedNodes = nodes.map((n) => 
                n.nodoID === this.state.nodo.nodoID ? this.state.nodo : n
            );

            localStorage.setItem('nodos', JSON.stringify(updatedNodes));

            console.log('Nodo guardado: ', this.state.nodo);
            alert('Nodo guardado exitosamente.');
            this.props.history.push('/lista-nodos');
        } else {
            console.error('No se pudieron guardar los datos.');
        }
    }

    handleDelete = () => {
        const storedNodes = localStorage.getItem('nodos');
        if (storedNodes) {
            const nodes = JSON.parse(storedNodes);
            const updatedNodes = nodes.filter(
                (n) => n.nodoID !== parseInt(this.props.match.params.nodoID, 10)
            );

            localStorage.setItem('nodos', JSON.stringify(updatedNodes));

            console.log('Nodos después de la eliminación: ', updatedNodes);
            alert('Nodo eliminado exitosamente.');
            this.props.history.push('/lista-nodos');
        } else {
            console.error('No se encontraron nodos en localStorage para eliminar.');
        }
    }

    render() {
        const { nodoID } = this.props.match.params;
        const { nodo } = this.state;

        if (!nodo) {
            return <p>No se pudo cargar el nodo. Verifica los datos.</p>;
        }
        
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
                                    <p></p>
                                    <Button className='delete-button' onClick={this.handleDelete}>
                                        <DeleteOutline /> Eliminar
                                    </Button> 
                                </div>
                        </div>

                        <Form className='config-form'>
                            <Form.Group as={Row} className="mb-3" controlId="formCoordenadas">
                                <Form.Label column sm={4}>Coordenadas de Depósito</Form.Label>
                                <Col sm={2}>
                                    <Form.Control type="text" placeholder="Latitud" name="latitud" value={nodo.latitud || ''} onChange={this.handleInputChange}/>
                                </Col>
                                <Col sm={2}>
                                    <Form.Control type="text" placeholder="Longitud" name="longitud" value={nodo.longitud || ''} onChange={this.handleInputChange}/>
                                </Col>
                            </Form.Group>
    
                            <Form.Group as={Row} className="mb-3" controlId="formDemanda">
                                <Form.Label column sm={4}>Demanda</Form.Label>
                                <Col sm={4}>
                                    <Form.Control type='text' placeholder='Demanda' name="demanda" value={nodo.demanda || ''} onChange={this.handleInputChange}/>
                                </Col>
                            </Form.Group>
    
                            <Form.Group as={Row} className="mb-3" controlId="formHInicio">
                                <Form.Label column sm={4}>Hora Inicio</Form.Label>
                                <Col sm={4}>
                                    <Form.Control type="text" placeholder="Hora Inicio" name='horaInicio' value={nodo.horaInicio || ''} onChange={this.handleInputChange} pattern='[0-9]{2}:[0-9]{2}' />
                                </Col>
                            </Form.Group>
    
    
                            <Form.Group as={Row} className="mb-3" controlId="formHFin">
                                <Form.Label column sm={4}>Hora Fin</Form.Label>
                                <Col sm={4}>
                                    <Form.Control type="text" placeholder="Hora Fin" name='horaFin' value={nodo.horaFin || ''} onChange={this.handleInputChange} pattern='[0-9]{2}:[0-9]{2}'/>
                                </Col>
                            </Form.Group>
                        </Form>

                        <div className="action-buttons">
                            <Button onClick={this.handleSave}><TaskAlt />Guardar</Button>
                            <Link to="/lista-nodos">
                                <Button><HighlightOff />Cancelar</Button> {/* VersionAnterior: <Button onClick={() => this.props.history.push('/lista-nodos')}><HighlightOff />Cancelar</Button> */}
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default withRouter(ModificarNodo);