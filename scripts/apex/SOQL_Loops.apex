/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-10-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : SOQL For loops
**/

List<Lead> leadsToUpdate = new List<Lead>();

for (List<Lead> theseLeads : [SELECT Id, LastName, Email FROM Lead LIMIT 2000]) {
    for (Lead thisLead : theseLeads) {
        if (thisLead.Email == 'norm_may@greenwich.net') {
            thisLead.Email = 'michaelacosta80@generic.email.com';
            System.debug('Updating Lead Email: ' + thisLead.Id + ' -> ' + thisLead.Email);
            leadsToUpdate.add(thisLead);
        }
    }
}

// Ejecutar update solo si hay registros modificados
if (!leadsToUpdate.isEmpty()) {
    Database.update(leadsToUpdate, false);
}