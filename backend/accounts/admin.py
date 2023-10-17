from django.contrib import admin

from .models import UserAccount

class UserAdmin(admin.ModelAdmin):
    list_display = ('firstname', 'email','date_joined')  # Adjust this list according to your model fields


admin.site.register(UserAccount,UserAdmin)
