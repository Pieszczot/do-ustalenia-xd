from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .models import Service


@require_GET
def service_list(request):
    services = [
        {
            'id': service.id,
            'name': service.name,
            'price_from': str(service.price_from) if service.price_from is not None else None,
            'description': service.description,
        }
        for service in Service.objects.all()
    ]
    return JsonResponse(services, safe=False)
