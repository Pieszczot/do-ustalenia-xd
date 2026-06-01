from django.contrib import admin

from .models import Pet, Reservation


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'species', 'user')
    search_fields = ('name', 'species', 'user__username', 'user__email')


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'pet', 'service', 'reservation_date', 'reservation_time', 'status')
    list_filter = ('status', 'reservation_date')
    search_fields = ('user__username', 'user__email', 'pet__name', 'service__name')
