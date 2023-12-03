from django.shortcuts import render, redirect
from .models import Graph
from .models import UserAccount
from .models import Guest

def my_view(request):
    user_ip = request.META.get('REMOTE_ADDR')

    # Vérifiez si l'adresse IP existe déjà dans la base de données
    guest, created = Guest.objects.get_or_create(ip_address=user_ip)

    # Incrémentez le compteur de visites
    guest.visit_counter += 1
    guest.save()

    return render(request, 'template.html', {'user_ip': user_ip})




def add_graph(request):
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

        return get_user_graphs(request, user_id)  # Redirigez vers la vue get_user_graphs avec l'ID de l'utilisateur

    return render(request, 'addgraphtem.html')


def get_user_graphs(request, user_id):
    user_graphs = Graph.objects.filter(user_id=user_id)
    return render(request, 'user_graphs.html', {'user_graphs': user_graphs})


def delete_graph(request, graph_id):
    graph = Graph.objects.get(id=graph_id)
    user_id = graph.user.id  # Récupérer l'ID de l'utilisateur avant de supprimer le graphe

    graph.delete()
    return redirect('user_graphs', user_id=user_id) 
