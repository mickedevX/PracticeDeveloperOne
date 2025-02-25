/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-24-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
import CRYPTO_JS from '@salesforce/resourceUrl/CryptoJS';
import { loadScript } from 'lightning/platformResourceLoader';
import getEncryptionConfig from '@salesforce/apex/EncryptionConfigController.getEncryptionConfig';

let cryptoInitialized = false;
const typeSite = 'siteSalesforceWR'// Definida como constante global, // Debe coincidir con la usada en Apex

/**
 * Cargar CryptoJS dinámicamente
 */
export async function loadCryptoJS(context) {
    if (!cryptoInitialized) {
        await loadScript(context, CRYPTO_JS);
        cryptoInitialized = true;
        console.log('CryptoJS cargado correctamente.');
    }
}
/**
 * Obtener y desencriptar la clave y el IV desde Apex
 */
export async function getDecryptedKeyAndIV() {
    try {
        const encryptedConfig = await getEncryptionConfig(); // Ahora es un string encriptado
        // Desencriptar el JSON completo
        const decryptedJson = decryptAES(encryptedConfig, typeSite);
        // Parsear el JSON para extraer key e IV
        const { key, iv } = JSON.parse(decryptedJson);
        return { key, iv };
    } catch (error) {
        console.error('Error obteniendo claves de encriptación:', error);
        return { key: null, iv: null };
    }
}
/**
 * Desencriptar la clave e IV con AES antes de usarlas en el cifrado
 */
function decryptAES(encryptedValue, secretKey) {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const iv = CryptoJS.enc.Utf8.parse(secretKey.substring(0, 16));
    const decrypted = CryptoJS.AES.decrypt(encryptedValue, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
/**
 * Encriptar un valor dado con AES
 */
export function encryptData(value, key, iv) {
    if (!cryptoInitialized || !key || !iv) {
        console.error('CryptoJS no está inicializado o claves no disponibles.');
        return null;
    }
    // Encriptar en AES-CBC con PKCS7 y devolver directamente en Base64
    const encrypted = CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString(); // Retorna Base64 directamente
}


