/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-13-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Clase apex para crear ejercicios de prueba
 **/
public with sharing class LearningApexClassController {
    
    @RemoteAction
    public static String saludar(String name) {
        return 'Hola, ' + name + '. Soy el servicio web APEX!';
    }
    
    @RemoteAction
    public static List<String> saludarMultiples(List<String> names) {
        
        List<String> saludo = new List<String>();
        for(String name : names){
            saludo.add('Hola, ' + name + '!. Soy el servicio Web Apex');
        }
        return saludo;
    }
    
    //Usando objetos custom
    public class Persona{
        public String nombre;
        public Integer edad;
        
        public Persona(String nombre, Integer edad){
            this.nombre = nombre;
            this.edad = edad;
        }
    }
    
    @RemoteAction
    public static List<String> saludarPersonas(List<Persona> personas) {
        List<String> saludos = new List<String>();
        for (Persona p : personas) {
            String mensaje = 'Hola, '+p.nombre+ ' tienes '+p.edad+' años.';
            saludos.add(mensaje);
        }
        
        return saludos;
    }
    
    //Usando objetos custom y control de errores
    @RemoteAction
    public static Object handleSaludos(List<Persona> personas) {
        try {
            //Solo los usuarios que tienen acceso pueden ejecutar
            if (!Schema.SObjectType.Account.isAccessible()){
                throw new System.NoAccessException();
            }
            if (personas==null || personas.isEmpty()) {
                throw new IllegalArgumentException('La lista de personas no puede estar vacía.');
            }
            List<String> saludos = new List<String>();
            for (Persona p : personas) {
                if (p.nombre == null || p.nombre.trim() == '') {
                    throw new IllegalArgumentException('El nombre no puede estar vacío.');
                }
                if (p.edad == null || p.edad <= 0) {
                    throw new IllegalArgumentException('La edad debe ser mayor a 0.');
                }
                
                String mensaje = 'Hola, ' + p.nombre + '. Tienes ' + p.edad + ' años.';
                saludos.add(mensaje);
            }
            return saludos;
        } catch (Exception e) {
            return new Map<String, Object>{
                'error'=> true,
                'mensaje'=>e.getMessage()+e.getStackTraceString()
            };
        }
        
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> obtenerContactos(){
        try {
            System.debug('request>>>>'+
                [
                    SELECT Id, Name, Title, Phone, Email
                    FROM Contact
                    WHERE Email != null]);
            return [
                SELECT Id, Name, Title,Phone, Email
                FROM Contact
                WHERE Email != null
                WITH SECURITY_ENFORCED
                LIMIT 10
            ];
        } catch (Exception e) {
            throw new AuraHandledException('ERROR>>>> '+e.getMessage()+e.getStackTraceString());
        }
    }
    
    
    @AuraEnabled
    public static List<Contact> findContactos(String searchKey) {
        String key = '%' + searchKey + '%';
        return [
            SELECT Id, Name, Title, Phone,Email
            FROM Contact
            WHERE Name LIKE :key
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }

    
}