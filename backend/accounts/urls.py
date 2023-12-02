from django.urls import path
from . import views

urlpatterns = [
    path('generate-interpretation/', views.generate_graph_interpretation, name='generate_interpretation'),
    # Other URL patterns...
]