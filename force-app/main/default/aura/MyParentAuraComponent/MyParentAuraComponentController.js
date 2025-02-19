/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-18-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
({
    handleDataEvent : function(component, event, _helper) {
let mss = event.getParam('message');
component.set('v.mensajeRecibido', mss);
    }
})