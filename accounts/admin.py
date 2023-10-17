from django.contrib import admin

from .models import UserAccount
from .models import Graph
from .models import Guest

class UserAdmin(admin.ModelAdmin):
    list_display = ('firstname', 'email','date_joined')  # Adjust this list according to your model fields

class GuestAdmin(admin.ModelAdmin):
    list_display = ('ip_address','visit_counter')

class GraphAdmin(admin.ModelAdmin):
    list_display = ('source_file','graph','interpretation')

admin.site.register(UserAccount,UserAdmin)
admin.site.register(Graph,GraphAdmin)
admin.site.register(Guest,GuestAdmin)
