/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-20-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
({
    calculoSuma: function (component, numero1, numero2) {
        let respuesta = numero1 + numero2;
        component.set("v.result", respuesta);
    },
    //Usando CallBacks
    llamarApexMultiplicar: function(component){
        console.log("Ingreso a llamarApexMultiplicar");
        let action = component.get("c.multiplicarEnteros"); // es el nombre del método en el controlador de Apex
        console.log("action: ", action);
        action.setParams({
            "a": component.get("v.num1"),
            "b": component.get("v.num2")
        });

        action.setCallback(this, function(response){
            console.log("response: ", response);
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.producto", response.getReturnValue());
            }else{
                console.log("Error en la llamada al servidor");
            }
        });

        $A.enqueueAction(action);
    }
})