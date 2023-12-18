<<<<<<< HEAD
=======

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
>>>>>>> 2f51fd1908884c87e2c7dfbd3c37c1684a71390a
from django.shortcuts import render, redirect
from .models import Graph
from .models import UserAccount
from .models import Guest
import openai

def my_view(request):
    user_ip = request.META.get('REMOTE_ADDR')

    # Vérifiez si l'adresse IP existe déjà dans la base de données
    guest, created = Guest.objects.get_or_create(ip_address=user_ip)

    # Incrémentez le compteur de visites
    guest.visit_counter += 1
    guest.save()

    return render(request, 'template.html', {'user_ip': user_ip})




<<<<<<< HEAD
=======
def generate_graph_interpretation(request):
    if request.method == 'POST':
        openai.api_key = os.getenv('OPENAI_API_KEY')

        csv_content = request.POST.get('csv_content', '')
        user_message = f"The following CSV data represents temperatures over the years:\n{csv_content}"

        messages = [
            {"role": "system",
             "content": "You are a scatter graph interpreter. Provide a detailed and insightful interpretation."},
            {"role": "user", "content": user_message},
        ]

        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=300  # Adjust the token limit based on your needs
        )

        return JsonResponse({'interpretation': completion['choices'][0]['message']['content']})

    return JsonResponse({'error': 'Invalid request method'})
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




>>>>>>> 2f51fd1908884c87e2c7dfbd3c37c1684a71390a
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

<<<<<<< HEAD
=======


# @csrf_exempt
# def generate_interpretation(request):
#     if request.method == 'POST':
#         openai.api_key = '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'

#         try:
#             # Get the JSON data from the request body
#             data = json.loads(request.body)
#             chart_content = data.get('chart_content', {})  # Fetch chart content sent from frontend

#             if chart_content:
#                 chart_type = chart_content.get('chartType', '')
#                 print(chart_type)
#                 print(chart_content)

#                 return JsonResponse({'chart_content': chart_content})  # Return chart content as JSON response

#             else:
#                 return JsonResponse({'error': 'Empty chart_content'})

#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON data'})

#     return JsonResponse({'error': 'Invalid request method'})


@csrf_exempt
def generate_interpretation(request):
    if request.method == 'POST':
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
    print(interpretation)
    return interpretation
>>>>>>> 2f51fd1908884c87e2c7dfbd3c37c1684a71390a
