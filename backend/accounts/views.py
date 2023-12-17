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


import openai
from .models import Guest
import os
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


def count_users(request):
    if request.method == 'GET':
        user_count = User.objects.count()
        return JsonResponse({'user_count': user_count})

    return JsonResponse({'error': 'Invalid request method'})



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

@login_required
def count_user_graphs(request):
    if request.method == 'GET':
        user_graphs_count = Graph.objects.filter(user=request.user).count()
        return JsonResponse({'user_graphs_count': user_graphs_count})

    return JsonResponse({'error': 'Invalid request method'})

@login_required
def count_user_files(request):
    if request.method == 'GET':
        user_files_count = Graph.objects.filter(user=request.user).count()
        return JsonResponse({'user_files_count': user_files_count})

    return JsonResponse({'error': 'Invalid request method'})


@csrf_exempt
def generate_interpretation(request):
    print("ggggggggggggggggg")
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
