from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import string
from .models import Weather, Forecast
from constants import AppId, ClientId, ClientSecret
from .serializers import WeatherSerializer, ForecastSerializer
from yahoo_weather.weather import YahooWeather

@api_view(['GET'])
def weather_in_city(request, cityname):
    if request.method == 'GET':
        city_name = "tehran"
        try:
            weather = YahooWeather(APP_ID=AppId,
                     api_key=ClientId,
                     api_secret=ClientSecret)
            weather.get_yahoo_weather_by_city(cityname)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        data = Weather(city=weather.location.city, temperature=weather.current_observation.condition.temperature,
                       country=weather.location.country, wind_speed=weather.current_observation.wind.speed,
                       humidity=weather.current_observation.atmosphere.humidity, pressure=weather.current_observation.atmosphere.pressure,
                       condition=weather.current_observation.condition.text, pubDate=weather.current_observation.pubDate)
        w_serializer = WeatherSerializer(data)
        forcasts = []

        for forecast in weather.forecasts:
                newforecast = Forecast(day=forecast.day, weather=data, lowest_temp=forecast.low, highest_temp=forecast.high,
                                        condition=forecast.text)
                f_serializer = ForecastSerializer(newforecast)
                forcasts.append(f_serializer.data)
        return Response([w_serializer.data, forcasts])


@api_view(['GET'])
def weather_by_location(request, latitude, longitude):
    if request.method == 'GET':
        print(latitude, longitude)
        try:
            weather = YahooWeather(APP_ID=AppId,
                     api_key=ClientId,
                     api_secret=ClientSecret)
            weather.get_yahoo_weather_by_location(latitude, longitude)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        data = Weather(city=weather.location.city, temperature=weather.current_observation.condition.temperature,
                       country=weather.location.country, wind_speed=weather.current_observation.wind.speed,
                       humidity=weather.current_observation.atmosphere.humidity, pressure=weather.current_observation.atmosphere.pressure,
                       condition=weather.current_observation.condition.text, pubDate=weather.current_observation.pubDate)
        w_serializer = WeatherSerializer(data)
        forcasts = []

        for forecast in weather.forecasts:
                newforecast = Forecast(day=forecast.day, weather=data, lowest_temp=forecast.low, highest_temp=forecast.high,
                                        condition=forecast.text)
                f_serializer = ForecastSerializer(newforecast)
                forcasts.append(f_serializer.data)
        return Response([w_serializer.data, forcasts])

