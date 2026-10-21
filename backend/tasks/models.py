from django.db import models

# Create your models here.
class Task(models.Model):
    PRIORITIES = [("High", "High"), ("Medium", "Medium"), ("Low", "Low")]

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, default="")
    priority = models.CharField(max_length=10, choices=PRIORITIES, default="High")
    done = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text