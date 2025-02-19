/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-18-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
({
    sendEvent : function(component, event, helper) {
        let dataevent = $A.get("e.c:MyApplicationEvent");
        dataevent.setParams({dataSendTunnel:'>>>>>> ENVIO DE DATA >>>>>>'});
        dataevent.fire();
    }
})