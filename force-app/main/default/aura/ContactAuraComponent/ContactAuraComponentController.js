/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 03-07-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
({
    saveContact : function(component, event, helper) {
        console.log('Ingreso a la funcion SaveRecord');
        let recordData = component.find("recordData");
        // Guardar el registro
        recordData.saveRecord($A.getCallback(function(saveResult){
            if(saveResult.state === 'SUCCESS' || saveResult.state === 'DRAFT'){
                console.log('>>>>saveResult.state>>>>> ' + saveResult.state);
                console.log('Registro guardado correctamente');
                console.log('saveResult data>>> ' + JSON.stringify(saveResult));
                component.set("v.recordSaveError", "");
                // Actualizar contactRecord con los datos guardados
                let savedContact = saveResult.action.params.recordRep.fields;
                console.log('>>>>>>>>> '+savedContact);
                component.set("v.contactRecord", savedContact);
            } else if(saveResult.state === 'INCOMPLETE'){
                console.log('>>>>' + saveResult.state);
                console.log('Registro incompleto');
                component.set("v.recordSaveError", "Error: no hay conexión con el servidor");
            } else if(saveResult.state === 'ERROR'){
                console.log('>>>>' + saveResult.state);
                let errors = saveResult.error;
                let message = 'Error desconocido';
                if(errors && Array.isArray(errors) && errors.length > 0){
                    message = errors[0].message;
                }
                component.set("v.recordSaveError", message);
            } else {
                component.set("v.recordSaveError", "Error: estado desconocido" + saveResult.state);
            }
        }));
    },

    handleRecordUpdated: function(component, event, helper) {
        let eventParams = event.getParams();
        if(eventParams.changeType === 'LOADED'){
            let contactRecord = component.get('v.contactRecord');
            console.log('>>>>' + eventParams.changeType);
            console.log('Registro cargado: ', contactRecord);
            console.log('Registro cargado (JSON): ' + JSON.stringify(contactRecord));

            // Verificar si los valores están correctamente cargados
            if(contactRecord && contactRecord.FirstName) {
                console.log('FirstName: ' + contactRecord.FirstName);
                console.log('LastName: ' + contactRecord.LastName);
                console.log('Email: ' + contactRecord.Email);
            } else {
                console.log('Error: No se cargó el FirstName correctamente');
            }
        } else if (eventParams.changeType === 'ERROR'){
            console.log('>>>>' + eventParams.changeType);
            console.log('Error al cargar el registro');
        }
    }
})
