from django.urls import path
from quotesApp import views

urlpatterns=[
    path('api/quotes/all', views.getAllQuotes),
    path('api/quotes/id/<str:id>', views.getQuoteById),
    path('api/quotes/date/<str:date>', views.getQuoteByDate),
    path('api/quotes/create', views.postQuote),
    path('api/quotes/delete/<str:id>', views.deleteQuoteById),
    path('api/quotes/update', views.updateQuoteById)
]