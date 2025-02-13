/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-13-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
import { LightningElement } from 'lwc';
import obtenerContactList from '@salesforce/apex/LearningApexClassController.obtenerContactos';
import consultarContactList from '@salesforce/apex/LearningApexClassController.findContactos';

export default class CallingApex_component_lwc extends LightningElement {
    contactos;

    async handleLoadContacts() {
        try {
            this.contactos = await obtenerContactList();
        } catch (error) {
            console.log(error);
        }
    }

    //CALLING WITH PARAMETERS
    searchKey = '';
    findedContactos;
    handleKeyChange(event) {
        this.searchKey = event.target.value;
    }

    async handleSearch() {
        try {
            this.findedContactos = await consultarContactList({ searchKey: this.searchKey });
            this.error = undefined;
        } catch (error) {
            this.error = error;
            this.findedContactos = undefined;
        }
    }
}