from django.contrib import admin
from .models import Todomodel
import csv
from django.http import HttpResponse

# Register your models here.
admin.site.site_header = "To Do List admin"
admin.site.site_title = "To Do List admin portal"


class ExportCsvMixin:
    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(
            meta)
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field)
                                   for field in field_names])

        return response

    export_as_csv.short_description = "Export Selected"


@admin.register(Todomodel)
class todomodelAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ['Title', 'Description', 'Created_at',
                    'Modified_at', 'Complete_by', 'Status', 'Is_deleted']
    list_filter = ('Title', 'Is_deleted')
    search_fields = ('Title', 'Description')
    actions = ["export_as_csv"]
