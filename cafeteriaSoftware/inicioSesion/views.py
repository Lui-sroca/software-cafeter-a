from django.shortcuts import render, redirect
from django.views.generic import ListView
from django.contrib.auth import login
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from .forms_registro import *
# from ..adminInventario2.models import CustomUser
from django.contrib.auth.views import LoginView


class CustomLoginView(LoginView):
    def form_valid(self, form):
        user = form.get_user()
        if user:
            login(self.request, user)  # Ahora la función login está definida y se puede utilizar
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        return reverse_lazy('inventario')


# def signup(request):
#     if request.method == 'POST':
#         form = SignUpForm(request.POST)
#         if form.is_valid():
#             user = form.save(commit=False)
#             user_type = form.cleaned_data.get('user_type')
#             if user_type == 'employee':
#                 user.is_employee = True
#             elif user_type == 'admin':
#                 user.is_admin = True
#             user.save()
#             login(request, user)
#             return redirect('home')
#     else:
#         form = SignUpForm()
#     return render(request, 'registrarse.html', {'form': form})

# class UserListView(ListView):
#     model = CustomUser
#     template_name = 'user_list.html'
#     context_object_name = 'users'

#     def get_queryset(self):
#         return CustomUser.objects.all()
