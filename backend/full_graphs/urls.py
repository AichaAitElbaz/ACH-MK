from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
# urls.py

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('account/', include('accounts.urls')), 
    path('admin/', admin.site.urls),
]
# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
