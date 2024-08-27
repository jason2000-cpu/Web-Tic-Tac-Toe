from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from game.models import Game

class Command(BaseCommand):
    help = 'Play Tic Tac Toe in the terminal'

    def handle(self, *args, **kwargs):
        player_x, _ = User.objects.get_or_create(username='player_x')
        player_o, _ = User.objects.get_or_create(username='player_o')
        game = Game.objects.create(player_x=player_x, player_o=player_o)
        self.stdout.write(self.style.SUCCESS('Starting a new Tic Tac Toe game!'))

        while game.is_active:
            self.display_board(game)
            position = self.get_move_input(game)
            game.make_move(position)
            game.save()
            game.check_winner()

        self.display_board(game)
        if game.winner:
            self.stdout.write(self.style.SUCCESS(f'{game.winner} wins!'))
        else:
            self.stdout.write(self.style.SUCCESS('It\'s a draw!'))

    def display_board(self, game):
        board = game.board
        self.stdout.write('Current Board:')
        for i in range(0, 9, 3):
            self.stdout.write(f'{board[i]} | {board[i+1]} | {board[i+2]}')
            if i < 6:
                self.stdout.write('-' * 9)

    def get_move_input(self, game):
        valid_move = False
        position = None

        while not valid_move:
            try:
                position = int(input(f'Player {game.current_turn}, enter your move (0-8): '))
                if game.board[position] == ' ':
                    valid_move = True
                else:
                    self.stdout.write(self.style.WARNING('Position already taken, try again.'))
            except (ValueError, IndexError):
                self.stdout.write(self.style.WARNING('Invalid input, please enter a number between 0 and 8.'))

        return position

