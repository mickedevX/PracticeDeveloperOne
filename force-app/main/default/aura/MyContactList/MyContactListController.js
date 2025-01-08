/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 12-29-2024
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
({
    myActionToPractice: function (component, event, helper) {
        component.set("v.Columnas", [
            { label: "Primer Nombre", fieldName: "FirstName", type: "text" },
            { label: "Apellido", fieldName: "LastName", type: "text" },
            { label: "Teléfono", fieldName: "Phone", type: "phone" },
            { label: "Correo", fieldName: "Email", type: "email" }
        ]);
        
        helper.cargarContactos(component, component.get("v.recordId"));
    }
})