/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-18-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Controller del clientedel aura component
**/
({
	cambiarMensaje : function(component, event, helper) {
		let nuevoMensaje = 'Mensahe cambiado ahora!!';
		let nuevoColor ='lightblue';
        component.set("v.mensaje",nuevoMensaje);
        component.set("v.colorFondo",nuevoColor);
		
	}
})
