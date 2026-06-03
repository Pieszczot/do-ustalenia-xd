import json

from django.http import JsonResponse
from django.utils.dateparse import parse_date, parse_time
from django.views.decorators.http import require_POST

from services.models import Service

from .models import Pet, Reservation


def _parse_json_body(request):
    try:
        return json.loads(request.body.decode('utf-8') or '{}')
    except json.JSONDecodeError:
        return None


def _authentication_error(request):
    if request.user.is_authenticated:
        return None

    return JsonResponse({'error': 'Authentication required.'}, status=401)


def _reservation_response(reservation):
    return {
        'id': reservation.id,
        'user_id': reservation.user_id,
        'pet_id': reservation.pet_id,
        'service_id': reservation.service_id,
        'reservation_date': reservation.reservation_date.isoformat(),
        'reservation_time': reservation.reservation_time.isoformat(),
        'problem_description': reservation.problem_description,
        'status': reservation.status,
    }


def _pet_response(pet):
    return {
        'id': pet.id,
        'user_id': pet.user_id,
        'name': pet.name,
        'species': pet.species,
    }


def _required_int(payload, field_name, errors):
    value = payload.get(field_name)
    if value in (None, ''):
        errors[field_name] = 'This field is required.'
        return None

    if isinstance(value, bool):
        errors[field_name] = 'This field must be an integer.'
        return None

    try:
        return int(value)
    except (TypeError, ValueError):
        errors[field_name] = 'This field must be an integer.'
        return None


def _required_text(payload, field_name, errors):
    value = payload.get(field_name)
    if value in (None, ''):
        errors[field_name] = 'This field is required.'
        return None

    if not isinstance(value, str):
        errors[field_name] = 'This field must be a string.'
        return None

    value = value.strip()
    if not value:
        errors[field_name] = 'This field is required.'
        return None

    return value


@require_POST
def create_pet(request):
    auth_error = _authentication_error(request)
    if auth_error is not None:
        return auth_error

    payload = _parse_json_body(request)
    if payload is None:
        return JsonResponse({'error': 'Invalid JSON body'}, status=400)

    errors = {}
    name = _required_text(payload, 'name', errors)
    species = _required_text(payload, 'species', errors)

    if errors:
        return JsonResponse({'errors': errors}, status=400)

    pet = Pet.objects.create(
        user=request.user,
        name=name,
        species=species,
    )

    return JsonResponse({'pet': _pet_response(pet)}, status=201)


@require_POST
def create_reservation(request):
    auth_error = _authentication_error(request)
    if auth_error is not None:
        return auth_error

    payload = _parse_json_body(request)
    if payload is None:
        return JsonResponse({'error': 'Invalid JSON body'}, status=400)

    errors = {}
    pet_id = _required_int(payload, 'pet_id', errors)
    service_id = _required_int(payload, 'service_id', errors)

    reservation_date_raw = payload.get('reservation_date')
    reservation_date = (
        parse_date(reservation_date_raw.strip())
        if isinstance(reservation_date_raw, str)
        else None
    )
    if reservation_date is None:
        errors['reservation_date'] = 'Use YYYY-MM-DD format.'

    reservation_time_raw = payload.get('reservation_time')
    reservation_time = (
        parse_time(reservation_time_raw.strip())
        if isinstance(reservation_time_raw, str)
        else None
    )
    if reservation_time is None:
        errors['reservation_time'] = 'Use HH:MM or HH:MM:SS format.'
    elif (
        reservation_time.minute not in (0, 30)
        or reservation_time.second != 0
        or reservation_time.microsecond != 0
    ):
        errors['reservation_time'] = 'Reservation time must be in 30-minute slots.'

    problem_description = payload.get('problem_description')
    if problem_description in ('', None):
        problem_description = None
    elif isinstance(problem_description, str):
        problem_description = problem_description.strip() or None
    else:
        errors['problem_description'] = 'This field must be a string.'

    if errors:
        return JsonResponse({'errors': errors}, status=400)

    try:
        pet = Pet.objects.get(id=pet_id)
    except Pet.DoesNotExist:
        pet = None
        errors['pet_id'] = 'Pet does not exist.'

    try:
        Service.objects.get(id=service_id)
    except Service.DoesNotExist:
        errors['service_id'] = 'Service does not exist.'

    if pet is not None and pet.user_id != request.user.id:
        errors['pet_id'] = 'Pet does not belong to this user.'

    if Reservation.objects.filter(
        reservation_date=reservation_date,
        reservation_time=reservation_time,
    ).exists():
        errors['reservation_time'] = 'This date and time is already taken.'

    if errors:
        return JsonResponse({'errors': errors}, status=400)

    reservation = Reservation.objects.create(
        user=request.user,
        pet_id=pet_id,
        service_id=service_id,
        reservation_date=reservation_date,
        reservation_time=reservation_time,
        problem_description=problem_description,
    )

    return JsonResponse({'reservation': _reservation_response(reservation)}, status=201)
