import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import constants from '../../resources/constants';
import './TodoModal.css';

const TodoModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [todoDescription, setTodoDescription] = useState('');
  const [todoDeadline, setTodoDeadline] = useState('');
  const [todoLabelColor, setTodoLabelColor] = useState('');
  const [warningVisible, setWarningVisible] = useState(false);

  useEffect(() => {
    setModalShow(props.modalShow);
    if (props.todo?.description) setTodoDescription(props.todo.description);
    if (props.todo?.deadline) setTodoDeadline(props.todo.deadline);
    if (props.todo?.labelColor) setTodoLabelColor(props.todo.labelColor);
  }, [props.modalShow, props.todo]);

  const clearModal = () => {
    setModalShow(false);
    setTodoDescription('');
    setTodoDeadline('');
    setTodoLabelColor(null);
  }

  const onClose = () => {
    clearModal();
    props.onClose();
  }

  const saveOnPress = () => {
    if (todoDescription) {
      setWarningVisible(false);
      clearModal();
      const todoItem = {
        ...props.todo,
        description: todoDescription,
        deadline: todoDeadline,
        labelColor: todoLabelColor,
      };
      props.saveOnPress(todoItem);
    } else {
      setWarningVisible(true);
    }
  }

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
          <Form>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Description"
                value={todoDescription}
                onChange={(e) => {
                  setWarningVisible(false);
                  setTodoDescription(e.target.value); 
                }}
              />
              {warningVisible ? 
                <Form.Text style={{color: 'red'}}>Please enter todo description!</Form.Text>
                : null}
            </Form.Group>
            <Form.Group controlId="deadline">
              <Form.Label>Deadline of Task</Form.Label>
              <Form.Control
                value={todoDeadline || ''}
                type="date"
                placeholder="Deadline of Task"
                onChange={(e) => { setTodoDeadline(e.target.value); }}
                />
            </Form.Group>
            <Form.Group controlId="label">
              <Form.Label>Label of Task</Form.Label>
              <Col sm={10}>
                {constants.TODO_LABEL_COLORS.map((labelItem, index) => {
                  return <Form.Check
                      type="radio"
                      label={<div className="ColorLabel" style={{backgroundColor: labelItem.color}}/>}
                      name="formRadioGroup"
                      id={labelItem.key}
                      key={labelItem.key}
                      onChange={() => { setTodoLabelColor(labelItem.color) }}
                    />
                })}
              </Col>
            </Form.Group>
            <Button size="sm" variant="success" onClick={saveOnPress}>Save</Button> 
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
  );
}

export default TodoModal;