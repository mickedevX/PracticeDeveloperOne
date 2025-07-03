/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 06-30-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
import { LightningElement, track, wire } from 'lwc';
import getAccountToDropDown from '@salesforce/apex/LearningApexClassController.getAccountsToDropDown';

export default class LearningLdsComponentLwc02Lrvf extends LightningElement {
    @track options = [];
    @track selectedAccountId = '';

    @wire(getAccountToDropDown)
    wiredAccount({ error, data }) {
        if (data) {
            this.options = data.map(
                acc => ({
                    label: acc.Name,
                    value: acc.Id
                })
            );
        } else if (error) {
            this.options = [];
        }
    }

    handleEvent(event){
        this.selectedAccountId = event.detail.value;
    }
}