from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('', include('accounts.urls')), 
    path('admin/', admin.site.urls),
]
