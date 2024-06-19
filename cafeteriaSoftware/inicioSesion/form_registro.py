from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class formularioRegistroUsuario(UserCreationForm):
    username = forms.CharField(label="Nombre de usuario", max_length=30, required=True)
    first_name = forms.CharField(label="Nombres", max_length=30, required=True)
    last_name = forms.CharField(label="Apellidos", max_length=30, required=True)
    email = forms.EmailField(label="Correo", required=True)
    password1 = forms.CharField(label="Código", widget=forms.PasswordInput, required=True)
    password2 = forms.CharField(label="Confirmar Código", widget=forms.PasswordInput, required=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password1', 'password2']
        texto_info = {k:"" for k in fields}
