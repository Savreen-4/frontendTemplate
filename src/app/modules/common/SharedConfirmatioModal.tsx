import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ConfirmationModal = ({
    show,
    onHide,
    onConfirm,
    title = "Are you sure?",
    message = "Do you really want to proceed with this action? This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    buttonColor
}) => {

    return (
        <Modal
            show={show}
            centered
            aria-labelledby="confirmation-modal"
            backdrop="static"
            className="confirmation-modal"
        >
            <Modal.Header>
                <Modal.Title id="confirmation-modal" style={{ color: buttonColor, fontSize: "inherit" }}
                    className="fw-bold">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center" style={{ minHeight: '80px' }}>
                <p className="text-muted text-center m-0">{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-secondary"
                    onClick={onHide}
                    className="rounded-pill px-3 btn-sm"
                >
                    {cancelText}
                </Button>
                <Button
                    variant="danger"
                    onClick={onConfirm}
                    style={{ backgroundColor: buttonColor }}
                    className="rounded-pill px-3 btn-sm"
                >
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};



export default ConfirmationModal;
