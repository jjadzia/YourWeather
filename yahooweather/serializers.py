from rest_framework import serializers
from .models import Weather, Forecast


class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weather
        fields = ('city', 'temperature', 'country', 'wind_speed', 'humidity', 'pressure', 'condition', 'temperature', 'pubDate')


class ForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forecast
        fields = ('day', 'lowest_temp', 'highest_temp', 'condition')
