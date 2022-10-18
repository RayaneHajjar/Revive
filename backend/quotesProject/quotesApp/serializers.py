from rest_framework import serializers
from quotesApp.models import Quote

class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = ('id', 'author', 'content', 'date')