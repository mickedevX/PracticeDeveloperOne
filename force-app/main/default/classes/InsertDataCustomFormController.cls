/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 03-01-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
 **/
public with sharing class InsertDataCustomFormController {
    @AuraEnabled
    public static string insertRecordOfPersonaSObject(String encryptedData){
        if (String.isBlank(encryptedData)) {
            throw new AuraHandledException('La data encriptada es requerida');
        }
        try {
             // Desencriptar el JSON completo
             String decryptedJson = EncryptionConfigController.decryptText(encryptedData);

             // Parsear el JSON desencriptado
             Map<String, Object> dataMap = (Map<String, Object>) JSON.deserializeUntyped(decryptedJson);
             String cedula = (String) dataMap.get('cedula');
             String celular = (String) dataMap.get('celular');
 
             if (String.isBlank(cedula) || String.isBlank(celular)) {
                 throw new AuraHandledException('Los campos cédula y celular son requeridos');
             }
            Persona__c persona = new Persona__c();
            persona.Cedula__c = cedula;
            persona.Celular__c = celular;
            
            //Insercion de registros
            Database.SaveResult resultado = Database.insert(persona, false);
            if (!resultado.isSuccess()) {
                List<Database.Error> errores = resultado.getErrors();
                String mensajeError = 'Error al insertar el registro: ';
                for (Database.Error error : errores) {
                    mensajeError += error.getMessage();
                }
                throw new AuraHandledException(mensajeError);
            }
            return 'Registro insertado correctamente';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}