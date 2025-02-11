/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-10-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
 **/
public with sharing class MyFirstVisualForcePagw {
    public String mensaje {get;set;}
    public String mensajeExito {get;set;}
    //Constructor
    public MyFirstVisualForcePagw() {
        mensaje = '';
        mensajeExito = '';
    }
    
    //metodos
    public void actualizarMensaje(){
        System.debug('Al llamar a esta método se actualiza la variable mensaje');
        System.debug('mensaje'+mensaje);
        if (mensaje!=null && mensaje.length()>20) {
            mensaje=mensaje.substring(0,20);
        }
        
    }
    
    public void cambiarMayusculas(){
        if (mensaje == null || mensaje.trim() == '') {
            mensaje='no hay texto';
            mensajeExito = '';
        } else {
            mensaje=mensaje.toUpperCase();
            mensajeExito = '✅ ¡Mensaje convertido con éxito!';
        }
    }
    
    public void limpiarMensaje(){
        mensaje='';
        mensajeExito = '';
    }
    
}