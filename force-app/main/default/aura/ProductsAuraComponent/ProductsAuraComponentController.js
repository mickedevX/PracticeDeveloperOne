/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 03-04-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente aura controller para cambiar el precio.
**/
({
    changePrice : function(component, event, helper) {
        helper.obtenerNuevoPrecio(component);
    }
})