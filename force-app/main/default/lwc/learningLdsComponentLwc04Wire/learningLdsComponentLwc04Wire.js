/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 07-02-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
import { LightningElement, api, wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'Account.Name',
    'Account.Phone',
    'Account.AnnualRevenue'
]
export default class LearningLdsComponentLwc04Wire extends LightningElement {
    @api recordId = '0018a00001tZMdTAAW';

    @wire(getRecord,{recordId:'$recordId', fields: FIELDS}) account;

    get name (){
        return this.account.data ?this.account.data.fields.Name.value : '';
    }

    get phone(){
        return this.account.data ?this.account.data.fields.Phone.value : '';
    }

    get revenue(){
        return this.account.data ?this.account.data.fields.AnnualRevenue.value : '';
    }

}
