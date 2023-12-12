from django.shortcuts import render
import openai
from .models import Guest
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import os
import json

def my_view(request):
    user_ip = request.META.get('REMOTE_ADDR')

    # Vérifiez si l'adresse IP existe déjà dans la base de données
    guest, created = Guest.objects.get_or_create(ip_address=user_ip)

    # Incrémentez le compteur de visites
    guest.visit_counter += 1
    guest.save()

    return render(request, 'template.html', {'user_ip': user_ip})


@csrf_exempt
def generate_interpretation(request):
    if request.method == 'POST':
        openai.api_key = os.getenv('API_KEY')  # Retrieve API key from environment variable
        print('openai.api_key',openai.api_key)
        # openai.api_key = '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'
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
