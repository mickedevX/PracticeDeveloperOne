/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-20-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
 **/
public with sharing class EncryptService {
    
    @AuraEnabled(cacheable=false)
    public static String decryptText(String encryptedText) {
        try {
            // Obtener la clave y IV desde el Custom Metadata Type
            EncryptionConfig__mdt config = [
                            SELECT Key__c, IV__c FROM EncryptionConfig__mdt 
                            WHERE DeveloperName = 'DefaultConfig' LIMIT 1
                        ];
            
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
            System.debug('Key Length: ' + config.Key__c.length());
            System.debug('IV Length: ' + config.IV__c.length());
            
            // Desencriptar el texto
            Blob decryptedBlob = Crypto.decrypt('AES128', key, iv, textCifrado);
            
            // Convertir a String
            String decryptedString = decryptedBlob.toString();
            System.debug('Decrypted Value: ' + decryptedString);
            
            return decryptedString;
        } catch (Exception e) {
            System.debug('Error en desencriptación: ' + e.getMessage());
            return 'ERROR: ' + e.getMessage();
        }
    }
}