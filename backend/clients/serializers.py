from rest_framework import serializers
from .models import Client


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        depth = 1
        fields = [
            "id",
            "name",
            "username",
            "email",
            "password",
            "phone",
            "date_joined",
            "contacts",
        ]
        read_only_fields = ["contacts"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data: dict) -> Client:
        return Client.objects.create_user(**validated_data)

    def update(self, instance: Client, validated_data: dict) -> Client:
        for key, value in validated_data.items():
            if key == "password":
                instance.set_password(value)
            else:
                setattr(instance, key, value)

        instance.save()

        return instance
