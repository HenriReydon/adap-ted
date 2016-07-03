app.factory('converter', function($http, $rootScope)
{
    var reader = {};

    reader.zeroInit = function(num)
    {
        return (num < 10) ? "0"+num : ""+num;
    }

    reader.getCurrentDate = function(){
        var d = new Date();
        var m = ((d.getMonth()+1) < 10) ? "0"+(d.getMonth()+1) : (d.getMonth()+1);
        var j = (d.getDate() < 10) ? "0"+d.getDate() : d.getDate();
        return d.getFullYear()+"-"+m+"-"+j;
    }

    reader.getDateInSeconds = function(currentDate, hour)
    {
            var datecourant = currentDate.split('-');
            tstp = new Date(
                        datecourant[0], 
                        datecourant[1]-1, 
                        datecourant[2], 
                        hour.substr(0, 2),
                        hour.substr(3, 2),
                        hour.substr(6, 2)
                        );
            return (tstp.getTime()/1000);
    }

    reader.getTimerInSeconds = function(timer)
    {
        return (1+parseInt(timer.split(':')[0])*60+parseInt(timer.split(':')[1]));
    }

    reader.getHour = function()
    {
        var d = new Date();
        var h = ('0'+d.getHours()).slice(-2);
        var m = ('0'+d.getMinutes()).slice(-2);
        var s = ('0'+d.getSeconds()).slice(-2);        
        return h+":"+m+":"+s
    }

    reader.setCharAt = function(str,index,chr)
    {
        if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);        
    }    

    return reader;
});