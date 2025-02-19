/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-18-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
({
    lanzarEvento : function(component, _event, _helper) {
        let evento = component.getEvent("eventFromChild");
        evento.setParams({message: "Enviando un hola desde child!!!"});
        evento.fire();
    }
})