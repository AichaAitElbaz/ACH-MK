from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Graph
from .models import Guest
from .models import UserAccount
from .models import Message
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.db.models.functions import TruncMonth
from django.db.models import Count
import openai
from .models import Guest
import os
import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.models import AnonymousUser
import json


User = get_user_model()



def my_view(request):
    user_ip = request.META.get('REMOTE_ADDR')

    # Vérifiez si l'adresse IP existe déjà dans la base de données
    guest, created = Guest.objects.get_or_create(ip_address=user_ip)

    # Incrémentez le compteur de visites
    guest.visit_counter += 1
    guest.save()

    return render(request, 'template.html', {'user_ip': user_ip})



 # Nécessaire si vous n'avez pas de gestion appropriée des CORS dans votre application
@csrf_exempt
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


from django.core.serializers.json import DjangoJSONEncoder

def get_user_graphs_backend(request, user_id):
    if request.method == 'GET':
        user_graphs = list(Graph.objects.filter(user_id=user_id).values())
        # Use DjangoJSONEncoder to serialize the datetime field in the QuerySet
        return JsonResponse({'user_graphs': user_graphs}, encoder=DjangoJSONEncoder)

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

@csrf_exempt
def count_users(request):
    if request.method == 'GET':
        user_count = User.objects.count()
        return JsonResponse({'user_count': user_count})

    return JsonResponse({'error': 'Invalid request method'})


@csrf_exempt
def count_total_graphs(request):
    if request.method == 'GET':
        total_graphs_count = Graph.objects.count()
        return JsonResponse({'total_graphs_count': total_graphs_count})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
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

@csrf_exempt
def count_user_graphs(request, user_id):
    if request.method == 'GET':
        user_graphs_count = Graph.objects.filter(user=user_id).count()
        return JsonResponse({'user_graphs_count': user_graphs_count})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def count_user_files(request, user_id):
    if request.method == 'GET':
        user_files_count = Graph.objects.filter(user=user_id).count()
        return JsonResponse({'user_files_count': user_files_count})

    return JsonResponse({'error': 'Invalid request method'})


@csrf_exempt
def generate_interpretation(request):

    if request.method == 'POST':
        #openai.api_key = os.getenv('API_KEY')  # Retrieve API key from environment variable
        print(openai.api_key)
        openai.api_key = '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'
        try:
            # Get the JSON data from the request body
            data = json.loads(request.body)
            chart_content = data.get('chart_content', {})  # Fetch chart content sent from frontend

            if chart_content:
                chart_type = chart_content.get('chartType', '')
                # Assuming 'chart_content' is the data you want to generate an interpretation for
                interpretation = generate_chart_interpretation(chart_content)

                return JsonResponse({'interpretation': interpretation})  # Return interpretation as JSON response

            else:
                return JsonResponse({'error': 'Empty chart_content'})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'})

    return JsonResponse({'error': 'Invalid request method'})

def generate_chart_interpretation(chart_data):
    # Prepare the data for the GPT API request
    prompt = f"Interpret the implications and trends present in a {chart_data.get('chartType')} chart with data: {chart_data.get('chartData')}"

    # Send the prompt to the GPT API
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=200
    )

    # Extract the generated interpretation from the API response
    interpretation = response.choices[0].text.strip()
    return interpretation

@csrf_exempt
def send_message(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            sender_email = data.get('sender_email', '')
            firstname = data.get('firstname', '')
            lastname = data.get('lastname', '')
            phone_number = data.get('phone_number', '')
            message_text = data.get('message', '')

            # Créer une instance de Message
            message_instance = Message.objects.create(
                sender_email=sender_email,
                firstname=firstname,
                lastname=lastname,
                phone_number=phone_number,
                message=message_text
            )

            # Envoie d'un e-mail
            subject = 'Nouveau message de {} {}'.format(firstname, lastname)
            message = render_to_string('email_template.txt', {'message': message_text})
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [settings.EMAIL_HOST_USER]

            send_mail(subject, message, from_email, recipient_list, fail_silently=False)

            return JsonResponse({'message': 'Message sent successfully'})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'})

    return JsonResponse({'error': 'Invalid request method'})



@csrf_exempt
def user_monthly_graphs(request, user_id):
    if request.method == 'GET':
        try:
            # Utilisez TruncMonth pour grouper les graphiques par mois
            monthly_graphs = Graph.objects.filter(user_id=user_id).annotate(
                month=TruncMonth('date_uploaded')
            ).values('month').annotate(graphCount=Count('id'))

            # Construire la liste des données pour la réponse JSON
            monthly_graphs_list = [
                {
                    'month': graph['month'].strftime('%b %Y'),  # Format de la date, par exemple, "Jan 2023"
                    'graphCount': graph['graphCount']
                }
                for graph in monthly_graphs
            ]

            return JsonResponse({'monthlyGraphs': monthly_graphs_list})

        except Exception as e:
            return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request method'})
@csrf_exempt
def get_all_messages(request):
    if request.method == 'GET':
        try:
            # Récupérer toutes les instances de Message
            messages = Message.objects.all()

            # Construire la liste des messages
            messages_list = [
                {
                    'sender_email': message.sender_email,
                    'firstname': message.firstname,
                    'lastname': message.lastname,
                    'phone_number': message.phone_number,
                    'message': message.message,
                    'date_sent': message.date_sent  # Ajoutez le champ timestamp si vous avez un champ pour la date/heure
                }
                for message in messages
            ]

            return JsonResponse({'messages': messages_list})

        except Exception as e:
            return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def get_user_messages(request, user_email):
    if request.method == 'GET':
        try:
            # Récupérer toutes les instances de Message pour un utilisateur spécifique
            user_messages = Message.objects.filter(sender_email=user_email)

            # Construire la liste des messages de l'utilisateur
            user_messages_list = [
                {
                    'sender_email': message.sender_email,
                    'firstname': message.firstname,
                    'lastname': message.lastname,
                    'phone_number': message.phone_number,
                    'message': message.message,
                    'date_sent': message.date_sent # Ajoutez le champ timestamp si vous avez un champ pour la date/heure
                }
                for message in user_messages
            ]

            return JsonResponse({'user_messages': user_messages_list})

        except Exception as e:
            return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def get_guest_visits(request):
    if request.method == 'GET':
        user_ip = request.META.get('REMOTE_ADDR')

        # Vérifiez si l'adresse IP existe déjà dans la base de données
        guest, created = Guest.objects.get_or_create(ip_address=user_ip)
        

        # Incrémentez le compteur de visites
        visits = guest.visit_counter + 1
        guest.save()

        # Return the guest visit information as JSON
        return JsonResponse({'user_ip': user_ip, 'total_visits': visits})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def update_visitor(request):
    user_ip = request.META.get('REMOTE_ADDR')

    # Vérifiez si l'adresse IP existe déjà dans la base de données
    guest, created = Guest.objects.get_or_create(ip_address=user_ip)

    # Incrémentez le compteur de visites
    guest.visit_counter += 1
    guest.save()

    response_data = {'success': True, 'ip_address': guest.ip_address, 'visit_counter': guest.visit_counter}
    return JsonResponse(response_data)

@csrf_exempt
def update_user_info(request, user_id):
        data = json.loads(request.body)

        first_name = data.get('firstName')
        last_name = data.get('lastName')
        email = data.get('email')
        user = User.objects.get(id=user_id)
              
        user.firstname = first_name
        user.lastname = last_name
        user.email = email

        user.save()

        return JsonResponse({'message': 'User information updated successfully'})


