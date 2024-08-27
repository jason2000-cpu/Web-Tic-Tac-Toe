from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Game
from .serializers import GameSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def create(self, request, *args, **kwargs):
        player_o = request.data.get('player_o')
        if not player_o:
            return Response({"error": "Player O is required"}, status=status.HTTP_400_BAD_REQUEST)
        game = Game.objects.create(player_x=request.user, player_o_id=player_o)
        serializer = self.get_serializer(game)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        game = self.get_object()
        position = request.data.get('position')

        if not game.is_active:
            return Response({"error": "Game is no longer active"}, status=status.HTTP_400_BAD_REQUEST)
        if game.board[position] != ' ':
            return Response({"error": "Position already occupied"}, status=status.HTTP_400_BAD_REQUEST)

        # Update the board
        board_list = list(game.board)
        board_list[position] = game.current_turn
        game.board = ''.join(board_list)
        winner = game.check_winner()

        if winner:
            game.winner = winner
            game.is_active = False
        else:
            game.current_turn = 'O' if game.current_turn == 'X' else 'X'

        game.save()
        return Response(self.get_serializer(game).data)
