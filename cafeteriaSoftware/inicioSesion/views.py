from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login  # Agrega esta línea para importar la función login

class CustomLoginView(LoginView):
    def form_valid(self, form):
        user = form.get_user()
        if user:
            login(self.request, user)  # Ahora la función login está definida y se puede utilizar
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        return reverse_lazy('inventario')
 # Reemplaza 'inventario' con el nombre de la URL de tu interfaz de inventario
