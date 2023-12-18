from django.urls import path
<<<<<<< HEAD
from .views import add_graph_backend,generate_interpretation, get_user_graphs_backend, delete_graph_backend,count_users,count_total_graphs,display_all_users
from .views import count_user_graphs, count_user_files, get_guest_visits, update_visitor, update_user_info
from .views import my_view ,send_message, get_all_messages,get_user_messages

urlpatterns = [
    path('api/add_graph/', add_graph_backend, name='add_graph_backend'),
    path('api/get_user_graphs/<int:user_id>/', get_user_graphs_backend, name='get_user_graphs_backend'),
    path('api/delete_graph/<int:graph_id>/', delete_graph_backend, name='delete_graph_backend'),
    path('api/count_users/', count_users, name='count_users'),
    path('api/count_total_graphs/', count_total_graphs, name='count_total_graphs'),
    path('api/users/', display_all_users, name='all_users_api'),
    path('api/count_user_graphs/<int:user_id>/', count_user_graphs, name='count_user_graphs'),
    path('api/count_user_files/<int:user_id>/', count_user_files, name='count_user_files'),
    path('generate_interpretation/', generate_interpretation, name='generate_interpretation'),
    path('send_message/', send_message, name='send_message'),    
    path('get-all-messages/', get_all_messages, name='get_all_messages'),
    path('get-user-messages/<str:user_email>/', get_user_messages, name='get_user_messages'),
    path('api/count_guest_visits/', get_guest_visits, name='get_guest_visits'),
    path('api/update_guest_visits/', update_visitor, name='update_visitor'),
    path('api/update_user/<int:user_id>/', update_user_info, name='update_user_info'),

=======
from .views import my_view,generate_interpretation

urlpatterns = [
    path('', my_view),
    path('generate_interpretation/', generate_interpretation, name='generate_interpretation'),
>>>>>>> ad0ec3493942f5aa92a7bcfc593c0c4b1a2342c9

]