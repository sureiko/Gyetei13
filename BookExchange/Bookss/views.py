from django.shortcuts import render

# Create your views here.

# core/views.py
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import Book, Reservation, Genre
from .serializers import BookSerializer, ReservationSerializer, GenreSerializer

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by('-created_at')
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    # Поиск по названию и автору
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'author']

    # При создании книги владельцем становится текущий юзер
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # Эндпоинт для "Мои книги" (фильтрация)
    # Вызов: /api/books/?my_books=true
    def get_queryset(self):
        queryset = super().get_queryset()
        my_books = self.request.query_params.get('my_books')
        if my_books == 'true' and self.request.user.is_authenticated:
            return queryset.filter(owner=self.request.user)
        return queryset

    # Custom Action: Смена владельца
    # POST /api/books/{id}/transfer_ownership/
    # Body: {"new_owner_username": "ivan"}
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def transfer_ownership(self, request, pk=None):
        book = self.get_object()
        
        # Проверка прав (только владелец может передать)
        if book.owner != request.user:
            return Response({"error": "Вы не владелец этой книги"}, status=status.HTTP_403_FORBIDDEN)
            
        new_owner_username = request.data.get('new_owner_username')
        new_owner = get_object_or_404(User, username=new_owner_username)
        
        book.owner = new_owner
        book.save()
        
        return Response({"status": f"Книга передана пользователю {new_owner.username}"})

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(tenant=self.request.user)
    
    # Пользователь видит только свои бронирования (или брони на свои книги)
    def get_queryset(self):
        user = self.request.user
        return Reservation.objects.filter(tenant=user) | Reservation.objects.filter(book__owner=user)