from django.urls import path
from .views import my_view , add_graph , get_user_graphs, delete_graph,generate_interpretation

urlpatterns = [
      path('adressip', my_view),
      path('addgraph', add_graph),
      path('user_graphs/<int:user_id>/',get_user_graphs, name='user_graphs'),
      path('delete_graph/<int:graph_id>/', delete_graph, name='delete_graph'),
      path('generate_interpretation/', generate_interpretation, name='generate_interpretation'),

]