from tkinter import *


class ProfileFrame():
    def __init__(self, framePoint):
        self.knocked_state = IntVar()
        self.sleep_state = IntVar()
        self.disarmed_state = IntVar()

        # First Row
        self.name_input = Entry(framePoint, width=25, bd=4)
        self.name_input.grid(column=1, row=1, columnspan=2)

        self.load_name = Button(framePoint, text="Open Profiles")
        self.load_name.grid(column=3, row=1, padx=10)

        self.att_quick_label = Label(framePoint, text="Attack Quickness:")
        self.att_quick_label.grid(column=4, row=1, columnspan=2)

        self.att_quick_choose = Spinbox(framePoint, from_=0, to=300, width=5)
        self.att_quick_choose.grid(column=6, row=1)

        self.bleed_rate_label = Label(framePoint, text="Bleeding Rate:")
        self.bleed_rate_label.grid(column=7, row=1)

        self.bleed_rate_choose = Spinbox(framePoint, from_=0, to=300, width=5)
        self.bleed_rate_choose.grid(column=8, row=1)

        self.bleed_dur_label = Label(framePoint, text="Bleeding Duration:")
        self.bleed_dur_label.grid(column=9, row=1)

        self.bleed_dur_choose = Spinbox(framePoint, from_=0, to=300, width=5)
        self.bleed_dur_choose.grid(column=10, row=1)

        self.save_button = Button(framePoint, text="Save", highlightthickness=0)
        self.save_button.grid(column=11, row=1, padx=10)

        # Second Row
        self.total_hits_label = Label(framePoint, text="Total Hits:")
        self.total_hits_label.grid(column=1, row=2)

        self.total_hits_choose = Spinbox(framePoint, from_=0, to=500, width=5)
        self.total_hits_choose.grid(column=2, row=2)

        self.current_hits_label = Label(framePoint, text="Current Hits:")
        self.current_hits_label.grid(column=3, row=2)

        self.current_hits_choose = Spinbox(framePoint, from_=0, to=500, width=5)
        self.current_hits_choose.grid(column=4, row=2)

        self.total_pp_label = Label(framePoint, text="Total PP:")
        self.total_pp_label.grid(column=5, row=2)

        self.total_pp_choose = Spinbox(framePoint, from_=0, to=6000, width=5)
        self.total_pp_choose.grid(column=6, row=2)

        self.current_pp_label = Label(framePoint, text="Current PP:")
        self.current_pp_label.grid(column=7, row=2)

        self.current_pp_choose = Spinbox(framePoint, from_=0, to=6000, width=5)
        self.current_pp_choose.grid(column=8, row=2)

        self.stun_label = Label(framePoint, text="Stun Duration:")
        self.stun_label.grid(column=9, row=2)

        self.stun_choose = Spinbox(framePoint, from_=0, to=100, width=5)
        self.stun_choose.grid(column=10, row=2)

        self.trash_button = Button(framePoint, text="Remove", highlightthickness=0)
        self.trash_button.grid(column=11, row=2, padx=10)

        # Third Row

        self.knocked_label = Label(framePoint, text="Knocked down")
        self.knocked_label.grid(column=1, row=3)

        self.knocked_box = Checkbutton(framePoint, variable=self.knocked_state,
                                       command=lambda: self.frame_states(framePoint))
        self.knocked_box.grid(column=2, row=3)

        self.asleep_label = Label(framePoint, text="Asleep")
        self.asleep_label.grid(column=3, row=3)

        self.asleep_box = Checkbutton(framePoint, variable=self.sleep_state,
                                      command=lambda: self.frame_states(framePoint))
        self.asleep_box.grid(column=4, row=3)

        self.disarmed_label = Label(framePoint, text="Disarmed")
        self.disarmed_label.grid(column=5, row=3)

        self.disarmed_box = Checkbutton(framePoint, variable=self.disarmed_state,
                                        command=lambda: self.frame_states(framePoint))
        self.disarmed_box.grid(column=6, row=3)

        self.parry_label = Label(framePoint, text="Forced to parry")
        self.parry_label.grid(column=7, row=3)

        self.parry_choose = Spinbox(framePoint, from_=0, to=100, width=5)
        self.parry_choose.grid(column=8, row=3)

        self.bon_pen_label = Label(framePoint, text="Bonus/Penalty")
        self.bon_pen_label.grid(column=9, row=3)

        self.bon_pen_choose = Spinbox(framePoint, from_=-200, to=200, width=5)
        self.bon_pen_choose.grid(column=10, row=3)

        self.clear_button = Button(framePoint, text="Clear", highlightthickness=0)
        self.clear_button.grid(column=11, row=3)

    def frame_states(self, framePoint):
        """ Set background color dependant on if a condition is enabled """
        if self.knocked_state.get() == 1:
            framePoint.config(bg="blue")
        elif self.sleep_state.get() == 1:
            framePoint.config(bg="yellow")
        elif self.disarmed_state.get() == 1:
            framePoint.config(bg="orange")
        else:
            framePoint.config(bg="white")
