from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password = None, **kwargs):
        if not email:
            raise ValueError("Users must have email address")
        
        email = self.normalize_email(email)
        user = self.model(email=email, role='user', **kwargs)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password=None, **kwargs):
        user = self.model(email=email, role='admin', **kwargs)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using= self._db)
        return user
        

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    date_joined   = models.DateTimeField(default=timezone.now)    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    role = models.CharField(max_length=10, default='user')
    

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'lastname']

    def get_full_name(self):
        return self.firstname

    def __str__(self):
        return self.email

class Graph(models.Model):
    source_file = models.FileField()
    graph = models.FileField()
    interpretation = models.FileField()
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    date_uploaded = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f'Graph for {self.user.email}'

class Message(models.Model):
    sender_email = models.EmailField(max_length=255)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    phone_number = models.IntegerField()  # Vous pouvez ajuster la longueur en fonction de vos besoins
    message = models.TextField()
    date_sent = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'Message from {self.sender_email}'
  

class Guest(models.Model):
    ip_address = models.GenericIPAddressField(unique=True) # Utilisez CharField pour stocker des adresses IP
    visit_counter = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.ip_address
