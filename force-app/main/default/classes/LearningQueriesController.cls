/**
 * @author            : Fernando M. Acosta P.
 * @Equipo            : CRM
 * @last modified on  : 06-28-2025
 * @last modified by  : Fernando M. Acosta P.
 * @Descripción       : Componente o clase apex ...
**/
public with sharing class LearningQueriesController {
    /**
     * SOSL queries
     * 20 queries per each transaction - en un solo proceso se ejecutan 20 queries de este tipo - aplica para llamadas a APIs tambien
     * usando RETURNING se puede buscar hasta en 20 objetos en 1 sola consulta
     * retorna 2000 registros por objeto por cada consulta
     * FIND acepta palabras de no mas de 2000 caracteres
     * Se puede usar IN ALL FIELDS, IN NAME FIELDS, IN EMAIL FIELDS, IN PHONE FIELDS
     */
    @AuraEnabled(cacheable=true)
    public static Map<String, List<Object>> busquedaSOSL(String terminoBusqueda) {
        List<List<Object>> searchResults = [
            FIND :terminoBusqueda
            IN ALL FIELDS
            RETURNING
                Account(Id, Name),
                Contact(Id, FirstName, LastName, Email),
                Opportunity(Id, StageName, Name)
        ];
        System.debug('searchResults: ' + searchResults);
        Map<String,List<Object>> resultadoMap = new Map<String,List<Object>>();
        resultadoMap.put('accounts',searchResults[0]);
        resultadoMap.put('contacts',searchResults[1]);
        resultadoMap.put('oportunities',searchResults[2]);

        return resultadoMap;
    }
}