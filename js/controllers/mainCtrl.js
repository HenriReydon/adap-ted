/*
* 
* 
* 
*/

app.controller('mainCtrl', function($scope, $ionicPopup, $timeout, $state,
                                 $rootScope, randomize, colors, behaviors, converter, tempsave)
{
    //initHome();
    function initHome()
    {
        //Header buttons
        $scope.parameters = 
        {
            'display_ul': false,
            'activate_valid': false,
            'index_pgm': 0,/*
            'height_occurences' : Math.round(window.innerHeight*18/100),
            'height_timers' : Math.round(window.innerHeight*8/100),*/
            'height_program' : Math.round(window.innerHeight*40/100),
            'history_limit' : 7
        };

        var french = 
        {
            "previous": "Précédent",
            "next" : "Suivant",
            "begin": "Debut",
            "end": "Fin",
            "hour": "Heure",

            "b_valid": "Valider",
            "b_cancel": "Annuler",
            "b_about" : "À propos",
            "b_transfert" : "Transferer",
            "b_use_ref" : "Lancer",
            "b_ask_setpoint": ["Poser la consigne", "Temps de réaction :"],
            "b_learn_alone": "Seul",
            "b_learn_guided": "Guidé",
            "b_ask_waiting": ["Attente de la réponse", "Temps de réalisation : "],
            "b_launch": "Commencer",
            "b_continue": "Reprendre",

            "h_occurences": "Occurrences",
            "h_frequency" : "(Fréquence)",
            "h_response": "Temps de réponse",
            "h_latency" : "(Latence)",
            "h_timers": "Minuteurs",
            "h_duration" : "(Durée)",
            "h_likert" : "Echelle de Likert",
            "h_intensity" : "(Intensité)",
            "h_legend": ["Basse", "Moyenne", "Haute"],
            "h_learn_alone": "Seul",
            "h_learn_guided": "Guidé",
            "h_learned": "Acquis/Maintien",
            "h_reaction_avg": "Temps de réaction moyen :",
            "h_realisation_avg": "Temps de réalisation moyen :",
            "h_prepare" : "Entrez le code de votre équipe",
            "h_placeholder_prepare" : "Code (ex. 01234)",
            "h_history" : "Historique",
            "h_warning" : "CIBO dit : ",
            "h_usage" : "UTILISATIONS",
            "h_tasks": "Analyses de tâches",
            "h_empty_tasks" : "La liste de tâche est vide.",
            "h_comment" : "Commentaire",

            "m_about" : "Données non-synchronisées !",
            "m_history" : "Réutiliser une interface.",
            "m_new_interface" : "Créer une nouvelle interface ?",    
            "m_logged_out" : "Vous n'êtes pas connecté.",  
            "m_no_network" : '"Internet non connecté."',        
            "m_bulle_add_behavior": "Associer un comportement à ce bouton."
        };
        var english = 
        {
            "previous": "Previous",
            "next": "Next",
            "begin": "Begin",
            "end": "End",
            "hour": "Hour",

            "b_valid": "Validate",
            "b_cancel": "Cancel",
            "b_about" : "About",
            "b_transfert" : "Transfer",
            "b_use_ref" : "Launch",
            "b_ask_setpoint": ["Ask the setpoint", "Reaction time :"],
            "b_learn_alone": "Alone",
            "b_learn_guided": "Guided", 
            "b_ask_waiting": ["Waiting for response", "Achievement time : "],
            "b_launch": "Begin",
            "b_continue": "Continue",

            "h_occurences": "Occurrences",
            "h_frequency" : "(Frequency)",
            "h_response": "Response Time",
            "h_latency" : "(Latency)",
            "h_timers": "Timers",
            "h_duration" : "(Duration)",
            "h_likert" : "Likert Scale",
            "h_intensity" : "(Intensity)",
            "h_legend": ["Low", "Medium", "High"],
            "h_learn_alone": "alone",
            "h_learn_guided": "guided",
            "h_reaction_avg": "Average reaction time :",
            "h_realisation_avg": "Average achievement time :",
            "h_prepare" : "Enter your team code",
            "h_placeholder_prepare" : "Code (ex. 01234)",
            "h_history" : "History",
            "h_warning" : "CIBO says : ",
            "h_usage" : "USAGES",
            "h_tasks": "Tasks analysis",
            "h_empty_tasks" : "Task list is empty.",
            "h_comment" : "Comment here",

            "m_about" : "Data not synchronized !",
            "m_history" : "Reuse an interface.",
            "m_new_interface" : "Create a new interface ?", 
            "m_logged_out" : "You're not connected.", 
            "m_no_network" : '"Internet not connected."',         
            "m_bulle_add_occurence": "<strong>Write</strong> or <strong>Choose</strong> a behavior for this button.",
            "m_bulle_add_behavior": "Associate a behavior to this button."
        };       
        $scope.texts = english;
        clearData();

        $scope.setLangage = function(langue)
        {
            $scope.texts = eval(langue);
        }

        $scope.openLeft = function()
        {
            $rootScope.$broadcast('openLeft');
        }

        $scope.openRight = function()
        {
            $rootScope.$broadcast('openRight');
        }
    }

    function clearData()
    {
        $scope.interface = {};
        $scope.interface.occurences = [];
        $scope.interface.timers = [];
        $scope.interface.programs = [];

        $scope.behaviors = {};
    }

    function initAlterable()
    {
        $scope.interface.occurences = [];
        $scope.interface.timers = [];
        $scope.interface.programs = [];

        $scope.fileSystem = {};

        var listener = $scope.$on('cpts_received', function(event, data)
        {
            $scope.behaviors.occurences = data.occ;
            $scope.behaviors.timers = data.min;
            $scope.behaviors.programs = data.pro;
            
            listener();
            initAlterableButtons();
        });

        behaviors.exe();
    }

    function initAlterableButtons()
    {
        for(var i=0; i<=7; i++)
        {
            if(i==6)
                $scope.interface.occurences.push({"mode":false, "exist": true});//false mean + button
            else
                $scope.interface.occurences.push({
                    "tick":0, "mode": true, "exist": false,
                    "style": "border-color: "+colors.palette_occ(i)[1]+"; color:#fddbc7 !important; background-color:"+colors.palette_occ(i)[1],
                    "data": [],
                    "likert" : {
                        "legend": [$scope.texts.h_legend[0], $scope.texts.h_legend[1], $scope.texts.h_legend[2]],
                        "style" : ["color:#fddbc7 !important; background-color:"+colors.palette_occ(i)[0], 
                                    "color:#fddbc7 !important; background-color:"+colors.palette_occ(i)[1],
                                    "color:#fddbc7 !important; background-color:"+colors.palette_occ(i)[2]],
                        "exist": false,
                        "disabled" : true
                    }
                });//false mean + button
        }

        for(var i=0; i<=4; i++)
        {
            if(i==4)
                $scope.interface.timers.push({"mode":false, "exist": true});//false mean + button
            else
                $scope.interface.timers.push({"hourTmp":"",
                 "min":00, "sec":00, "msec":0,
                  "occurrences":0, 'timer': undefined,
                   "mode": true, "exist": false,
                    "style": "border-color: "+colors.palette_min(i)[1]+"; color: #fddbc7 !important; background-color:"+colors.palette_min(i)[1],
                     "data": [],
                    "likert" : {
                        "legend": [$scope.texts.h_legend[0], $scope.texts.h_legend[1], $scope.texts.h_legend[2]],
                        "style" : ["color:#fddbc7 !important; background-color:"+colors.palette_min(i)[0], 
                                    "color:#fddbc7 !important; background-color:"+colors.palette_min(i)[1],
                                    "color:#fddbc7 !important; background-color:"+colors.palette_min(i)[2]],
                        "exist": false,
                        "disabled" : true
                    }
                });//false mean + button
        }

        for(var i=0; i<=3; i++)
        {
            if(i==3)
                $scope.interface.programs.push({"mode":false, "exist": true});//false mean + button
            else
                $scope.interface.programs.push({
                "hour_tmp_d":"",
                "hour_tmp_r":"",                 
                "min_d":0, "sec_d":0, "msec_d":0, "timer_d": undefined,
                "min_r":0, "sec_r":0, "msec_r":0, "timer_r": undefined,
                "nb_s": 0, "nb_g": 0, "nb_n": 0, "cumul_d":0, "avg_d": 0,"cumul_r":0, "avg_r": 0,
                "mode": true, "exist": false, "state_setpoint": 0, "state_waiting" : 0,
                'disabled_ask_task': false, 'disabled_resp_task': true, 'disabled_time_delay_task': true,
                "style": "border-color: "+colors.palette_pro(i)+"; color: #fddbc7 !important; background-color:"+colors.palette_pro(i),
                "data": []});//false mean + button
        }
    }

    function initHistory()
    {
        $scope.history = {};
        $scope.history.interfaces = [{"interface":{"occurences":[{"tick":0,"mode":true,"exist":true,"style":"border-color: #1b7837; color:#fddbc7 !important; background-color:#1b7837","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#328F4E","color:#fddbc7 !important; background-color:#1b7837","color:#fddbc7 !important; background-color:#075C21"],"disabled":true},"behavior":{"name":"Range son stylo"}},{"tick":0,"mode":true,"exist":true,"style":"border-color: #8c510a; color:#fddbc7 !important; background-color:#8c510a","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#AD6E24","color:#fddbc7 !important; background-color:#8c510a","color:#fddbc7 !important; background-color:#663700"],"exist":true,"disabled":true},"behavior":{"name":"Claque sur le visage"}},{"tick":0,"mode":true,"exist":true,"style":"border-color: #5ab4ac; color:#fddbc7 !important; background-color:#5ab4ac","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#89D4CF","color:#fddbc7 !important; background-color:#5ab4ac","color:#fddbc7 !important; background-color:#38968F"],"disabled":true},"behavior":{"name":"Se pince les doigts"}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #d73027; color:#fddbc7 !important; background-color:#d73027","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#E85850","color:#fddbc7 !important; background-color:#d73027","color:#fddbc7 !important; background-color:#AC1A12"],"exist":false,"disabled":true}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #B18B39; color:#fddbc7 !important; background-color:#B18B39","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#d8b365","color:#fddbc7 !important; background-color:#B18B39","color:#fddbc7 !important; background-color:#896517"],"exist":false,"disabled":true}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #01665e; color:#fddbc7 !important; background-color:#01665e","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#0C7B73","color:#fddbc7 !important; background-color:#01665e","color:#fddbc7 !important; background-color:#00504A"],"exist":false,"disabled":true}},{"mode":false,"exist":true},{"tick":0,"mode":true,"exist":false,"style":"border-color: undefined; color:#fddbc7 !important; background-color:undefined","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:undefined","color:#fddbc7 !important; background-color:undefined","color:#fddbc7 !important; background-color:undefined"],"exist":false,"disabled":true}}],"timers":[{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":true,"style":"border-color: #3288bd; color: #fddbc7 !important; background-color:#3288bd","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#53A0CD","color:#fddbc7 !important; background-color:#3288bd","color:#fddbc7 !important; background-color:#1175B0"],"disabled":true},"behavior":{"name":"Joue avec ses cheveux"}},{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":true,"style":"border-color: #af8dc3; color: #fddbc7 !important; background-color:#af8dc3","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#D3BDE0","color:#fddbc7 !important; background-color:#af8dc3","color:#fddbc7 !important; background-color:#8A5FA3"],"exist":true,"disabled":true},"behavior":{"name":"Pousse un cri continu"}},{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":false,"style":"border-color: #E56D33; color: #fddbc7 !important; background-color:#E56D33","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#fc8d59","color:#fddbc7 !important; background-color:#E56D33","color:#fddbc7 !important; background-color:#BC4B15"],"exist":false,"disabled":true}},{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":false,"style":"border-color: #d53e4f; color: #fddbc7 !important; background-color:#d53e4f","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#F06575","color:#fddbc7 !important; background-color:#d53e4f","color:#fddbc7 !important; background-color:#B91D2F"],"exist":false,"disabled":true}},{"mode":false,"exist":true}],"programs":[{"hour_tmp_d":"","hour_tmp_r":"","min_d":0,"sec_d":0,"msec_d":0,"min_r":0,"sec_r":0,"msec_r":0,"nb_s":0,"nb_g":0,"nb_n":0,"cumul_d":0,"avg_d":0,"cumul_r":0,"avg_r":0,"mode":true,"exist":false,"state_setpoint":0,"state_waiting":0,"disabled_ask_task":false,"disabled_resp_task":true,"disabled_time_delay_task":true,"style":"border-color: #4A6169; color: #fddbc7 !important; background-color:#4A6169","data":[]},{"hour_tmp_d":"","hour_tmp_r":"","min_d":0,"sec_d":0,"msec_d":0,"min_r":0,"sec_r":0,"msec_r":0,"nb_s":0,"nb_g":0,"nb_n":0,"cumul_d":0,"avg_d":0,"cumul_r":0,"avg_r":0,"mode":true,"exist":false,"state_setpoint":0,"state_waiting":0,"disabled_ask_task":false,"disabled_resp_task":true,"disabled_time_delay_task":true,"style":"border-color: #4A6169; color: #fddbc7 !important; background-color:#4A6169","data":[]},{"hour_tmp_d":"","hour_tmp_r":"","min_d":0,"sec_d":0,"msec_d":0,"min_r":0,"sec_r":0,"msec_r":0,"nb_s":0,"nb_g":0,"nb_n":0,"cumul_d":0,"avg_d":0,"cumul_r":0,"avg_r":0,"mode":true,"exist":false,"state_setpoint":0,"state_waiting":0,"disabled_ask_task":false,"disabled_resp_task":true,"disabled_time_delay_task":true,"style":"border-color: #4A6169; color: #fddbc7 !important; background-color:#4A6169","data":[]},{"mode":false,"exist":true}]}},{"interface":{"occurences":[{"tick":0,"mode":true,"exist":true,"style":"border-color: #1b7837; color:#fddbc7 !important; background-color:#1b7837","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#328F4E","color:#fddbc7 !important; background-color:#1b7837","color:#fddbc7 !important; background-color:#075C21"],"disabled":true},"behavior":{"name":"CA"}},{"tick":0,"mode":true,"exist":true,"style":"border-color: #8c510a; color:#fddbc7 !important; background-color:#8c510a","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#AD6E24","color:#fddbc7 !important; background-color:#8c510a","color:#fddbc7 !important; background-color:#663700"],"exist":true,"disabled":true},"behavior":{"name":"Crie"}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #5ab4ac; color:#fddbc7 !important; background-color:#5ab4ac","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#89D4CF","color:#fddbc7 !important; background-color:#5ab4ac","color:#fddbc7 !important; background-color:#38968F"],"exist":false,"disabled":true}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #d73027; color:#fddbc7 !important; background-color:#d73027","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#E85850","color:#fddbc7 !important; background-color:#d73027","color:#fddbc7 !important; background-color:#AC1A12"],"exist":false,"disabled":true}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #B18B39; color:#fddbc7 !important; background-color:#B18B39","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#d8b365","color:#fddbc7 !important; background-color:#B18B39","color:#fddbc7 !important; background-color:#896517"],"exist":false,"disabled":true}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #01665e; color:#fddbc7 !important; background-color:#01665e","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#0C7B73","color:#fddbc7 !important; background-color:#01665e","color:#fddbc7 !important; background-color:#00504A"],"exist":false,"disabled":true}},{"mode":false,"exist":true},{"tick":0,"mode":true,"exist":false,"style":"border-color: undefined; color:#fddbc7 !important; background-color:undefined","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:undefined","color:#fddbc7 !important; background-color:undefined","color:#fddbc7 !important; background-color:undefined"],"exist":false,"disabled":true}}],"timers":[{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":false,"style":"border-color: #3288bd; color: #fddbc7 !important; background-color:#3288bd","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#53A0CD","color:#fddbc7 !important; background-color:#3288bd","color:#fddbc7 !important; background-color:#1175B0"],"exist":false,"disabled":true}},{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":false,"style":"border-color: #af8dc3; color: #fddbc7 !important; background-color:#af8dc3","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#D3BDE0","color:#fddbc7 !important; background-color:#af8dc3","color:#fddbc7 !important; background-color:#8A5FA3"],"exist":false,"disabled":true}},{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":false,"style":"border-color: #E56D33; color: #fddbc7 !important; background-color:#E56D33","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#fc8d59","color:#fddbc7 !important; background-color:#E56D33","color:#fddbc7 !important; background-color:#BC4B15"],"exist":false,"disabled":true}},{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":false,"style":"border-color: #d53e4f; color: #fddbc7 !important; background-color:#d53e4f","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#F06575","color:#fddbc7 !important; background-color:#d53e4f","color:#fddbc7 !important; background-color:#B91D2F"],"exist":false,"disabled":true}},{"mode":false,"exist":true}],"programs":[{"hour_tmp_d":"","hour_tmp_r":"","min_d":0,"sec_d":0,"msec_d":0,"min_r":0,"sec_r":0,"msec_r":0,"nb_s":0,"nb_g":0,"nb_n":0,"cumul_d":0,"avg_d":0,"cumul_r":0,"avg_r":0,"mode":true,"exist":true,"state_setpoint":0,"state_waiting":0,"disabled_ask_task":false,"disabled_resp_task":true,"disabled_time_delay_task":true,"style":"border-color: #4A6169; color: #fddbc7 !important; background-color:#4A6169","data":[],"behavior":{"name":"Tenir le stylo"}},{"hour_tmp_d":"","hour_tmp_r":"","min_d":0,"sec_d":0,"msec_d":0,"min_r":0,"sec_r":0,"msec_r":0,"nb_s":0,"nb_g":0,"nb_n":0,"cumul_d":0,"avg_d":0,"cumul_r":0,"avg_r":0,"mode":true,"exist":true,"state_setpoint":0,"state_waiting":0,"disabled_ask_task":false,"disabled_resp_task":true,"disabled_time_delay_task":true,"style":"border-color: #4A6169; color: #fddbc7 !important; background-color:#4A6169","data":[],"behavior":{"name":"Retourner la feuille"}},{"hour_tmp_d":"","hour_tmp_r":"","min_d":0,"sec_d":0,"msec_d":0,"min_r":0,"sec_r":0,"msec_r":0,"nb_s":0,"nb_g":0,"nb_n":0,"cumul_d":0,"avg_d":0,"cumul_r":0,"avg_r":0,"mode":true,"exist":false,"state_setpoint":0,"state_waiting":0,"disabled_ask_task":false,"disabled_resp_task":true,"disabled_time_delay_task":true,"style":"border-color: #4A6169; color: #fddbc7 !important; background-color:#4A6169","data":[]},{"mode":false,"exist":true}]}},{"interface":{"occurences":[{"tick":0,"mode":true,"exist":true,"style":"border-color: #1b7837; color:#fddbc7 !important; background-color:#1b7837","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#328F4E","color:#fddbc7 !important; background-color:#1b7837","color:#fddbc7 !important; background-color:#075C21"],"disabled":true},"behavior":{"name":"Range son stylo"}},{"tick":0,"mode":true,"exist":true,"style":"border-color: #8c510a; color:#fddbc7 !important; background-color:#8c510a","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#AD6E24","color:#fddbc7 !important; background-color:#8c510a","color:#fddbc7 !important; background-color:#663700"],"exist":true,"disabled":true},"behavior":{"name":"Crie"}},{"tick":0,"mode":true,"exist":true,"style":"border-color: #5ab4ac; color:#fddbc7 !important; background-color:#5ab4ac","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#89D4CF","color:#fddbc7 !important; background-color:#5ab4ac","color:#fddbc7 !important; background-color:#38968F"],"disabled":true},"behavior":{"name":"Se pince les doigts"}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #d73027; color:#fddbc7 !important; background-color:#d73027","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#E85850","color:#fddbc7 !important; background-color:#d73027","color:#fddbc7 !important; background-color:#AC1A12"],"exist":false,"disabled":true}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #B18B39; color:#fddbc7 !important; background-color:#B18B39","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#d8b365","color:#fddbc7 !important; background-color:#B18B39","color:#fddbc7 !important; background-color:#896517"],"exist":false,"disabled":true}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #01665e; color:#fddbc7 !important; background-color:#01665e","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#0C7B73","color:#fddbc7 !important; background-color:#01665e","color:#fddbc7 !important; background-color:#00504A"],"exist":false,"disabled":true}},{"mode":false,"exist":true},{"tick":0,"mode":true,"exist":false,"style":"border-color: undefined; color:#fddbc7 !important; background-color:undefined","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:undefined","color:#fddbc7 !important; background-color:undefined","color:#fddbc7 !important; background-color:undefined"],"exist":false,"disabled":true}}],"timers":[{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":true,"style":"border-color: #3288bd; color: #fddbc7 !important; background-color:#3288bd","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#53A0CD","color:#fddbc7 !important; background-color:#3288bd","color:#fddbc7 !important; background-color:#1175B0"],"disabled":true},"behavior":{"name":"Joue avec ses cheveux"}},{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":true,"style":"border-color: #af8dc3; color: #fddbc7 !important; background-color:#af8dc3","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#D3BDE0","color:#fddbc7 !important; background-color:#af8dc3","color:#fddbc7 !important; background-color:#8A5FA3"],"exist":true,"disabled":true},"behavior":{"name":"Me mord"}},{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":false,"style":"border-color: #E56D33; color: #fddbc7 !important; background-color:#E56D33","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#fc8d59","color:#fddbc7 !important; background-color:#E56D33","color:#fddbc7 !important; background-color:#BC4B15"],"exist":false,"disabled":true}},{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":false,"style":"border-color: #d53e4f; color: #fddbc7 !important; background-color:#d53e4f","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#F06575","color:#fddbc7 !important; background-color:#d53e4f","color:#fddbc7 !important; background-color:#B91D2F"],"exist":false,"disabled":true}},{"mode":false,"exist":true}],"programs":[{"hour_tmp_d":"","hour_tmp_r":"","min_d":0,"sec_d":0,"msec_d":0,"min_r":0,"sec_r":0,"msec_r":0,"nb_s":0,"nb_g":0,"nb_n":0,"cumul_d":0,"avg_d":0,"cumul_r":0,"avg_r":0,"mode":true,"exist":false,"state_setpoint":0,"state_waiting":0,"disabled_ask_task":false,"disabled_resp_task":true,"disabled_time_delay_task":true,"style":"border-color: #4A6169; color: #fddbc7 !important; background-color:#4A6169","data":[]},{"hour_tmp_d":"","hour_tmp_r":"","min_d":0,"sec_d":0,"msec_d":0,"min_r":0,"sec_r":0,"msec_r":0,"nb_s":0,"nb_g":0,"nb_n":0,"cumul_d":0,"avg_d":0,"cumul_r":0,"avg_r":0,"mode":true,"exist":false,"state_setpoint":0,"state_waiting":0,"disabled_ask_task":false,"disabled_resp_task":true,"disabled_time_delay_task":true,"style":"border-color: #4A6169; color: #fddbc7 !important; background-color:#4A6169","data":[]},{"hour_tmp_d":"","hour_tmp_r":"","min_d":0,"sec_d":0,"msec_d":0,"min_r":0,"sec_r":0,"msec_r":0,"nb_s":0,"nb_g":0,"nb_n":0,"cumul_d":0,"avg_d":0,"cumul_r":0,"avg_r":0,"mode":true,"exist":false,"state_setpoint":0,"state_waiting":0,"disabled_ask_task":false,"disabled_resp_task":true,"disabled_time_delay_task":true,"style":"border-color: #4A6169; color: #fddbc7 !important; background-color:#4A6169","data":[]},{"mode":false,"exist":true}]}},{"interface":{"occurences":[{"tick":0,"mode":true,"exist":true,"style":"border-color: #1b7837; color:#fddbc7 !important; background-color:#1b7837","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#328F4E","color:#fddbc7 !important; background-color:#1b7837","color:#fddbc7 !important; background-color:#075C21"],"disabled":true},"behavior":{"name":"Jet d'objets"}},{"tick":0,"mode":true,"exist":true,"style":"border-color: #8c510a; color:#fddbc7 !important; background-color:#8c510a","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#AD6E24","color:#fddbc7 !important; background-color:#8c510a","color:#fddbc7 !important; background-color:#663700"],"exist":true,"disabled":true},"behavior":{"name":"Crie"}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #5ab4ac; color:#fddbc7 !important; background-color:#5ab4ac","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#89D4CF","color:#fddbc7 !important; background-color:#5ab4ac","color:#fddbc7 !important; background-color:#38968F"],"exist":false,"disabled":true}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #d73027; color:#fddbc7 !important; background-color:#d73027","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#E85850","color:#fddbc7 !important; background-color:#d73027","color:#fddbc7 !important; background-color:#AC1A12"],"exist":false,"disabled":true}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #B18B39; color:#fddbc7 !important; background-color:#B18B39","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#d8b365","color:#fddbc7 !important; background-color:#B18B39","color:#fddbc7 !important; background-color:#896517"],"exist":false,"disabled":true}},{"tick":0,"mode":true,"exist":false,"style":"border-color: #01665e; color:#fddbc7 !important; background-color:#01665e","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#0C7B73","color:#fddbc7 !important; background-color:#01665e","color:#fddbc7 !important; background-color:#00504A"],"exist":false,"disabled":true}},{"mode":false,"exist":true},{"tick":0,"mode":true,"exist":false,"style":"border-color: undefined; color:#fddbc7 !important; background-color:undefined","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:undefined","color:#fddbc7 !important; background-color:undefined","color:#fddbc7 !important; background-color:undefined"],"exist":false,"disabled":true}}],"timers":[{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":true,"style":"border-color: #3288bd; color: #fddbc7 !important; background-color:#3288bd","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#53A0CD","color:#fddbc7 !important; background-color:#3288bd","color:#fddbc7 !important; background-color:#1175B0"],"disabled":true},"behavior":{"name":"Lâcher le crayon"}},{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":false,"style":"border-color: #af8dc3; color: #fddbc7 !important; background-color:#af8dc3","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#D3BDE0","color:#fddbc7 !important; background-color:#af8dc3","color:#fddbc7 !important; background-color:#8A5FA3"],"exist":false,"disabled":true}},{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":false,"style":"border-color: #E56D33; color: #fddbc7 !important; background-color:#E56D33","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#fc8d59","color:#fddbc7 !important; background-color:#E56D33","color:#fddbc7 !important; background-color:#BC4B15"],"exist":false,"disabled":true}},{"hourTmp":"","min":0,"sec":0,"msec":0,"occurrences":0,"mode":true,"exist":false,"style":"border-color: #d53e4f; color: #fddbc7 !important; background-color:#d53e4f","data":[],"likert":{"legend":["Low","Medium","High"],"style":["color:#fddbc7 !important; background-color:#F06575","color:#fddbc7 !important; background-color:#d53e4f","color:#fddbc7 !important; background-color:#B91D2F"],"exist":false,"disabled":true}},{"mode":false,"exist":true}],"programs":[{"hour_tmp_d":"","hour_tmp_r":"","min_d":0,"sec_d":0,"msec_d":0,"min_r":0,"sec_r":0,"msec_r":0,"nb_s":0,"nb_g":0,"nb_n":0,"cumul_d":0,"avg_d":0,"cumul_r":0,"avg_r":0,"mode":true,"exist":true,"state_setpoint":0,"state_waiting":0,"disabled_ask_task":false,"disabled_resp_task":true,"disabled_time_delay_task":true,"style":"border-color: #4A6169; color: #fddbc7 !important; background-color:#4A6169","data":[],"behavior":{"name":"Dessiner un bonhomme"}},{"hour_tmp_d":"","hour_tmp_r":"","min_d":0,"sec_d":0,"msec_d":0,"min_r":0,"sec_r":0,"msec_r":0,"nb_s":0,"nb_g":0,"nb_n":0,"cumul_d":0,"avg_d":0,"cumul_r":0,"avg_r":0,"mode":true,"exist":false,"state_setpoint":0,"state_waiting":0,"disabled_ask_task":false,"disabled_resp_task":true,"disabled_time_delay_task":true,"style":"border-color: #4A6169; color: #fddbc7 !important; background-color:#4A6169","data":[]},{"hour_tmp_d":"","hour_tmp_r":"","min_d":0,"sec_d":0,"msec_d":0,"min_r":0,"sec_r":0,"msec_r":0,"nb_s":0,"nb_g":0,"nb_n":0,"cumul_d":0,"avg_d":0,"cumul_r":0,"avg_r":0,"mode":true,"exist":false,"state_setpoint":0,"state_waiting":0,"disabled_ask_task":false,"disabled_resp_task":true,"disabled_time_delay_task":true,"style":"border-color: #4A6169; color: #fddbc7 !important; background-color:#4A6169","data":[]},{"mode":false,"exist":true}]}}];
        $scope.history.builded = false;
    }

    initHistory();

    $scope.zeroInit = function(dat)
    {
        return converter.zeroInit(dat);
    }

    $scope.saveInterface = function()
    {
        $scope.history.interfaces.push({
            'interface': {
                'occurences' : $scope.interface.occurences,
                'timers' : $scope.interface.timers,
                'programs' : $scope.interface.programs
            }
        });
        tempsave.exe($scope.history.interfaces);
    }

    $rootScope.$on("$stateChangeStart", function (event, to_state, to_params, from_state, from_params) 
    {
        // console.log('To state : '+to_state.name);
        if(to_state.name=="home")
          {
                $scope.header_home = true;
                $scope.header_alterable = false;
                $scope.header_interface = false;
                $scope.header_history = false;
                $scope.header_prepare = false;
                $scope.header_tasks = false;
                initHome();
          }        
          else if(to_state.name=="alterable")
          {
                $scope.header_home = false;
                $scope.header_alterable = true;
                $scope.header_interface = false;
                $scope.header_history = false;
                $scope.header_prepare = false;
                $scope.header_tasks = false;
                initAlterable();
          }
          else if(to_state.name=="tabs.interface")
          {
                $scope.header_home = false;
                $scope.header_alterable = false;
                $scope.header_interface = true;
                $scope.header_prepare = false;
                $scope.header_history = false;
                $scope.header_tasks = false;
                //initInterface();
          }
          else if(to_state.name=="history")
          {
                $scope.header_home = false;
                $scope.header_alterable = false;
                $scope.header_interface = false;
                $scope.header_prepare = false;
                $scope.header_history = true;
                $scope.header_tasks = false;
                $rootScope.$broadcast('build_history');
                //initHistory();
          }
          else if(to_state.name=="tasks")
          {
                $scope.header_home = false;
                $scope.header_alterable = false;
                $scope.header_interface = false;
                $scope.header_prepare = false;
                $scope.header_history = false;
                $scope.header_tasks = true;
                //initHistory();
          }

        /*else if(to_state.name!="contenu.register" && to_state.name!="contenu.login")
        {
          //Sécurité, doit être log pour entrer.
            event.preventDefault();
            $state.transitionTo('contenu.login');
        }
        console.log("Changement d'état : de "+from_state.name+" à "+to_state.name);*/
    });

});