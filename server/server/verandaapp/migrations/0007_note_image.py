# Generated by Django 2.1.2 on 2018-11-07 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('verandaapp', '0006_remove_note_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='image',
            field=models.ImageField(blank=True, default='', upload_to=''),
        ),
    ]
