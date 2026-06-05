from django.urls import path

from .views import available_slots, create_pet, create_reservation


urlpatterns = [
    path('bookings', create_reservation, name='booking-create'),
    path('pets', create_pet, name='pet-create'),
    path('slots', available_slots, name='available-slots'),
]
