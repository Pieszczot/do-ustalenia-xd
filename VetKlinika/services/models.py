from django.db import models


class Service(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    price_from = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
    )
    description = models.TextField(null=True, blank=True)

    class Meta:
        managed = False
        db_table = 'services'
        ordering = ['id']

    def __str__(self):
        return self.name
