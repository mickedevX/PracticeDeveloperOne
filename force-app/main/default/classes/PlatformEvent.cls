/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 01-16-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
public with sharing class PlatformEvent {
    public static void showPublish(){
        // List to hold event objects to be published.
        List<Cloud_New__e> newsEventList = new List<Cloud_New__e>();
        // Create event objects.
        Cloud_New__e newsEvent1 = new Cloud_New__e(
            Location__c='Mountain City',
            Urgent__c=true,
            News_Content__c='Lake Road is closed due to mudslides.');
        Cloud_New__e newsEvent2 = new Cloud_New__e(
            Location__c='Mountain City',
            Urgent__c=false,
            News_Content__c='Small incident on Goat Lane causing traffic.');
        // Add event objects to the list.
        newsEventList.add(newsEvent1);
        newsEventList.add(newsEvent2);
        // Call method to publish events.
        List<Database.SaveResult> results = EventBus.publish(newsEventList);
        // Inspect publishing result for each event
        for (Database.SaveResult sr : results) {
            if (sr.isSuccess()) {
                System.debug('Successfully published event.');
            } else {
                for(Database.Error err : sr.getErrors()) {
                    System.debug('Error returned: ' +
                        err.getStatusCode() +
                        ' - ' +
                        err.getMessage());
                }
            }
        }
    }
}