import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';

const AccountVerificationModal = ({
    show,
    onHide,
    onConfirm,
    title,
    message,
    confirmText,
    cancelText,
    buttonColor = "#1558CB"
}) => {
    const { formatMessage } = useIntl();
    const finalTitle = title || formatMessage({ id: "VerifyAccount"});
    const finalMessage = message || formatMessage({ id: "VerifyAccountMessage"});
    const finalConfirmText = confirmText || formatMessage({ id: "Verify"});
    const finalCancelText = cancelText || formatMessage({ id: "Cancel" });

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
                    {finalTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-muted">{finalMessage}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide} className="rounded-pill px-4">
                    {finalCancelText}
                </Button>
                <Button variant="primary" onClick={onConfirm} style={{ backgroundColor: buttonColor }} className="rounded-pill px-4">
                    {finalConfirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AccountVerificationModal;
