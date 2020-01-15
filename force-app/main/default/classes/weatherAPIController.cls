public with sharing class weatherAPIController {
    public weatherAPIController() {

    }
    @AuraEnabled
    public static string getWeatherData(String cityName) {

     HttpRequest req = new HttpRequest();
     req.setEndpoint('http://api.weatherstack.com/current?access_key=**************************&query='+cityName);
     req.setMethod('GET');

     Http http = new Http();
     HTTPResponse res = http.send(req);
     return res.getBody();
    }
}