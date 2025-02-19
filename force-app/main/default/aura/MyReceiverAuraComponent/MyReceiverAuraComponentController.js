/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-18-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
({
    handleEvent : function(component, event, helper) {
        let mensaje = event.getParam('dataSendTunnel');
        component.set('v.mensajeRecibido', mensaje);

    }
})