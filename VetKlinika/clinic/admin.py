from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html

from .models import Pet, Reservation


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ('id', 'edit_link', 'name', 'species', 'user')
    search_fields = ('name', 'species', 'user__username', 'user__email')

    def edit_link(self, obj):
        url = reverse('admin:clinic_pet_change', args=[obj.id])
        return format_html('<a href="{}">Edytuj</a>', url)

    edit_link.short_description = ''


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('id', 'edit_link', 'user', 'pet', 'service', 'reservation_date', 'reservation_time', 'status')
    list_editable = ('status',)
    list_filter = ('status', 'reservation_date')
    search_fields = ('user__username', 'user__email', 'pet__name', 'service__name')

    def edit_link(self, obj):
        url = reverse('admin:clinic_reservation_change', args=[obj.id])
        return format_html('<a href="{}">Edytuj</a>', url)

    edit_link.short_description = ''
