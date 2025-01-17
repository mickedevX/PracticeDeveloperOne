/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 01-16-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
@isTest
public with sharing class PlatformEventTest {
    @istest
    static void test1(){
        Cloud_New__e newsEvent = new Cloud_New__e();
        newsEvent.Location__c = 'San Francisco';
        newsEvent.Urgent__c = true;
        newsEvent.News_Content__c = 'Test message';
        Test.startTest();
        Database.SaveResult sr = EventBus.publish(newsEvent);
        Test.stopTest();
        System.assertEquals(true, sr.isSuccess());
        List<Case> cases= [SELECT Id FROM Case];
        System.assertEquals(1, cases.size());
    }
}