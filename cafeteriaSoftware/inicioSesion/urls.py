from django.urls import path
from .views import *
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path("registroEmpleado/", registroEmpleado, name='registroEmpleado' ),
    path("registroAdmin/", registroAdmin, name='registroAdmin' ),
    path("", LoginView.as_view(template_name='inicio_sesion/login.html'), name='login' ),
    path("logout/", LogoutView.as_view(template_name='inicio_sesion/logout.html'), name='login' )

]
