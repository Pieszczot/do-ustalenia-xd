from django.urls import path

from .views import create_pet, create_reservation


urlpatterns = [
    path('pets/', create_pet, name='pet-create'),
    path('reservations/', create_reservation, name='reservation-create'),
]
