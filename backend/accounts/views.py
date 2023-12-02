from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
from django.http import JsonResponse
import openai
import os

from .models import Guest

def my_view(request):
    user_ip = request.META.get('REMOTE_ADDR')

    # Vérifiez si l'adresse IP existe déjà dans la base de données
    guest, created = Guest.objects.get_or_create(ip_address=user_ip)

    # Incrémentez le compteur de visites
    guest.visit_counter += 1
    guest.save()

    return render(request, 'template.html', {'user_ip': user_ip})




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