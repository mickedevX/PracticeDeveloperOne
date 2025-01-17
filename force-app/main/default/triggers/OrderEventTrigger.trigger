/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 01-17-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
 **/
trigger OrderEventTrigger on Order_Event__e (after insert) {
    List<Task> tasks = new List<Task>();
    for (Order_Event__e event : Trigger.new) {
        if (event.Has_Shipped__c==true) {
            Task ts = new Task();
            ts.Priority = 'Medium';
            ts.Status='New';
            ts.Subject = 'Follow up on shipped order '+event.Order_Number__c;
            ts.OwnerId = Userinfo.getUserId();
                tasks.add(ts);
        }
    }
    insert tasks;
}