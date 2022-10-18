from unittest.util import _MAX_LENGTH
from django.db import models

class Quote(models.Model):
    author = models.CharField(max_length=100)
    content = models.TextField()
    date = models.DateField()