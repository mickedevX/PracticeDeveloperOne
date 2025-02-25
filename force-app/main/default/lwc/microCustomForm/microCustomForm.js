/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-24-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/

import { LightningElement, track } from 'lwc';
import { loadCryptoJS, getDecryptedKeyAndIV, encryptData } from 'c/encryptionService';
import insertPersona from '@salesforce/apex/InsertDataCustomFormController.insertRecordOfPersonaSObject';
export default class MicroCustomForm extends LightningElement {
    valCedula = '';
    valCelular = '';
    valCedulaEncrypted = '';
    valCelularEncrypted = '';
    key;
    iv;

    async connectedCallback() {
        try {
            await loadCryptoJS(this);
            const { key, iv } = await getDecryptedKeyAndIV();
            this.key = key;
            this.iv = iv;
        } catch (error) {
            console.error('Error al inicializar el componente:', error);
        }
    }

    handleChange(event) {
        const field = event.target.name;
        const value = event.target.value;

        if (!this.key || !this.iv) {
            console.error('Claves de encriptación no disponibles.');
            return;
        }

        if (field === 'cedula') {
            this.valCedula = value;
        } else if (field === 'celular') {
            this.valCelular = value;
        }
        // Crear JSON con los datos
        const jsonData = JSON.stringify({
            cedula: this.valCedula,
            celular: this.valCelular
        });


        // Encriptar el JSON completo
        this.encryptedPayload = encryptData(jsonData, this.key, this.iv);

        console.log(`Payload cifrado: ${this.encryptedPayload}`);
    }

    sendData() {
        insertPersona({ encryptedData: this.encryptedPayload })
            .then(result => {
                console.log('Registro insertado correctamente:', result);
            })
            .catch(error => {
                console.error('Error al insertar el registro:', error);
            });
    }
}

