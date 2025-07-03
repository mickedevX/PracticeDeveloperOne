/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 07-02-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class LearningLdsComponentLwc03Lref extends LightningElement {
    @api recordId = '0018a00002SpOD4AAN';

    handleSuccess() {
        this.dispatchEvent(
            new ShowToastEvent({
                title: '!Exito!',
                message: 'El registro se ha actualizado correctamente',
                variant: 'success'
            })
        );
    }

    handleError(event) {
        let message = 'El registro no se ha podido actualizar';
        if (event && event.detail && event.detail.message) {
            message += ': ' + event.detail.message;
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: '!Error!',
                message: message,
                variant: 'error'
            })
        );

    }
}