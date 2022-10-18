from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from quotesApp.models import Quote
from quotesApp.serializers import QuoteSerializer

@csrf_exempt
def getAllQuotes(request):
    if request.method == 'GET':
        quotes = Quote.objects.all()
        quotes_serializer = QuoteSerializer(quotes, many=True)
        return JsonResponse(quotes_serializer.data, safe=False)
    else:
       return JsonResponse("Only GET Method is allowed", safe=False) 

@csrf_exempt
def getQuoteByDate(request, date):
    try:
        if request.method == 'GET':
            quote = Quote.objects.get(date=date)
            serializer = QuoteSerializer(quote)
            return JsonResponse(serializer.data)
        else:
            return JsonResponse("Only GET Method is allowed", safe=False)
    except:
        return JsonResponse("No Quote matched", safe=False)

@csrf_exempt
def getQuoteById(request, id):
    try:
        if request.method == 'GET':
            quote = Quote.objects.get(id=id)
            serializer = QuoteSerializer(quote)
            return JsonResponse(serializer.data)
        else:
            return JsonResponse("Only GET Method is allowed", safe=False)
    except:
        return JsonResponse("Failed to Get", safe=False)

@csrf_exempt
def postQuote(request):
    if request.method == 'POST':
        quote_data = JSONParser().parse(request)
        quotes_serializer = QuoteSerializer(data=quote_data)
        if quotes_serializer.is_valid():
            quotes_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    else:
        return JsonResponse("Only POST Method is allowed", safe=False)

@csrf_exempt
def deleteQuoteById(request, id):
    try:
        if request.method == 'DELETE':
            quote = Quote.objects.get(id=id)
            quote.delete()
            return JsonResponse("Deleted Successfully", safe=False)
        else:
            return JsonResponse("Only DELETE Method is allowed", safe=False)
    except:
        return JsonResponse("Failed to Delete", safe=False)

@csrf_exempt
def updateQuoteById(request):
    if request.method == 'PUT':
        quote_data = JSONParser().parse(request)
        quote = Quote.objects.get(id=quote_data['id'])
        quotes_serializer = QuoteSerializer(quote, data=quote_data)
        if quotes_serializer.is_valid():
            quotes_serializer.save()
            return JsonResponse("Update Successfully", safe=False)
        return JsonResponse("Failed to Update")
    else:
        return JsonResponse("Only PUT Method is allowed", safe=False)