from tkinter import *
import math
import json
import ProfileFrame

window = Tk()
window.geometry("800x500")
window.title("Rolemaster Tracker")
window.config(padx=10, pady=10)

# Initialize a frame
frame = Frame(window)
frame.grid(row=1)

BlankProfile = ProfileFrame.ProfileFrame(frame)

if __name__ == "__main__":
    window.mainloop()
