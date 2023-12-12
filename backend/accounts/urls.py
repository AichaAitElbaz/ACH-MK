from django.urls import path
from .views import my_view,generate_interpretation

urlpatterns = [
    path('', my_view),
    path('generate_interpretation/', generate_interpretation, name='generate_interpretation'),

]