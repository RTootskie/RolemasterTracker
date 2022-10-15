from tkinter import *


class BottomGUI():
    def __init__(self, framePoint):
        self.total_rounds = 1
        self.current_round = 1

        self.reshuffle_button = Button(framePoint, text="Reshuffle based on Quickness", width=15, wraplength=100)
        self.reshuffle_button.grid(column=1, row=1, padx=(0, 10))

        self.clear_button = Button(framePoint, text="Clear board", width=10, wraplength=50)
        self.clear_button.grid(column=2, row=1, padx=10)

        self.save_board = Button(framePoint, text="Save board", width=10, wraplength=50)
        self.save_board.grid(column=3, row=1, padx=10)

        self.load_board = Button(framePoint, text="Load board", width=10, wraplength=50)
        self.load_board.grid(column=4, row=1, padx=10)

        self.round_counter = Label(framePoint, text=f"Round: {self.current_round}/{self.total_rounds}")
        self.round_counter.grid(column=5, row=1)

        self.prev_round = Button(framePoint, text="Previous Round", width=10, wraplength=50,
                                 command=self.back_previous_round)
        self.prev_round.grid(column=6, row=1, padx=10)

        self.next_round = Button(framePoint, text="Next Round", width=10, wraplength=50, command=self.start_next_round)
        self.next_round.grid(column=7, row=1, padx=(10, 0))

    def start_next_round(self):
        """Command to start the next round"""
        if self.total_rounds == self.current_round:
            self.total_rounds += 1
            self.current_round += 1
        elif self.current_round < self.total_rounds:
            self.current_round += 1
        else:
            # Something unexpected error
            print("Something wrong")

        self.round_counter.config(text=f"Round: {self.current_round}/{self.total_rounds}")

    def back_previous_round(self):
        if self.current_round - 1 > 0:
            self.current_round -= 1
            self.round_counter.config(text=f"Round: {self.current_round}/{self.total_rounds}")
        else:
            # Do error handling here
            print("Can't go lower")
