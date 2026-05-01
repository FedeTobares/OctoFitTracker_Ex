from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Borrar datos existentes
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Crear equipos
        marvel = Team.objects.create(name='marvel', description='Marvel Team')
        dc = Team.objects.create(name='dc', description='DC Team')

        # Crear usuarios
        ironman = User.objects.create(email='ironman@marvel.com', name='Iron Man', team=marvel.name)
        spiderman = User.objects.create(email='spiderman@marvel.com', name='Spider-Man', team=marvel.name)
        batman = User.objects.create(email='batman@dc.com', name='Batman', team=dc.name)
        superman = User.objects.create(email='superman@dc.com', name='Superman', team=dc.name)

        # Crear actividades
        Activity.objects.create(user=ironman, type='run', duration=30, date=date(2024, 1, 1))
        Activity.objects.create(user=spiderman, type='swim', duration=45, date=date(2024, 1, 2))
        Activity.objects.create(user=batman, type='cycle', duration=60, date=date(2024, 1, 3))
        Activity.objects.create(user=superman, type='run', duration=50, date=date(2024, 1, 4))

        # Crear workouts
        Workout.objects.create(name='Pushups', description='Do pushups', difficulty='easy')
        Workout.objects.create(name='Pullups', description='Do pullups', difficulty='medium')
        Workout.objects.create(name='Squats', description='Do squats', difficulty='hard')

        # Crear leaderboard
        Leaderboard.objects.create(user=ironman, points=120)
        Leaderboard.objects.create(user=spiderman, points=110)
        Leaderboard.objects.create(user=batman, points=130)
        Leaderboard.objects.create(user=superman, points=140)

        self.stdout.write(self.style.SUCCESS('octofit_db poblada con datos de prueba'))
