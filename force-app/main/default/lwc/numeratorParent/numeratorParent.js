/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 08-02-2024
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente padre.
**/
import { LightningElement } from 'lwc';

export default class NumeratorParent extends LightningElement {
    counter = 0;
    handleIncrement(){
        this.counter++;
    }

    handleDecrement(){
        this.counter--;
    }

    handleMultiply(event) {
        const factor = event.detail;
        this.counter *= factor;
      }
}