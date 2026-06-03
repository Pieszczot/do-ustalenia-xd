import json

from django.contrib.auth import authenticate, get_user_model, login
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_POST


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


@csrf_exempt
@require_POST
def login_user(request):
    payload = _parse_json_body(request)
    if payload is None:
        return JsonResponse({'error': 'Invalid JSON body'}, status=400)

    identifier = (payload.get('email') or payload.get('username') or '').strip()
    password = payload.get('password') or ''

    if not identifier or not password:
        return JsonResponse({'error': 'Email or username and password are required'}, status=400)

    username = identifier
    User = get_user_model()

    try:
        user = User.objects.get(email__iexact=identifier)
        username = user.get_username()
    except User.DoesNotExist:
        pass

    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse({'error': 'Invalid credentials'}, status=400)

    login(request, user)
    return JsonResponse({'user': _user_response(user)})


@require_GET
@ensure_csrf_cookie
def current_user(request):
    if not request.user.is_authenticated:
        return JsonResponse({'authenticated': False})

    return JsonResponse({
        'authenticated': True,
        'user': _user_response(request.user),
    })
