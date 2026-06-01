import json

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST


def _parse_json_body(request):
    try:
        return json.loads(request.body.decode('utf-8') or '{}')
    except json.JSONDecodeError:
        return None


def _user_response(user):
    return {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
    }


@csrf_exempt
@require_POST
def register_user(request):
    payload = _parse_json_body(request)
    if payload is None:
        return JsonResponse({'error': 'Invalid JSON body'}, status=400)

    email = (payload.get('email') or '').strip().lower()
    password = payload.get('password') or ''
    username = (payload.get('username') or email).strip()
    first_name = (payload.get('first_name') or '').strip()
    last_name = (payload.get('last_name') or '').strip()

    if not email or not password:
        return JsonResponse({'error': 'Email and password are required'}, status=400)

    User = get_user_model()

    if User.objects.filter(email__iexact=email).exists():
        return JsonResponse({'error': 'User with this email already exists'}, status=400)

    if User.objects.filter(username__iexact=username).exists():
        return JsonResponse({'error': 'User with this username already exists'}, status=400)

    user = User(
        username=username,
        email=User.objects.normalize_email(email),
        first_name=first_name,
        last_name=last_name,
    )

    try:
        validate_password(password, user)
    except ValidationError as error:
        return JsonResponse({'errors': error.messages}, status=400)

    user.set_password(password)
    user.save()

    return JsonResponse({'user': _user_response(user)}, status=201)
