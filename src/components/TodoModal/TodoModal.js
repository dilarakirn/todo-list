import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './TodoModal.css';

const TodoModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [todoDescription, setTodoDescription] = useState('');
  const [todoDeadline, setTodoDeadline] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setModalShow(props.modalShow);
  }, [props.modalShow]);

  const onClose = () => {
    setModalShow(false);
    props.onClose();
  }

  const saveOnPress = () => {
    if (todoDescription) {
      setModalShow(false);
      const todoItem = {
        description: todoDescription,
        deadline: todoDeadline,
      };
      props.saveOnPress(todoItem);
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return(
    <Modal
        show={modalShow}
        onHide={onClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Description"
                value={todoDescription}
                onChange={(e) => { setTodoDescription(e.target.value); }}
              />
              <Form.Control.Feedback type="invalid">
                Please enter todo description.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="deadline">
              <Form.Label>Deadline of Task</Form.Label>
              <Form.Control
                value={todoDeadline}
                type="date"
                placeholder="Deadline of Task"
                onChange={(e) => { setTodoDeadline(e.target.value); }}
                />
            </Form.Group>
              <div className="ButtonContainer">
                <div>
                <Button className="Button" onClick={onClose}>Close</Button>
                </div>
                <div>
                <Button className="Button" variant="success" onClick={saveOnPress} type="submit">Save</Button>
                </div>
              </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
  );
}

export default TodoModal;