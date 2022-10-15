from tkinter import *


class BottomGUI():
    def __init__(self, framePoint):
        self.reshuffle_button = Button(framePoint, text="Reshuffle based on Quickness", width=15, wraplength=100)
        self.reshuffle_button.grid(column=1, row=1, padx=(0,10))

        self.clear_button = Button(framePoint, text="Clear board", width=10, wraplength=50)
        self.clear_button.grid(column=2, row=1, padx=10)

        self.save_board = Button(framePoint, text="Save board", width=10, wraplength=50)
        self.save_board.grid(column=3, row=1, padx=10)

        self.load_board = Button(framePoint, text="Load board", width=10, wraplength=50)
        self.load_board.grid(column=4, row=1, padx=10)

        self.round_counter = Label(framePoint, text="Round: 1/1")
        self.round_counter.grid(column=5, row=1)

        self.prev_round = Button(framePoint, text="Previous Round", width=10, wraplength=50)
        self.prev_round.grid(column=6, row=1, padx=10)

        self.next_round = Button(framePoint, text="Next Round", width=10, wraplength=50)
        self.next_round.grid(column=7, row=1, padx=(10,0))
