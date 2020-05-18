import React  from 'react';

import {
    Button,
    Modal,
    ModalBackground,
    ModalCard,
    ModalCardHeader,
    ModalCardTitle,
    ModalCardBody,
    ModalCardFooter,
    Icon
} from 'bloomer';

export const InfoModal = ({
        component: Component, 
        showInfoModal, 
        modalHeaderTitle,
        closeModal,
        ...rest
    }) => {
    
    return (
        <Modal isActive={showInfoModal}>
            <ModalBackground />
            <ModalCard>
                <ModalCardHeader>
                    <ModalCardTitle>
                        <Icon className="fas fa-info" style={{paddingRight:".5em"}} />
                        {modalHeaderTitle}</ModalCardTitle>
                </ModalCardHeader>
                <ModalCardBody>
                    <Component {...rest} />
                </ModalCardBody>
                <ModalCardFooter>
                    <Button isColor='dark' onClick={closeModal} >OK</Button>
                </ModalCardFooter>
            </ModalCard>
        </Modal>    
    )
}

export default InfoModal;