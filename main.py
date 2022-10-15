from tkinter import *
import math
import json
from ProfileFrame import ProfileFrame

# Start a Tkinter window
window = Tk()

# Set a good starting size
window.geometry("800x500")

# Title it
window.title("Rolemaster Tracker")

# Add padding
window.config(padx=10, pady=10)

# Initialize a frame - 1 frame -  1 profiel
frame = Frame(window)
frame.grid(row=1) # Position it

# Call a profile to a certain frame
BlankProfile = ProfileFrame(frame)

if __name__ == "__main__":
    window.mainloop()
