import datetime

from django.db.models import Sum
from django.db.models.functions import Coalesce
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.dashboard.consts import AccountTypeChoices
from apps.dashboard.serializers import AccountModelBaseSerializer, ReminderModelBaseSerializer
from apps.dashboard.services import AccountService, ReminderService
from rest_framework.viewsets import ModelViewSet

from utils.viewsets import UserRelatedDataRestricted


class AccountModelViewSet(ModelViewSet, UserRelatedDataRestricted):
    queryset = AccountService.all()
    serializer_class = AccountModelBaseSerializer
    permission_classes = [IsAuthenticated]


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_saving_amount_in_specific_month(request, year, month):
    if month <= 0 or month >= 12:
        return Response(data={'error': 'invalid month'}, status=status.HTTP_400_BAD_REQUEST)

    from_date = datetime.datetime(year, month, 1, 0, 0, 0)
    to_date = datetime.datetime(year, month + 1, 1, 0, 0, 0)
    filtered_qs = AccountService.filter(user=request.user, created_at__gte=from_date, created_at__lte=to_date)
    income = filtered_qs.filter(typ=AccountTypeChoices.INPUT).aggregate(sum=Coalesce(Sum('amount'), 0.0))['sum']
    expense = filtered_qs.filter(typ=AccountTypeChoices.OUTPUT).aggregate(sum=Coalesce(Sum('amount'), 0.0))['sum']

    return Response(data={'saving_amount': income - expense}, status=status.HTTP_200_OK)


class ReminderModelViewSet(ModelViewSet, UserRelatedDataRestricted):
    queryset = ReminderService.all()
    serializer_class = ReminderModelBaseSerializer
    permission_classes = [IsAuthenticated]
