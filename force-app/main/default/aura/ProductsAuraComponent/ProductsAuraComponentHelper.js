/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 03-04-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente aura - helper para cambiar el precio.
**/
({
    obtenerNuevoPrecio : function(component) {
        let action = component.get("c.obtenerNuevoPrecio");

        action.setCallback(this, function(response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                let nuevoPrecio = response.getReturnValue();
                component.set("v.priceProduct", nuevoPrecio);
            }else{
                console.error("Error en la llamada al servidor");
            }
        });
        $A.enqueueAction(action);
    }
})