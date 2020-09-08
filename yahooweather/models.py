from django.db import models


class Weather(models.Model):
    city = models.CharField("City", max_length=240)
    temperature = models.CharField("Temperature", max_length=240)
    country = models.CharField("Country", max_length=240)
    wind_speed = models.IntegerField()
    humidity = models.IntegerField()
    pressure = models.IntegerField()
    condition = models.CharField("Condition", max_length=240)
    temperature = models.IntegerField()
    pubDate = models.DateTimeField("Publication Date", auto_now_add=True)

    def __str__(self):
        return self.city + 'weather'


class Forecast(models.Model):
    weather = models.ForeignKey(Weather, on_delete=models.CASCADE)
    day = models.CharField("Day", max_length=240)
    lowest_temp = models.IntegerField()
    highest_temp = models.IntegerField()
    condition = models.CharField("Condition", max_length=240)

    def __str__(self):
        return self.city + 'weather'
