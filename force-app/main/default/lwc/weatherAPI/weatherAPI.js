import { LightningElement, track } from 'lwc';
import getWeather from '@salesforce/apex/weatherAPIController.getWeatherData';

export default class weatherAPI extends LightningElement {
    /**
     * @track indicates that if this object changes,
     * the UI should update to reflect those changes.
     */
    @track temp = 0;
    @track humidity = 0;
    @track city = '';
    @track pressure = 0;
    @track time = '';
    @track timeZone = '';
    @track windSpeed = 0;
    @track weatherDes = [];
    @track weatherImage = '';
    @track resetBoolean = false;
    @track isLoaded = false;
    @track cityName;


    cityNameHandle(event) {
        this.cityName = event.target.value;
        this.resetBoolean = false;
    }

    handleClick() {
        if (this.cityName === undefined || this.cityName === null || this.cityName === '') {
            this.resetBoolean = false;
            alert('Please enter city name');
            return false;
        }
        this.isLoaded = true;
        getWeather({ cityName: this.cityName })
            .then(result => {
                var weather = JSON.parse(result);
                this.temp = weather.current.temperature;
                this.humidity = weather.current.humidity;
                this.city = weather.location.name;
                this.pressure = weather.current.pressure;
                this.time = weather.location.localtime;
                this.timeZone = weather.location.timezone_id;
                this.windSpeed = weather.current.wind_speed;
                this.weatherDes = weather.current.weather_descriptions;
                this.weatherImage = weather.current.weather_icons;
                this.resetBoolean = true;
                this.isLoaded = false;
            })
            .catch(error => {
                window.console.log('callout error ===> ' + JSON.stringify(error));
            })
    }
}