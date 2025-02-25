/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-24-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
 **/
public with sharing class EncryptionConfigController {
    @AuraEnabled(cacheable=true)
    public static EncryptionConfig__mdt getRecordConfig(){
        return [
                            SELECT Key__c, IV__c,KeyConfig__c FROM EncryptionConfig__mdt
                            WHERE DeveloperName = 'DefaultConfig' LIMIT 1];
    }
    @AuraEnabled(cacheable=true)
    public static String getEncryptionConfig(){
        try {
            EncryptionConfig__mdt config = getRecordConfig();
            
            // Crear un objeto JSON con la Key e IV
            Map<String, String> configMap = new Map<String, String>{
                'key' => config.Key__c,
                'iv'  => config.IV__c
            };
            String jsonConfig = JSON.serialize(configMap);
            
            // Encriptar el JSON con AES
            String encryptedConfig = encryptAES(jsonConfig, config.KeyConfig__c);
            // Retornar el JSON cifrado
            return encryptedConfig;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    // Método para cifrar con AES y Base64
    private static String encryptAES(String data, String secretKey) {
        Blob keyBlob = Blob.valueOf(secretKey);
        Blob ivBlob = Blob.valueOf(secretKey.substring(0, 16)); // IV derivado de la clave
        Blob dataBlob = Blob.valueOf(data);
        Blob encryptedBlob = Crypto.encrypt('AES128', keyBlob, ivBlob, dataBlob);
        return EncodingUtil.base64Encode(encryptedBlob);
    }
    
    @AuraEnabled(cacheable=false)
    public static String decryptText(String encryptedText) {
        try {
            EncryptionConfig__mdt config = getRecordConfig();
            
            // Validar que la clave y el IV sean de 16 bytes
            if (String.isEmpty(config.Key__c) || String.isEmpty(config.IV__c) ||
            config.Key__c.length() != 16 || config.IV__c.length() != 16) {
                throw new SecurityException('Clave o IV inválidos en EncryptionConfig__mdt');
            }
            // Decodificar el texto cifrado desde Base64
            Blob textCifrado = EncodingUtil.base64Decode(encryptedText);
            
            // Convertir la clave y el IV a Blob
            Blob key = Blob.valueOf(config.Key__c);
            Blob iv = Blob.valueOf(config.IV__c);
            
            // Desencriptar el texto
            Blob decryptedBlob = Crypto.decrypt('AES128', key, iv, textCifrado);
            
            // Convertir a String
            String decryptedString = decryptedBlob.toString();
            
            return decryptedString;
        } catch (Exception e) {
            System.debug('Error en desencriptación: ' + e.getMessage());
            return 'ERROR: ' + e.getMessage();
        }
    }
}