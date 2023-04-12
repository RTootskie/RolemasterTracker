var accessData;
var objectTemplate =        "<button id='to_left'><</button>" +
                            "<button id='remove'>X</button>" +
                            "<button id='to_right'>></button><br><br>" +
                            "<li>Name: <input id='char_name'></input></li><br>" +
                            "<li>AT Q: <input id='char_quick' type='number'></input></li><br><br>" +
                            "<li>Total HP: <input id='char_totalhp' type='number'></input></li><br>" +
                            "<li>Curr. HP: <input id='char_currhp' type='number'></input></li><br><br>" +
                            "<li>Bleed Amt. <input id='char_bleedamt' type='number'></input></li><br>" +
                            "<li>Bleed Dur. <input id='char_bleeddur' type='number'></input></li><br><br>" +
                            "<li>Total PP: <input id='char_totalpp' type='number'></input></li><br>" +
                            "<li>Curr. PP: <input id='char_currpp' type='number'></input></li><br><br>" +
                            "<li>Stun Dur. <input id='char_stun' type='number'></input></li><br><br>" +
                            "<li id='knocked_block'>Knocked Down: <input id='char_knock' type='checkbox'></input></li><br><br>" +
                            "<li id='asleep_block'>Asleep: <input id='char_asleep' type='checkbox'></input></li><br><br>" +
                            "<li id='disarm_block'>Disarmed: <input id='char_disarm' type='checkbox'></input></li><br><br>" +
                            "<li>Forced Parry: <input id='char_parry' type='number'></input></li><br>" +
                            "<li>Penalty: <input id='char_penalty' type='number'></input></li><br>" +
                        "</div>"

var jsonTemplate = {
                    "name":"",
                    "Attack Quickness": null,
                    "Bleed Amount": null,
                    "Bleed Duration": null,
                    "Total HP": null,
                    "Current HP": null,
                    "Total Power": null,
                    "Current Power": null,
                    "Stun Duration": null,
                    "Knocked Down": false,
                    "Asleep": false,
                    "Disarmed": false,
                    "Forced Parry": null,
                    "Penalty": null
                    }

$(document).ready(function() {
    // First initialization of rounds
    var current_round = 1;
    var total_round = 1;
    // Make the html according to variables
    $("#current_round").text(current_round);
    $("#total_round").text(total_round);

    // Get the JSON template for rounds and characters
    $.getJSON('storage.json', function(charJsonObject) {
        // Get the specific rounds
        $.each(charJsonObject, function(index, value) {
            // Get the characters in rounds
            $.each(value, function(index, value) {
                // Get each character attributes
                $.each(value, function(index, value) {
                    // Create the first template
                    $("#objects").append("<div id='object_template_1'>" +
                                        objectTemplate);
                    // Check if it was a visitor who has previously visited
                    if (localStorage.getItem('charObject') == null || localStorage.getItem('charObject') === undefined) {
                        // Create variable to store JSON template
                        var createCharObject;
                        // Get the template
                        $.getJSON('storage.json', function(charJson) {
                            // Get the JSON inside the file
                            $.each(charJson, function(index, value) {
                                // Put JSON inside variable
                                createCharObject = value;
                                // Create local storage according to variable
                                localStorage.setItem('charObject', JSON.stringify(createCharObject));    
                                // Assign the local storage value to the variable
                                var charObject = localStorage.getItem('charObject');
                            });
                        });
                    } else {
                        var charObject = localStorage.getItem('charObject');
                        var charData;
                        $.each(JSON.parse(charObject), function(index, value) {
                            
                            charData = value;
                            if (index > current_round) {
                                current_round = index;
                                total_round = index;
                                $("#current_round").text(current_round);
                                $("#total_round").text(total_round);
                            }
                            $.each(value, function(index, value) {
                                $.each(value, function(index, value) {
                                    if ($(`#object_template_${index}`).length === 0) {
                                        $("#objects").append("<div id='object_template_"+index+"'>" +
                                            objectTemplate);
                                    }
                                    $(`#object_template_${index} #char_name`).val(charData["characters"][index]["Name"]);
                                    $(`#object_template_${index} #char_quick`).val(charData["characters"][index]["Attack Quickness"]);
                                    $(`#object_template_${index} #char_bleedamt`).val(charData["characters"][index]["Bleed Amount"]);
                                    $(`#object_template_${index} #char_bleeddur`).val(charData["characters"][index]["Bleed Duration"]);
                                    $(`#object_template_${index} #char_totalhp`).val(charData["characters"][index]["Total HP"]);
                                    $(`#object_template_${index} #char_currhp`).val(charData["characters"][index]["Current HP"]);
                                    $(`#object_template_${index} #char_totalpp`).val(charData["characters"][index]["Total Power"]);
                                    $(`#object_template_${index} #char_currpp`).val(charData["characters"][index]["Current Power"]);
                                    $(`#object_template_${index} #char_stun`).val(charData["characters"][index]["Stun Duration"]);
                                    $(`#object_template_${index} #char_knock`).val(charData["characters"][index]["Knocked Down"]);
                                    $(`#object_template_${index} #char_asleep`).val(charData["characters"][index]["Asleep"]);
                                    $(`#object_template_${index} #char_disarm`).val(charData["characters"][index]["Disarmed"]);
                                    $(`#object_template_${index} #char_parry`).val(charData["characters"][index]["Forced Parry"]);
                                    $(`#object_template_${index} #char_penalty`).val(charData["characters"][index]["Penalty"]);
                                });
                            });
                        });
                    }
                });
            });
        });
    });

    $("#add_object").click(function() {
        var div_amount = $("#objects").children("div").length + 1;
        $("#objects").append("<div id='object_template_"+div_amount+"'>" +
                            objectTemplate);
    });

    // When save is pressed
    $("#save").click(function() {
        var all_elements = $("#objects").children("div");
        var character_number;
        $.each(all_elements, function(index, value) {
            character_number = index + 1;
            var editableJSON = $.parseJSON(localStorage.getItem('charObject'));

            if (editableJSON[`${current_round}`] === undefined) {
                editableJSON[current_round] = {
                    "characters": {
                        "1": {}
                    }
                };
            }

            if (editableJSON[`${current_round}`]["characters"][`${character_number}`] === undefined) {
                editableJSON[`${current_round}`]["characters"][`${character_number}`] = jsonTemplate;
            }
            editableJSON[`${current_round}`]["characters"][`${character_number}`] = {
                "Name": $(`#${$(value).attr("id")} #char_name`).val(),
                "Attack Quickness": $(`#${$(value).attr("id")} #char_quick`).val(),
                "Bleed Amount": $(`#${$(value).attr("id")} #char_bleedamt`).val(),
                "Bleed Duration": $(`#${$(value).attr("id")} #char_bleeddur`).val(),
                "Total HP": $(`#${$(value).attr("id")} #char_totalhp`).val(),
                "Current HP": $(`#${$(value).attr("id")} #char_currhp`).val(),
                "Total Power": $(`#${$(value).attr("id")} #char_totalpp`).val(),
                "Current Power": $(`#${$(value).attr("id")} #char_currpp`).val(),
                "Stun Duration": $(`#${$(value).attr("id")} #char_stun`).val(),
                "Knocked Down": $(`#${$(value).attr("id")} #char_knock`).is(":checked"),
                "Asleep": $(`#${$(value).attr("id")} #char_asleep`).is(":checked"),
                "Disarmed": $(`#${$(value).attr("id")} #char_disarm`).is(":checked"),
                "Forced Parry": $(`#${$(value).attr("id")} #char_parry`).val(),
                "Penalty": $(`#${$(value).attr("id")} #char_penalty`).val()
            };
            localStorage.setItem('charObject', JSON.stringify(editableJSON));
        });
    });

    // When next is pressed
    $("#next").click(function() {
        $("#save").click();
        // Change both values
        if (current_round == total_round) {
            current_round++;
            total_round++;
        // Change only current round
        } else {
            current_round++;
        }
        $("#current_round").text(current_round);
        $("#total_round").text(total_round);

        var editableJSON = localStorage.getItem('charObject');

        if ( $.parseJSON(editableJSON)[`${current_round}`] === undefined) {
            var allElements = $("#objects").children("div");
            $.each(allElements, function(index, value) {
                var char_amount = $(`#${$(value).attr("id")} #char_bleedamt`).val();
                var char_duration = $(`#${$(value).attr("id")} #char_bleeddur`).val();
                var char_health = $(`#${$(value).attr("id")} #char_currhp`).val()
                var char_stunned = $(`#${$(value).attr("id")} #char_stun`).val();
                var char_forced = $(`#${$(value).attr("id")} #char_parry`).val();
                if (char_duration > 0) {
                    char_health = $(`#${$(value).attr("id")} #char_currhp`).val() - char_amount;
                    char_duration = $(`#${$(value).attr("id")} #char_bleeddur`).val() - 1;
                } else if (char_duration == 0) {
                    char_amount = 0;
                }
                if ($(`#${$(value).attr("id")} #char_stun`).val() > 0) {
                    char_stunned = $(`#${$(value).attr("id")} #char_stun`).val() - 1;
                }
                if ($(`#${$(value).attr("id")} #char_parry`).val() > 0) {
                    char_forced = $(`#${$(value).attr("id")} #char_parry`).val() - 1;
                }
                $(`#${$(value).attr("id")} #char_bleedamt`).val(char_amount);
                $(`#${$(value).attr("id")} #char_bleeddur`).val(char_duration);
                $(`#${$(value).attr("id")} #char_currhp`).val(char_health);
                $(`#${$(value).attr("id")} #char_stun`).val(char_stunned);
                $(`#${$(value).attr("id")} #char_parry`).val(char_forced);

                $(`#${$(value).attr("id")} #char_stun`).change();
                $(`#${$(value).attr("id")} #char_knock`).change();
                $(`#${$(value).attr("id")} #char_asleep`).change();
                $(`#${$(value).attr("id")} #char_disarm`).change();
            });
        } else {
            charObject = localStorage.getItem('charObject');
            var charData;
            $.each(JSON.parse(charObject)[current_round], function(index, value) {
                charData = value;
                $.each(value, function(index, value) {
                    if ($(`#object_template_${index}`).length === 0) {
                        $("#objects").append("<div id='object_template_"+index+"'>" +
                            objectTemplate);
                    }
                    $(`#object_template_${index} #char_name`).val(charData[index]["Name"]);
                    $(`#object_template_${index} #char_quick`).val(charData[index]["Attack Quickness"]);
                    $(`#object_template_${index} #char_bleedamt`).val(charData[index]["Bleed Amount"]);
                    $(`#object_template_${index} #char_bleeddur`).val(charData[index]["Bleed Duration"]);
                    $(`#object_template_${index} #char_totalhp`).val(charData[index]["Total HP"]);
                    $(`#object_template_${index} #char_currhp`).val(charData[index]["Current HP"]);
                    $(`#object_template_${index} #char_totalpp`).val(charData[index]["Total Power"]);
                    $(`#object_template_${index} #char_currpp`).val(charData[index]["Current Power"]);
                    $(`#object_template_${index} #char_stun`).val(charData[index]["Stun Duration"]);
                    $(`#object_template_${index} #char_parry`).val(charData[index]["Forced Parry"]);
                    $(`#object_template_${index} #char_penalty`).val(charData[index]["Penalty"]);



                    if (charData[index]["Knocked Down"] == true) {
                        $(`#object_template_${index} #char_knock`).prop('checked', true)
                    } else {
                        $(`#object_template_${index} #char_knock`).prop('checked', false)
                    }

                    if (charData[index]["Asleep"] == true) {
                        $(`#object_template_${index} #char_asleep`).prop('checked', true)
                    } else {
                        $(`#object_template_${index} #char_asleep`).prop('checked', false)
                    }

                    if (charData[index]["Disarmed"] == true) {
                        $(`#object_template_${index} #char_disarm`).prop('checked', true)
                    } else {
                        $(`#object_template_${index} #char_disarm`).prop('checked', false)
                    }

                    $(`#object_template_${index} #char_stun`).change();
                    $(`#object_template_${index} #char_knock`).change();
                    $(`#object_template_${index} #char_asleep`).change();
                    $(`#object_template_${index} #char_disarm`).change();
                });
            });
        }
    });

    // When previous round is clicked
    $("#previous").click(function() {
        // Can't go below round 1
        if (current_round != 1) {
            current_round--;
        }
        $("#current_round").text(current_round);
        $("#total_round").text(total_round);
        charObject = localStorage.getItem('charObject');
        var charData;
        $.each(JSON.parse(charObject)[current_round], function(index, value) {
            charData = value;
            $.each(value, function(index, value) {
                if ($(`#object_template_${index}`).length === 0) {
                    $("#objects").append("<div id='object_template_"+index+"'>" +
                        objectTemplate);
                }
                $(`#object_template_${index} #char_name`).val(charData[index]["Name"]);
                $(`#object_template_${index} #char_quick`).val(charData[index]["Attack Quickness"]);
                $(`#object_template_${index} #char_bleedamt`).val(charData[index]["Bleed Amount"]);
                $(`#object_template_${index} #char_bleeddur`).val(charData[index]["Bleed Duration"]);
                $(`#object_template_${index} #char_totalhp`).val(charData[index]["Total HP"]);
                $(`#object_template_${index} #char_currhp`).val(charData[index]["Current HP"]);
                $(`#object_template_${index} #char_totalpp`).val(charData[index]["Total Power"]);
                $(`#object_template_${index} #char_currpp`).val(charData[index]["Current Power"]);
                $(`#object_template_${index} #char_stun`).val(charData[index]["Stun Duration"]);
                $(`#object_template_${index} #char_parry`).val(charData[index]["Forced Parry"]);
                $(`#object_template_${index} #char_penalty`).val(charData[index]["Penalty"]);


                if (charData[index]["Knocked Down"] == true) {
                    $(`#object_template_${index} #char_knock`).prop('checked', true)
                } else {
                    $(`#object_template_${index} #char_knock`).prop('checked', false)
                }

                if (charData[index]["Asleep"] == true) {
                    $(`#object_template_${index} #char_asleep`).prop('checked', true)
                } else {
                    $(`#object_template_${index} #char_asleep`).prop('checked', false)
                }

                if (charData[index]["Disarmed"] == true) {
                    $(`#object_template_${index} #char_disarm`).prop('checked', true)
                } else {
                    $(`#object_template_${index} #char_disarm`).prop('checked', false)
                }

                $(`#object_template_${index} #char_stun`).change();
                $(`#object_template_${index} #char_knock`).change();
                $(`#object_template_${index} #char_asleep`).change();
                $(`#object_template_${index} #char_disarm`).change();
            });
        });
    });

    // When clear is clicked
    $("#clear").click(function() {
        if (current_round > 1 || total_round > 1 || ($("#objects").children("div").length) > 1)
        current_round = 1;
        total_round = 1;
        $("#current_round").text(current_round);
        $("#total_round").text(total_round);
        localStorage.removeItem("charObject");
        $("#objects").empty();
        $("#objects").append("<div id='object_template_1'>" +
                            objectTemplate);
        var createCharObject;
        $.getJSON('storage.json', function(charJson) {
            $.each(charJson, function(index, value) {
                createCharObject = value;
                localStorage.setItem('charObject', JSON.stringify(createCharObject));    
                charObject = localStorage.getItem('charObject');
            });
        });
    });

    // When Save File is clicked
    $("#backup").click(function() {
        $("<a />", {
            "download": "myData.json",
            "href": "data:application/json," + encodeURIComponent(charObject)
        }).appendTo("body")
        .click(function() {
            $(this).remove()
        })[0].click()
    });

    // When Reshuffle is clicked
    $("#reshuffle").click(function() {
        var amount_quick = 0;
        $("#short_desc").html("Making tracking easier");
        $("#objects").children().each(function() {
            if ($(this).find("#char_quick").val()) {
                amount_quick++
            };

            console.log($(this).attr("id"));
            console.log($(this).find("#char_quick").val());
        });

        if (amount_quick >= 2) {
            console.log("Got here");

        } else {
            $("#short_desc").append("<br><br>Didn't find 2 or more characters with AT Q value.");
        };
    });
});

// Check for status effects
$("#objects").on("change", "div[id^='object_template']", function() {
    if ($(this).find("#char_stun").val() >= 1) {
        $(this).css('background-color', '#C9BA19');
    } else {
        $(this).css('background-color', '#fff');
    }

    if ($(this).find("#char_knock").is(":checked")) {
        $(this).find("#knocked_block").css('background-color', '#6699ff');
    } else {
        $(this).find("#knocked_block").css('background-color', '#fff');
    }

    if ($(this).find("#char_asleep").is(":checked")) {
        $(this).find("#asleep_block").css('background-color', '#31B057');
    } else {
        $(this).find("#asleep_block").css('background-color', '#fff');
    } 

    if ($(this).find("#char_disarm").is(":checked")) {
        $(this).find("#disarm_block").css('background-color', '#8249D5');
    } else {
        $(this).find("#disarm_block").css('background-color', '#fff');
    }
});

$("#objects").on("click", "#to_left", function() {
    var div_id = Number($(this).parent().attr("id").replace("object_template_",""));

    $("#short_desc").html("Making tracking easier");

    console.log("DivID:"+{div_id}+"\nNew_div_id:"+{new_div_id})

    if (div_id != 1) {
        var new_div_id = div_id - 1;

        var clicked_values = {
            "Name": $(`#object_template_${div_id} #char_name`).val(),
            "Attack Quickness": $(`#object_template_${div_id} #char_quick`).val(),
            "Bleed Amount": $(`#object_template_${div_id} #char_bleedamt`).val(),
            "Bleed Duration": $(`#object_template_${div_id} #char_bleeddur`).val(),
            "Total HP": $(`#object_template_${div_id} #char_totalhp`).val(),
            "Current HP": $(`#object_template_${div_id} #char_currhp`).val(),
            "Total Power": $(`#object_template_${div_id} #char_totalpp`).val(),
            "Current Power": $(`#object_template_${div_id} #char_currpp`).val(),
            "Stun Duration": $(`#object_template_${div_id} #char_stun`).val(),
            "Knocked Down": $(`#object_template_${div_id} #char_knock`).is(":checked"),
            "Asleep": $(`#object_template_${div_id} #char_asleep`).is(":checked"),
            "Disarmed": $(`#object_template_${div_id} #char_disarm`).is(":checked"),
            "Forced Parry": $(`#object_template_${div_id} #char_parry`).val(),
            "Penalty": $(`#object_template_${div_id} #char_penalty`).val(),
        }

        var to_replace_values = {
            "Name": $(`#object_template_${new_div_id} #char_name`).val(),
            "Attack Quickness": $(`#object_template_${new_div_id} #char_quick`).val(),
            "Bleed Amount": $(`#object_template_${new_div_id} #char_bleedamt`).val(),
            "Bleed Duration": $(`#object_template_${new_div_id} #char_bleeddur`).val(),
            "Total HP": $(`#object_template_${new_div_id} #char_totalhp`).val(),
            "Current HP": $(`#object_template_${new_div_id} #char_currhp`).val(),
            "Total Power": $(`#object_template_${new_div_id} #char_totalpp`).val(),
            "Current Power": $(`#object_template_${new_div_id} #char_currpp`).val(),
            "Stun Duration": $(`#object_template_${new_div_id} #char_stun`).val(),
            "Knocked Down": $(`#object_template_${new_div_id} #char_knock`).is(":checked"),
            "Asleep": $(`#object_template_${new_div_id} #char_asleep`).is(":checked"),
            "Disarmed": $(`#object_template_${new_div_id} #char_disarm`).is(":checked"),
            "Forced Parry": $(`#object_template_${new_div_id} #char_parry`).val(),
            "Penalty": $(`#object_template_${new_div_id} #char_penalty`).val(),
        }


        $(`#object_template_${new_div_id} #char_name`).val(clicked_values["Name"]);
        $(`#object_template_${div_id} #char_name`).val(to_replace_values["Name"]);

        $(`#object_template_${new_div_id} #char_quick`).val(clicked_values["Attack Quickness"]);
        $(`#object_template_${div_id} #char_quick`).val(to_replace_values["Attack Quickness"]);

        $(`#object_template_${new_div_id} #char_bleedamt`).val(clicked_values["Bleed Amount"]);
        $(`#object_template_${div_id} #char_bleedamt`).val(to_replace_values["Bleed Amount"]);

        $(`#object_template_${new_div_id} #char_bleeddur`).val(clicked_values["Bleed Duration"]);
        $(`#object_template_${div_id} #char_bleeddur`).val(to_replace_values["Bleed Duration"]);

        $(`#object_template_${new_div_id} #char_totalhp`).val(clicked_values["Total HP"]);
        $(`#object_template_${div_id} #char_totalhp`).val(to_replace_values["Total HP"]);

        $(`#object_template_${new_div_id} #char_currhp`).val(clicked_values["Current HP"]);
        $(`#object_template_${div_id} #char_currhp`).val(to_replace_values["Current HP"]);

        $(`#object_template_${new_div_id} #char_totalpp`).val(clicked_values["Total Power"]);
        $(`#object_template_${div_id} #char_totalpp`).val(to_replace_values["Total Power"]);

        $(`#object_template_${new_div_id} #char_currpp`).val(clicked_values["Current Power"]);
        $(`#object_template_${div_id} #char_currpp`).val(to_replace_values["Current Power"]);

        $(`#object_template_${new_div_id} #char_stun`).val(clicked_values["Stun Duration"]);
        $(`#object_template_${div_id} #char_stun`).val(to_replace_values["Stun Duration"]);

        $(`#object_template_${new_div_id} #char_parry`).val(clicked_values["Forced Parry"]);
        $(`#object_template_${div_id} #char_parry`).val(to_replace_values["Forced Parry"]);

        $(`#object_template_${new_div_id} #char_penalty`).val(clicked_values["Penalty"]);
        $(`#object_template_${div_id} #char_penalty`).val(to_replace_values["Penalty"]);



        if (clicked_values["Knocked Down"] == true) {
            $(`#object_template_${new_div_id} #char_knock`).prop('checked', true)
        } else {
            $(`#object_template_${new_div_id} #char_knock`).prop('checked', false)
        }

        if (to_replace_values["Knocked Down"] == true) {
            $(`#object_template_${div_id} #char_knock`).prop('checked', true)
        } else {
            $(`#object_template_${div_id} #char_knock`).prop('checked', false)
        }

        if (clicked_values["Asleep"] == true) {
            $(`#object_template_${new_div_id} #char_asleep`).prop('checked', true)
        } else {
            $(`#object_template_${new_div_id} #char_asleep`).prop('checked', false)
        }

        if (to_replace_values["Asleep"] == true) {
            $(`#object_template_${div_id} #char_asleep`).prop('checked', true)
        } else {
            $(`#object_template_${div_id} #char_asleep`).prop('checked', false)
        }

        if (clicked_values["Disarmed"] == true) {
            $(`#object_template_${new_div_id} #char_disarm`).prop('checked', true)
        } else {
            $(`#object_template_${new_div_id} #char_disarm`).prop('checked', false)
        }

        if (to_replace_values["Disarmed"] == true) {
            $(`#object_template_${div_id} #char_disarm`).prop('checked', true)
        } else {
            $(`#object_template_${div_id} #char_disarm`).prop('checked', false)
        }


        $(`#object_template_${new_div_id} #char_stun`).change();
        $(`#object_template_${new_div_id} #char_knock`).change();
        $(`#object_template_${new_div_id} #char_asleep`).change();
        $(`#object_template_${new_div_id} #char_disarm`).change();

        $(`#object_template_${div_id} #char_stun`).change();
        $(`#object_template_${div_id} #char_knock`).change();
        $(`#object_template_${div_id} #char_asleep`).change();
        $(`#object_template_${div_id} #char_disarm`).change();

    } else {
        $("#short_desc").append("<br><br>This character can't be moved further left.");
    }
});

$("#objects").on("click", "#remove", function() {
    $("#short_desc").html("Making tracking easier");

    var div_id = Number($(this).parent().attr("id").replace("object_template_",""));
    var max_char_amt = $("#objects").find("div[id^='object_template']").length;

    if (max_char_amt == 1) {
        $("#short_desc").append("<br><br>You should have more than one character before deleting.");
    } else if (div_id == max_char_amt && div_id != 1) { // If it is the last character element - Since nothing has to be changed
        $(`#object_template_${div_id}`).remove();
    } else {
        $(`#object_template_${div_id}`).remove();

        $.each($("#objects").find("div[id^='object_template']"), function(index, value) {
            if ($(value).attr("id").split("object_template_")[1] > div_id) {
                var old_id = $(value).attr("id").split("object_template_")[1];
                $(value).attr("id",`object_template_${old_id - 1}`);
            }
        });
    }
});

$("#objects").on("click", "#to_right", function() {
    var div_id = Number($(this).parent().attr("id").replace("object_template_",""));

    var editableJSON = localStorage.getItem('charObject');
    var max_char_amt;

    // Get the amount of characters in current round
    $.each($.parseJSON(editableJSON), function(index, value) {
        max_char_amt = Object.keys($.parseJSON(editableJSON)[index]["characters"]).length;
    });

    $("#short_desc").html("Making tracking easier");

    if (div_id != max_char_amt) {
        var new_div_id = div_id + 1;

        var clicked_values = {
            "Name": $(`#object_template_${div_id} #char_name`).val(),
            "Attack Quickness": $(`#object_template_${div_id} #char_quick`).val(),
            "Bleed Amount": $(`#object_template_${div_id} #char_bleedamt`).val(),
            "Bleed Duration": $(`#object_template_${div_id} #char_bleeddur`).val(),
            "Total HP": $(`#object_template_${div_id} #char_totalhp`).val(),
            "Current HP": $(`#object_template_${div_id} #char_currhp`).val(),
            "Total Power": $(`#object_template_${div_id} #char_totalpp`).val(),
            "Current Power": $(`#object_template_${div_id} #char_currpp`).val(),
            "Stun Duration": $(`#object_template_${div_id} #char_stun`).val(),
            "Knocked Down": $(`#object_template_${div_id} #char_knock`).is(":checked"),
            "Asleep": $(`#object_template_${div_id} #char_asleep`).is(":checked"),
            "Disarmed": $(`#object_template_${div_id} #char_disarm`).is(":checked"),
            "Forced Parry": $(`#object_template_${div_id} #char_parry`).val(),
            "Penalty": $(`#object_template_${div_id} #char_penalty`).val(),
        }

        var to_replace_values = {
            "Name": $(`#object_template_${new_div_id} #char_name`).val(),
            "Attack Quickness": $(`#object_template_${new_div_id} #char_quick`).val(),
            "Bleed Amount": $(`#object_template_${new_div_id} #char_bleedamt`).val(),
            "Bleed Duration": $(`#object_template_${new_div_id} #char_bleeddur`).val(),
            "Total HP": $(`#object_template_${new_div_id} #char_totalhp`).val(),
            "Current HP": $(`#object_template_${new_div_id} #char_currhp`).val(),
            "Total Power": $(`#object_template_${new_div_id} #char_totalpp`).val(),
            "Current Power": $(`#object_template_${new_div_id} #char_currpp`).val(),
            "Stun Duration": $(`#object_template_${new_div_id} #char_stun`).val(),
            "Knocked Down": $(`#object_template_${new_div_id} #char_knock`).is(":checked"),
            "Asleep": $(`#object_template_${new_div_id} #char_asleep`).is(":checked"),
            "Disarmed": $(`#object_template_${new_div_id} #char_disarm`).is(":checked"),
            "Forced Parry": $(`#object_template_${new_div_id} #char_parry`).val(),
            "Penalty": $(`#object_template_${new_div_id} #char_penalty`).val(),
        }

        $(`#object_template_${new_div_id} #char_name`).val(clicked_values["Name"]);
        $(`#object_template_${div_id} #char_name`).val(to_replace_values["Name"]);

        $(`#object_template_${new_div_id} #char_quick`).val(clicked_values["Attack Quickness"]);
        $(`#object_template_${div_id} #char_quick`).val(to_replace_values["Attack Quickness"]);

        $(`#object_template_${new_div_id} #char_bleedamt`).val(clicked_values["Bleed Amount"]);
        $(`#object_template_${div_id} #char_bleedamt`).val(to_replace_values["Bleed Amount"]);

        $(`#object_template_${new_div_id} #char_bleeddur`).val(clicked_values["Bleed Duration"]);
        $(`#object_template_${div_id} #char_bleeddur`).val(to_replace_values["Bleed Duration"]);

        $(`#object_template_${new_div_id} #char_totalhp`).val(clicked_values["Total HP"]);
        $(`#object_template_${div_id} #char_totalhp`).val(to_replace_values["Total HP"]);

        $(`#object_template_${new_div_id} #char_currhp`).val(clicked_values["Current HP"]);
        $(`#object_template_${div_id} #char_currhp`).val(to_replace_values["Current HP"]);

        $(`#object_template_${new_div_id} #char_totalpp`).val(clicked_values["Total Power"]);
        $(`#object_template_${div_id} #char_totalpp`).val(to_replace_values["Total Power"]);

        $(`#object_template_${new_div_id} #char_currpp`).val(clicked_values["Current Power"]);
        $(`#object_template_${div_id} #char_currpp`).val(to_replace_values["Current Power"]);

        $(`#object_template_${new_div_id} #char_stun`).val(clicked_values["Stun Duration"]);
        $(`#object_template_${div_id} #char_stun`).val(to_replace_values["Stun Duration"]);

        $(`#object_template_${new_div_id} #char_parry`).val(clicked_values["Forced Parry"]);
        $(`#object_template_${div_id} #char_parry`).val(to_replace_values["Forced Parry"]);

        $(`#object_template_${new_div_id} #char_penalty`).val(clicked_values["Penalty"]);
        $(`#object_template_${div_id} #char_penalty`).val(to_replace_values["Penalty"]);



        if (clicked_values["Knocked Down"] == true) {
            $(`#object_template_${new_div_id} #char_knock`).prop('checked', true)
        } else {
            $(`#object_template_${new_div_id} #char_knock`).prop('checked', false)
        }

        if (to_replace_values["Knocked Down"] == true) {
            $(`#object_template_${div_id} #char_knock`).prop('checked', true)
        } else {
            $(`#object_template_${div_id} #char_knock`).prop('checked', false)
        }

        if (clicked_values["Asleep"] == true) {
            $(`#object_template_${new_div_id} #char_asleep`).prop('checked', true)
        } else {
            $(`#object_template_${new_div_id} #char_asleep`).prop('checked', false)
        }

        if (to_replace_values["Asleep"] == true) {
            $(`#object_template_${div_id} #char_asleep`).prop('checked', true)
        } else {
            $(`#object_template_${div_id} #char_asleep`).prop('checked', false)
        }

        if (clicked_values["Disarmed"] == true) {
            $(`#object_template_${new_div_id} #char_disarm`).prop('checked', true)
        } else {
            $(`#object_template_${new_div_id} #char_disarm`).prop('checked', false)
        }

        if (to_replace_values["Disarmed"] == true) {
            $(`#object_template_${div_id} #char_disarm`).prop('checked', true)
        } else {
            $(`#object_template_${div_id} #char_disarm`).prop('checked', false)
        }


        $(`#object_template_${new_div_id} #char_stun`).change();
        $(`#object_template_${new_div_id} #char_knock`).change();
        $(`#object_template_${new_div_id} #char_asleep`).change();
        $(`#object_template_${new_div_id} #char_disarm`).change();

        $(`#object_template_${div_id} #char_stun`).change();
        $(`#object_template_${div_id} #char_knock`).change();
        $(`#object_template_${div_id} #char_asleep`).change();
        $(`#object_template_${div_id} #char_disarm`).change();

    } else {
        $("#short_desc").append("<br><br>This character can't be moved further right.");
    }
});