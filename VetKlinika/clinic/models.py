from django.conf import settings
from django.db import models

from services.models import Service


class Pet(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='pets',
    )
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'pets'
        ordering = ['id']

    def __str__(self):
        return self.name


class Reservation(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_CONFIRMED = 'confirmed'
    STATUS_COMPLETED = 'completed'
    STATUS_CANCELLED = 'cancelled'

    STATUS_CHOICES = [
        (STATUS_PENDING, 'Oczekuje'),
        (STATUS_CONFIRMED, 'Potwierdzona'),
        (STATUS_COMPLETED, 'Zakonczona'),
        (STATUS_CANCELLED, 'Anulowana'),
    ]

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reservations',
    )
    pet = models.ForeignKey(
        Pet,
        on_delete=models.CASCADE,
        related_name='reservations',
    )
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='reservations',
    )
    reservation_date = models.DateField()
    reservation_time = models.TimeField()
    problem_description = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default=STATUS_PENDING)

    class Meta:
        managed = False
        db_table = 'reservations'
        ordering = ['id']

    def __str__(self):
        return f'{self.pet} - {self.reservation_date} {self.reservation_time}'
