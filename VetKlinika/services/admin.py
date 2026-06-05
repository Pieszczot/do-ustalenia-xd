from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html

from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'edit_link', 'name', 'price_from')
    search_fields = ('name',)

    def edit_link(self, obj):
        url = reverse('admin:services_service_change', args=[obj.id])
        return format_html('<a href="{}">Edytuj</a>', url)

    edit_link.short_description = ''
