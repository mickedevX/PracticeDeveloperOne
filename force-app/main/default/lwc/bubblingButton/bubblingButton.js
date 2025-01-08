/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 08-02-2024
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente de propagación
**/
import { LightningElement, api } from 'lwc';

export default class BubblingButton extends LightningElement {
    @api label;
    @api icon;
    handleButton(event) {
      this.dispatchEvent(new CustomEvent('buttonclick',{
        // bubbles: true
      }));
    }
}