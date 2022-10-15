from tkinter import *
import math
import json

window = Tk()
window.title("Rolemaster Tracker")
window.config(padx=10, pady=10)


# First Row
name_input = Entry(width=25)
att_quick_label = Label(text="Attack Quickness:")
att_quick_choose = Spinbox(from_=0, to=300, width=5)
bleed_rate_label = Label(text="Bleeding Rate:")
bleed_rate_choose = Spinbox(from_=0, to=300, width=5)
bleed_dur_label = Label(text="Bleeding Duration:")
bleed_dur_choose = Spinbox(from_=0, to=300, width=5)
save_button = Button(text="Save", highlightthickness=0)

name_input.grid(column=1, row=1, columnspan=3)
name_input.focus()
att_quick_label.grid(column=4, row=1, columnspan=2)
att_quick_choose.grid(column=6, row=1)
bleed_rate_label.grid(column=7, row=1)
bleed_rate_choose.grid(column=8, row=1)
bleed_dur_label.grid(column=9, row=1)
bleed_dur_choose.grid(column=10, row=1)
save_button.grid(column=11, row=1, padx=10)

# Second Row

total_hits_label = Label(text="Total Hits:")
total_hits_choose = Spinbox(from_=0, to=500, width=5)
current_hits_label = Label(text="Current Hits:")
current_hits_choose = Spinbox(from_=0, to=500, width=5)
total_pp_label = Label(text="Total PP:")
total_pp_choose = Spinbox(from_=0, to=6000, width=5)
current_pp_label = Label(text="Current PP:")
current_pp_choose = Spinbox(from_=0, to=6000, width=5)
stun_label = Label(text="Stun Duration:")
stun_choose = Spinbox(from_=0, to=100, width=5)
trash_button = Button(text="Remove", highlightthickness=0)

total_hits_label.grid(column=1, row=2)
total_hits_choose.grid(column=2, row=2)
current_hits_label.grid(column=3, row=2)
current_hits_choose.grid(column=4, row=2)
total_pp_label.grid(column=5, row=2)
total_pp_choose.grid(column=6, row=2)
current_pp_label.grid(column=7, row=2)
current_pp_choose.grid(column=8, row=2)
stun_label.grid(column=9, row=2)
stun_choose.grid(column=10, row=2)
trash_button.grid(column=11, row=2, padx=10)

# Third Row

knocked_label = Label(text="Knocked down")
knocked_box = Checkbutton()
asleep_label = Label(text="Asleep")
asleep_box = Checkbutton()
disarmed_label = Label(text="Disarmed")
disarmed_box = Checkbutton()
parry_label = Label(text="Forced to parry")
parry_choose = Spinbox(from_=0, to=100, width=5)
bon_pen_label = Label(text="Bonus/Penalty")
bon_pen_choose = Spinbox(from_=-200, to=200, width=5)
clear_button = Button(text="Clear", highlightthickness=0)

knocked_label.grid(column=1, row=3)
knocked_box.grid(column=2, row=3)
asleep_label.grid(column=3, row=3)
asleep_box.grid(column=4, row=3)
disarmed_label.grid(column=5, row=3)
disarmed_box.grid(column=6, row=3)
parry_label.grid(column=7, row=3)
parry_choose.grid(column=8, row=3)
bon_pen_label.grid(column=9, row=3)
bon_pen_choose.grid(column=10, row=3)
clear_button.grid(column=11, row=3)

if __name__ == "__main__":
    print("Test")
    window.mainloop()