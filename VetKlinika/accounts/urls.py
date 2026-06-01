from django.urls import path

from .views import current_user, login_user, register_user


urlpatterns = [
    path('register/', register_user, name='register-user'),
    path('login/', login_user, name='login-user'),
    path('me/', current_user, name='current-user'),
]
