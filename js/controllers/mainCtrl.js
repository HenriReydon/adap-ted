/*
* 
* 
* 
*/

app.controller('mainCtrl', function($scope, $ionicPopup, $timeout, $state,
                                 $rootScope, randomize, colors, behaviors, converter)
{
    //initHome();
    function initHome()
    {
        //Header buttons
        $scope.codeInterface = {text: ''};
        $scope.tmpTask = [];
        $scope.parameters = 
        {
            'displayUL': false,
            'activateValid': false,
            'programOK': false,
            'programNotOK': false,
            'loadPgm': true,
            'disabledAskLearning': false,
            'disabledRespLearning': true,
            'disabledTimeDelayLearning': true,
            'disabledAskLearned': false,
            'disabledRespLearned': true,
            'disabledTimeDelayLearned': true,
            'disabledTask': true,
            'disabledLaunchTask': false,
            'showSelectKids': false,
            'ispaddisabled': false,
            'team_color' : "",
            'disabledRefButton': true,
            'colorCodeBorder' : 'border:none;',
            'isokdisabled': true,
            'indexApp': 0,
            'indexMai': 0,
            'heightOccurences' : Math.round(window.innerHeight*18/100),
            'heightMinuteurs' : Math.round(window.innerHeight*8/100),
            'heightPgm' : Math.round(window.innerHeight*40/100)
        };

        $scope.french = 
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
            "b_ask_setpoint": "Poser la consigne",
            "b_learn_alone": "Seul",
            "b_learn_guided": "Guidé",
            "b_ask_waiting": "Attente de la réponse",
            "b_launch": "Commencer",
            "b_continue": "Reprendre",

            "h_occurences": "Occurrences",
            "h_timers": "Minuteurs",
            "h_learning": "Apprentissage",
            "h_learn_alone": "seul",
            "h_learn_guided": "guidé",
            "h_learned": "Acquis/Maintien",
            "h_reaction_avg": "Temps de réaction moyen :",
            "h_realisation_avg": "Temps de réalisation moyen :",
            "h_prepare" : "Entrez le code de votre équipe",
            "h_placeholder_prepare" : "Code (ex. 01234)",
            "h_history" : "Historique",
            "h_warning" : "CIBO dit : ",
            "h_usage" : "UTILISATIONS",
            "h_tasks": "Analyses de tâches",

            "m_about" : "Données non-synchronisées !",
            "m_history" : "Réutiliser une interface.",
            "m_new_interface" : "Créer une nouvelle interface ?",    
            "m_logged_out" : "Vous n'êtes pas connecté.",  
            "m_no_network" : '"Internet non connecté."',        
            "m_bulle_add_behavior": "Associer un comportement à ce bouton."
        };
        $scope.english = 
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
            "b_ask_setpoint": "Ask the setpoint",
            "b_learn_alone": "Alone",
            "b_learn_guided": "Guided", 
            "b_ask_waiting": "Waiting for response",
            "b_launch": "Begin",
            "b_continue": "Continue",

            "h_occurences": "Occurrences",
            "h_timers": "Timers",
            "h_learning": "Learning",
            "h_learned": "Learned",
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

            "m_about" : "Data not synchronized !",
            "m_history" : "Reuse an interface.",
            "m_new_interface" : "Create a new interface ?", 
            "m_logged_out" : "You're not connected.", 
            "m_no_network" : '"Internet not connected."',         
            "m_bulle_add_behavior": "Associate a behavior to this button."
        };       
        $scope.texts = $scope.english;
        clearData();

        $scope.setLangage = function(langue)
        {
            $scope.texts = eval("$scope."+langue);
        }

        $scope.openLeft = function()
        {
            $rootScope.$broadcast('openLeft');
        }

        $scope.openRight = function()
        {
            $rootScope.$broadcast('openRight');
        }     
        $scope.goToTasks = function()
        {
            $state.go("tasks");
        }        
    }

    function clearData()
    {
            $scope.occurences = [];
            $scope.minuteurs = [];
            $scope.maintiens = [];
            $scope.apprentissages = [];
            $scope.tasks = [];

            $scope.preparation = {};
            $scope.preparation.sit = [];
            $scope.preparation.kids = [];

            $scope.behavior = {};
    }

    function initPrepare()
    {
        $scope.preparation.team_code = "";
        $scope.parameters.ispaddisabled = false;
        $scope.parameters.showSelectKids = false;
        $scope.preparation.halfpads1 = [];
        $scope.preparation.halfpads2 = [];
        $scope.preparation.kids = [];
        $scope.preparation.team = {};

        var pads = [];
        for(var i=0; i<=9; i++)
        {
            pads.push({num:i});
        }
        randomize.exe(pads);

        $scope.preparation.halfpads1 = pads.slice(0,5);
        $scope.preparation.halfpads2 = pads.slice(5,10);
    }

    function initAlterable()
    {
        $scope.occurences = [];
        $scope.minuteurs = [];
        $scope.maintiens = [];
        $scope.apprentissages = [];
        behaviors.exe();
    }

    function initHistory()
    {
        $scope.history = {};
        $scope.history.interfaces = [];
        $scope.history.builded = false;
    }

    initHistory();

    $scope.zeroInit = function(dat)
    {
        return converter.zeroInit(dat);
    } 
    $scope.$on('programm_received', function(event, programm)
    {

        for(var d in programm.app)
        {
        /************************ ATTENTION ********************************
         ***    ATTENTION A GERER LES CAS OU LES PROGRAMMES SONT VIDE    ***
         ******************************************************************/               
            $scope.apprentissages.push({
                "infos": programm.app[d],
                "hourTmpD":"",
                "hourTmpR":"", 
                "minD":0, "secD":0, "msecD":0, "timerD": undefined,
                "minR":0, "secR":0, "msecR":0, "timerR": undefined,
                "nbS": 0, "nbG": 0, "nbN": 0, "cumulD":0, "avgD": 0, "cumulR":0, "avgR": 0,
                "data": []
                });
        }

        for(var d in programm.mai)
        {
            $scope.maintiens.push({
                "infos": programm.mai[d], 
                "hourTmpD":"",
                "hourTmpR":"",                 
                "minD":0, "secD":0, "msecD":0, "timerD": undefined,
                "minR":0, "secR":0, "msecR":0, "timerD": undefined,
                "nbS": 0, "nbG": 0, "nbN": 0, "cumulD":0, "avgD": 0, "cumulR":0, "avgR": 0,
                "data": []
                });            
        }
       
        $scope.parameters.disabledAskLearning = ($scope.apprentissages[$scope.parameters.indexApp].infos.id == 0);
        $scope.parameters.disabledAskLearned = ($scope.maintiens[$scope.parameters.indexMai].infos.id == 0);
    }); 

    $scope.$on('tasks_received', function(event, tasks)
    {
        for(var d in tasks)
        {
            $scope.tasks.push(tasks[d]);
        }
    });

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) 
    {
        // console.log('To state : '+toState.name);
        if(toState.name=="home")
          {
                $scope.header_home = true;
                $scope.header_alterable = false;
                $scope.header_interface = false;
                $scope.header_history = false;
                $scope.header_prepare = false;
                $scope.header_tasks = false;
                initHome();
          }        
          else if(toState.name=="alterable")
          {
                $scope.header_home = false;
                $scope.header_alterable = true;
                $scope.header_interface = false;
                $scope.header_history = false;
                $scope.header_prepare = false;
                $scope.header_tasks = false;
                initAlterable();
          }
          else if(toState.name=="tabs.interface")
          {
                $scope.header_home = false;
                $scope.header_alterable = false;
                $scope.header_interface = true;
                $scope.header_prepare = false;
                $scope.header_history = false;
                $scope.header_tasks = false;
                //initInterface();
          }
          else if(toState.name=="prepare")
          {
                $scope.header_home = false;
                $scope.header_alterable = false;
                $scope.header_interface = false;
                $scope.header_history = false;
                $scope.header_prepare = true;
                $scope.header_tasks = false;
                initPrepare();
          }
          else if(toState.name=="history")
          {
                $scope.header_home = false;
                $scope.header_alterable = false;
                $scope.header_interface = false;
                $scope.header_prepare = false;
                $scope.header_history = true;
                $scope.header_tasks = false;
                //initHistory();
          }
          else if(toState.name=="tasks")
          {
                $scope.header_home = false;
                $scope.header_alterable = false;
                $scope.header_interface = false;
                $scope.header_prepare = false;
                $scope.header_history = false;
                $scope.header_tasks = true;
                //initHistory();
          }

        /*else if(toState.name!="contenu.register" && toState.name!="contenu.login")
        {
          //Sécurité, doit être log pour entrer.
            event.preventDefault();
            $state.transitionTo('contenu.login');
        }
        console.log("Changement d'état : de "+fromState.name+" à "+toState.name);*/
    });

});