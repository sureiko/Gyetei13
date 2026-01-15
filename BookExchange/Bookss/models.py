from django.db import models
from django.contrib.auth.models import User


class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    CONDITION_CHOICES = [
        ('NEW', 'Новая'),
        ('GOOD', 'Хорошее'),
        ('BAD', 'Потрепанная'),
    ]

    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    condition = models.CharField(max_length=10, choices=CONDITION_CHOICES, default='GOOD')
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='my_books')
    genre = models.ForeignKey(Genre, on_delete=models.SET_NULL, null=True, blank=True)
    
    is_active = models.BooleanField(default=True)  # Доступна ли для обмена
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.owner.username})"


class Reservation(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reservations')
    tenant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='my_reservations')
    
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()
    
    returned = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.book.title} reserved by {self.tenant.username}"