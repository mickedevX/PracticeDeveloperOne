/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-03-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
 **/
public with sharing class EncryptService {
    
    @AuraEnabled(cacheable=false)
    public static String decryptText(String encryptedText) {
        try {
            // Decodificar el texto cifrado desde Base64
            Blob textCifrado = EncodingUtil.base64Decode(encryptedText);
            
            // Clave AES-128 (16 bytes)
            Blob key = Blob.valueOf('1234567890123456'); // EXACTAMENTE 16 caracteres
            
            // IV (16 bytes)
            Blob iv = Blob.valueOf('1234567890123456'); // EXACTAMENTE 16 caracteres
            
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