from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password = None, **kwargs):
        if not email:
            raise ValueError("Users must have email address")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)

        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(
            email,
            password=password,
            **kwargs
        )
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


  

class Guest(models.Model):
    ip_address = models.CharField(max_length=15)  # Utilisez CharField pour stocker des adresses IP
    visit_counter = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.ip_address
