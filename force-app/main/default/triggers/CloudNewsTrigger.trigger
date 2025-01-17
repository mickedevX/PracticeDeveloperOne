/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 01-14-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
 **/
trigger CloudNewsTrigger on Cloud_New__e (after insert) {
    List<Case> cases = new List<Case>();
    Group queue = [SELECT Id FROM Group WHERE Name='Regional Dispatch' AND Type='Queue'];
    for (Cloud_New__e event : Trigger.new) {
        if (event.Urgent__c==true) {
            // Create Case to dispatch new team.
            Case cs = new Case();
            cs.Priority = 'High';
            cs.Subject = 'News team dispatch to ' +
                event.Location__c;
            cs.OwnerId = queue.Id;
            cases.add(cs);
            
        }
        
    }
    insert cases;
    
}