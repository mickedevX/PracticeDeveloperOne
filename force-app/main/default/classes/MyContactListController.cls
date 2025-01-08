/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 12-27-2024
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
 **/
public with sharing class MyContactListController {
    @AuraEnabled
    public static List<Contact>getContacts(Id recordId) {
        try {
            return [SELECT Id, FirstName, LastName, Email, Phone FROM Contact WHERE AccountId = :recordId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}