from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import JsonResponse

User = get_user_model()


from .models import Guest

def my_view(request):
    user_ip = request.META.get('REMOTE_ADDR')

    # Vérifiez si l'adresse IP existe déjà dans la base de données
    guest, created = Guest.objects.get_or_create(ip_address=user_ip)

    # Incrémentez le compteur de visites
    guest.visit_counter += 1
    guest.save()

    return render(request, 'template.html', {'user_ip': user_ip})


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt  # Nécessaire si vous n'avez pas de gestion appropriée des CORS dans votre application
def add_graph_backend(request):
    if request.method == 'POST':
        source_file = request.FILES['source']
        graph_file = request.FILES['graph']
        interpretation_file = request.FILES['interpretation']
        
        user_id = request.POST.get('userid')
        user = UserAccount.objects.get(id=user_id)

        graph = Graph.objects.create(
            source_file=source_file,
            graph=graph_file,
            interpretation=interpretation_file,
            user=user
        )

        # Retournez une réponse JSON ou tout autre format approprié pour votre application
        return JsonResponse({'message': 'Graph added successfully'})

    # Si la méthode n'est pas POST, vous pouvez également retourner une réponse appropriée
    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def get_user_graphs_backend(request, user_id):
    if request.method == 'GET':
        user_graphs = Graph.objects.filter(user_id=user_id).values()
        # Retournez une réponse JSON ou tout autre format approprié pour votre application
        return JsonResponse({'user_graphs': list(user_graphs)})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def delete_graph_backend(request, graph_id):
    if request.method == 'DELETE':
        try:
            graph = Graph.objects.get(id=graph_id)
            user_id = graph.user.id
            graph.delete()
            return JsonResponse({'message': 'Graph deleted successfully'})
        except Graph.DoesNotExist:
            return JsonResponse({'error': 'Graph not found'})

    return JsonResponse({'error': 'Invalid request method'})


def count_users(request):
    if request.method == 'GET':
        user_count = User.objects.count()
        return JsonResponse({'user_count': user_count})

    return JsonResponse({'error': 'Invalid request method'})

from django.http import JsonResponse
from .models import Graph

def count_total_graphs(request):
    if request.method == 'GET':
        total_graphs_count = Graph.objects.count()
        return JsonResponse({'total_graphs_count': total_graphs_count})

    return JsonResponse({'error': 'Invalid request method'})


def display_all_users(request):
    users = User.objects.all()
    user_data = []

    for user in users:
        user_data.append({
            'id': user.id,
            'email': user.email,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'date_joined': user.date_joined,
            # Ajoutez d'autres champs si nécessaire
        })

    return JsonResponse({'users': user_data})