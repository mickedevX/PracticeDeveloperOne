/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-08-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
import { LightningElement, wire, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import CRYPTO_JS from '@salesforce/resourceUrl/CryptoJS'; // Ruta al recurso estático
import decryptText from '@salesforce/apex/EncryptService.decryptText';
export default class InputComponentEncrypt extends LightningElement {
    @track plainText = ''; // Texto claro
    @track encryptedText = ''; // Texto encriptado
    @track decryptedText = ''; // Texto desencriptado

    cryptoInitialized = false; // Para controlar la carga de CryptoJS

    // Cargar CryptoJS antes de usarlo
    connectedCallback() {
        loadScript(this, CRYPTO_JS)
            .then(() => {
                this.cryptoInitialized = true; 
                this.cryptoJsLib = CryptoJS;  // Asignar la librería cargada a la variable
                console.log('CryptoJS cargado correctamente.');
            })
            .catch(error => {
                console.error('Error al cargar CryptoJS', error);
            });
    }

    // Encriptar el texto cuando el usuario escribe
    handleEncrypt(event) {
        if (!this.cryptoInitialized) {
            console.error('CryptoJS no está inicializado.');
            return;
        }

        this.plainText = event.target.value;


        this.encryptedTextcriptoJS = this.encryptText(this.plainText);  // Encriptar el texto con cryptoJS


        // Encriptar usando AES con clave y IV fijos (mejor si lo generas dinámicamente)
        const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // Clave de 16 bytes
        const iv = CryptoJS.enc.Utf8.parse('1234567890123456');  // IV de 16 bytes

        const encrypted = CryptoJS.AES.encrypt(this.plainText, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        this.encryptedText = encrypted.toString();
    }


    // Función para encriptar el texto con CryptoJS
    encryptText(plainText) {
        const key = 'tu_clave_secreta'; // La clave secreta para la encriptación
        const encrypted = this.cryptoJsLib.AES.encrypt(plainText, key).toString();
        return encrypted;
    }

    // Llamar a Apex para desencriptar
    handleDecrypt() {
        decryptText({ encryptedText: this.encryptedText })
            .then(result => {
                this.decryptedText = result;
            })
            .catch(error => {
                console.error('Error al desencriptar', error);
            });
    }
}
