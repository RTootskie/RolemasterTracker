from tkinter import *
import math
import json
from ProfileFrame import ProfileFrame
from GUIFrame import BottomGUI

# Start a Tkinter window
window = Tk()

# Set a good starting size
window.geometry("775x500")

# Title it
window.title("Rolemaster Tracker")

# Add padding
window.config(padx=10, pady=10)

# Hold profiles in a parent frame
profiles_frame = Frame(window, height=300)
profiles_frame.grid(column=0, row=0)

# Initialize one default frame for the profiles frame
first_frame = Frame(profiles_frame, highlightbackground="black", highlightthickness=1)
first_frame.grid(row=1)  # Position it

second_frame = Frame(profiles_frame, highlightbackground="black", highlightthickness=1)
second_frame.grid(row=2)  # Position it

# Initialize the bottom GUI that is not one of the profile ones.
bottom_frame = Frame(window, highlightbackground="black", highlightthickness=3)
bottom_frame.grid(column=0, row=1, pady=20)  # Will always be at the end

# Call a profile to a certain frame
BlankProfile = ProfileFrame(first_frame)
SecBlankProfile = ProfileFrame(second_frame)
bottom_ui = BottomGUI(bottom_frame)

if __name__ == "__main__":
    window.mainloop()
