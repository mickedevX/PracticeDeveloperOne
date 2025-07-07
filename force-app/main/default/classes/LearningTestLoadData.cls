/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 07-06-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
@isTest
public with sharing class LearningTestLoadData {
    @isTest
    static void testAccountTrigger(){
        List<Account> testAccounts = (List<Account>)Test.loadData(Account.sObjectType, 'AccountData');
        System.debug('testAccounts: ' + testAccounts);

        System.assertEquals(31,[SELECT COUNT() FROM Account WHERE Name like 'Cuenta%']);
    }
}