# core/serializers.py
from rest_framework import serializers
from .models import Book, Genre, Reservation
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True) # Владелец подставляется автоматически
    is_reserved = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'condition', 'genre', 'owner', 'is_reserved', 'description']

    def get_is_reserved(self, obj):
        # Проверяем, есть ли активная бронь (не возвращена)
        return obj.reservations.filter(returned=False).exists()

class ReservationSerializer(serializers.ModelSerializer):
    tenant = UserSerializer(read_only=True)

    class Meta:
        model = Reservation
        fields = ['id', 'book', 'tenant', 'start_date', 'end_date', 'returned']

    def validate(self, data):
        user = self.context['request'].user
        book = data['book']

        # 1. Логика: Пользователь не может забронировать свою книгу
        if book.owner == user:
            raise serializers.ValidationError("Нельзя забронировать собственную книгу.")

        # 2. Логика: Нельзя забронировать уже занятую книгу
        if book.reservations.filter(returned=False).exists():
            raise serializers.ValidationError("Эта книга уже забронирована кем-то другим.")
            
        return data