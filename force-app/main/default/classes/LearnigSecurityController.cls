/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 06-28-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Clase apex para aprender Securidad en Salesforce
**/
public with sharing class LearnigSecurityController {
    /**
     * Field level security FLS
     */
    public static void metodo01_learnigStripInaccessible(){
        String acctJSON = '[{"Name":"Nombre de prueba security01","Phone":"0998989876"},{"Name":"Nombre de prueba security02","Phone":"0994545678"},{"Name":"Nombre de prueba security03","Phone":"099767854"}]';
        List<Account> accts = (List<Account>)JSON.deserialize(acctJSON,List<Account>.class);
        SObjectAccessDecision sd = Security.stripInaccessible(AccessType.CREATABLE, accts);
        System.debug('Imprime sd>>'+sd);
        List<Account> insertableAccounts = (List<Account>)sd.getRecords();
        try{
            insert insertableAccounts;
            System.debug('Registros insertados correctamente!');
        }catch (DmlException e){
            System.debug('Error en el proceso de insersion de registros '+e.getMessage());
        }
    }
}