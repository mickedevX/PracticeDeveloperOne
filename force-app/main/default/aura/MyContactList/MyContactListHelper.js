/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 12-29-2024
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
({
    cargarContactos: function (component, recordId) {
        var accion = component.get("c.getContacts");
        accion.setParams({
            recordId: recordId

        });
        accion.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.Contactos", response.getReturnValue());

            } else {
                console.error('Error al cargar los contactos');
            }
        });
        $A.enqueueAction(accion);
    },

    //funcion de manejo de errores
    handleError: function (component, response) {
        var errors = response.getError();
        if (errors) {
            if (errors[0] && errors[0].message) {
                console.error("Error message: " + errors[0].message);
            }
        } else {
            console.error("Unknown error");
        }
    }
})