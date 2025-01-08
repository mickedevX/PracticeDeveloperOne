/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 08-02-2024
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente hijo
**/
import { LightningElement } from 'lwc';

export default class ControlChild extends LightningElement {
    factors = [0,2,3,4,5,6];

    handleAdd() {
        this.dispatchEvent(
            new CustomEvent('add')
        )
    }

    handleMultiply(event) {
        const factor = event.target.dataset.factor;
        this.dispatchEvent(new CustomEvent('multiply', {
          detail: factor
        }));
      }

    handleSubtract() {
        this.dispatchEvent(
            new CustomEvent('subtract')
        )
    }
}
