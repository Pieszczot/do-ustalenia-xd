from django.urls import path

from .views import create_pet, create_reservation


urlpatterns = [
    path('bookings', create_reservation, name='booking-create'),
    path('pets', create_pet, name='pet-create'),
]
