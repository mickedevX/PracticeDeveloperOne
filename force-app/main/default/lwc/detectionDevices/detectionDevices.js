/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 07-23-2024
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
import { LightningElement } from 'lwc';
import IMAGES from '@salesforce/resourceUrl/Images';
export default class DetectionDevices extends LightningElement {
    connectedCallback() {
        this.redirectToStore();
    }

    imageBP = IMAGES + 'Logo.svg';
    redirectToStore() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Verifica si el dispositivo es Android
        if (/android/i.test(userAgent)) {
            window.location.href = "https://play.google.com/store/apps/details?id=com.pichincha.empresas.token";
        } 
        // Verifica si el dispositivo es iPhone
        else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            window.location.href = "https://apps.apple.com/ec/app/pichincha-token/id1537139058";
        } 
        // Opcionalmente, maneja otros dispositivos o redirige a una página genérica
        else {
            window.location.href = "https://www.pichincha.com/detalle-producto/producto-empresas-servicios-banca-empresas";
        }
    }

}