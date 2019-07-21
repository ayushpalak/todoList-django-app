from django.db import models
from datetime import datetime
from django.utils import timezone

# Create your models here.


class Todomodel(models.Model):
    Created_at = models.DateTimeField(default=datetime.now, blank=True)
    Modified_at = models.DateTimeField(default=datetime.now, blank=True)
    Complete_by = models.DateTimeField()
    Title = models.CharField(blank=True, max_length=255, null=True)
    Description = models.TextField(blank=True, null=True)

    STATUS_CHOICES = (
        (0, ("Pending")),
        (1, ("In Progress")),
        (2, ("Completed"))
    )

    Status = models.IntegerField(choices=STATUS_CHOICES, default=0)
    Is_deleted = models.IntegerField(default=0)

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = "to_do_list"
