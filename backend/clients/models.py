from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid


class Client(AbstractUser):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    name = models.CharField(max_length=150)
    email = models.EmailField(max_length=127)
    phone = models.CharField(max_length=15)
