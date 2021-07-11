
# teco-applicant-backend

Es un API que provee en formato JSON el estado del tiempo basado en diferentes endpoints. 

Utiliza los servicios https://ip-api.com/ y https://openweathermap.org/api para obtener la ubicacion y el estado del tiempo.


## Instalacion

Instale las dependencias del proyecto

```bash
npm install
```

En el archivo config.json, setear la API Key de OpenWeatherMap.

```json
{
    "openWeather_APIkey": "4525e5534afa4dc838864ce7d682da9d"
}
```


```node
/* inicie la aplicacion */
npm start
```
```node
/* para correr los tests */
npm tests 
```

 ## Ruta base: 
* ### /v1 
## Endpoints:  
* ### /location         
 Devuelve los datos de ubicación city según ip-api. 
 
* ### /current/[city] 
City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo actual. 
          
* ### /forecast/[city]
City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo a 5 días. 

