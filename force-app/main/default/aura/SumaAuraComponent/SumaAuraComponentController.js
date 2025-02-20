/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-20-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
({
    sumar: function (component, event, helper) {

        let a = parseInt(component.get("v.num1"));
        let b = parseInt(component.get("v.num2"));

        helper.calculoSuma(component, a, b);
    },
    multiplicar: function(component, event, helper){
        helper.llamarApexMultiplicar(component);
    }
})