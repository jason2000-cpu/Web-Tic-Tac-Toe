from django.db import models
from django.db import models
from django.contrib.auth.models import User

class Game(models.Model):
    player_x = models.ForeignKey(User, related_name='player_x', on_delete=models.CASCADE)
    player_o = models.ForeignKey(User, related_name='player_o', on_delete=models.CASCADE)
    board = models.CharField(max_length=9, default=' ' * 9)  # 9 spaces for an empty board
    current_turn = models.CharField(max_length=1, choices=[('X', 'X'), ('O', 'O')], default='X')
    winner = models.CharField(max_length=1, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def make_move(self, position):
        if self.board[position] != ' ' or not self.is_active:
            raise ValueError("Invalid move")

        # Place the current player's mark on the board
        board_list = list(self.board)
        board_list[position] = self.current_turn
        self.board = ''.join(board_list)

        # Check for a winner
        self.check_winner()

        # Switch turns if there's no winner
        if not self.winner:
            self.current_turn = 'O' if self.current_turn == 'X' else 'X'

        self.save()

    def check_winner(self):
        winning_combinations = [
            (0, 1, 2), (3, 4, 5), (6, 7, 8),  # Rows
            (0, 3, 6), (1, 4, 7), (2, 5, 8),  # Columns
            (0, 4, 8), (2, 4, 6)              # Diagonals
        ]

        for combo in winning_combinations:
            if self.board[combo[0]] == self.board[combo[1]] == self.board[combo[2]] != ' ':
                self.winner = self.board[combo[0]]
                self.is_active = False
                return self.winner

        if ' ' not in self.board:
            self.is_active = False  # Draw
        return None
