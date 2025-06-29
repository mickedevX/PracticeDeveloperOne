/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 06-28-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
import { LightningElement, track } from 'lwc';
import globalSearch from '@salesforce/apex/LearningQueriesController.busquedaSOSL';
export default class LearningQueriesComponentLwc extends LightningElement {
    searchTerm = '';
    @track accounts = [];
    @track contacts = [];
    @track oportunidades = [];
    isLoading = false;

    handleInputChange(event) {
        this.searchTerm = event.target.value;
    }

    handleSearch() {
        if (!this.searchTerm) return;

        this.isLoading = true;

        globalSearch({ terminoBusqueda: this.searchTerm })
            .then(result => {
                this.accounts = result.accounts || [];
                console.log('accounts: '+JSON.stringify(this.accounts));
                this.contacts = result.contacts || [];
                console.log('contacts: '+JSON.stringify(this.contacts));
                this.oportunidades = result.oportunities || [];
                console.log('oportunidades: '+JSON.stringify(this.oportunidades));
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
}