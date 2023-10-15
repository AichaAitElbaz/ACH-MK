from django.urls import path
from .views import my_view

urlpatterns = [
    path('', my_view),
    # ... Ajoutez d'autres URLs au besoin
]