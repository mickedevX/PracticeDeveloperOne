/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 02-10-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Clase apex controladora para un visualforcepage
**/
public with sharing class theController {

    String searchText;
    List<Lead> results;

    public String getSearchText() {
        return searchText;
    }

    public void setSearchText(String s) {
        searchText = s;
    }

    public List<Lead> getResults() {
        return results;
    }

    public PageReference doSearch() {
        results = (List<Lead>)[FIND :searchText RETURNING Lead(Name, Email, Phone)][0];
        return null;
    }
}