from django.db import models
import uuid


class Contact(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    name = models.CharField(max_length=150)
    email = models.EmailField(max_length=127)
    phone = models.CharField(max_length=15, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    client = models.ForeignKey("clients.Client", on_delete=models.CASCADE, related_name="contacts")
