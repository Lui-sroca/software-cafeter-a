# from django import forms
# from django.contrib.auth.forms import UserCreationForm
# from .models import CustomUser

# class SignUpForm(UserCreationForm):
#     USER_TYPE_CHOICES = (
#         ('employee', 'Employee'),
#         ('admin', 'Admin'),
#     )
#     user_type = forms.ChoiceField(choices=USER_TYPE_CHOICES, required=True)

#     class Meta(UserCreationForm.Meta):
#         model = CustomUser
#         fields = ('username', 'email', 'password1', 'password2', 'user_type')
