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

        # Пример расширения в models.py
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    condition = models.CharField(max_length=50)
    genre = models.ForeignKey(Genre, on_delete=models.SET_NULL, null=True)  
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_books')
    created_at = models.DateTimeField(auto_now_add=True)
    cover_image = models.ImageField(upload_to='book_covers/', blank=True, null=True)
    isbn = models.CharField(max_length=13, blank=True)
    description = models.TextField(blank=True)
    language = models.CharField(max_length=50, default='Russian')
    publication_year = models.PositiveIntegerField(null=True)
    publisher = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return f"{self.title} by {self.author}"


class Reservation(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reservations')
    tenant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='my_reservations')
    
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()
    
    returned = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.book.title} reserved by {self.tenant.username}"