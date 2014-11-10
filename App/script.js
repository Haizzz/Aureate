$(document).ready(
    function() {
        require('nw.gui').Window.get().showDevTools();
        var started = false;
        var trigger = false;
        var time = new Date();
        var hour,minute,hleft,mleft,total,alarm,remain;
        $("#getTime").pickatime();
        $("#close").click(
            function() {
                $("#start").animate({marginLeft:420}, 100);
                $("#start").animate({width:50}, 100);
                $("#start").animate({height:50}, 100);
                $("#start").animate({marginTop:30}, 100);
                $("#start").animate({borderRadius:"100%"}, 0);
                started = false;
                $("#start").html("");
                window.setTimeout(function(){$("#start").css("background", " url(arrow-right.png) no-repeat center #27ae60")},200);
                hour = minute = hleft = mleft = total = 0;
                window.clearTimeout(alarm);
                console.log("timeout cleared");
                $("#close").css("z-index", "0");
                $("#remaining").css("opacity", "0");
        })
        function displayTime() {
            if (mleft >= 1) {
                mleft = mleft - 1;
            } else if (mleft == 0 && hleft >= 1) {
                mleft = 60;
                hleft = hleft - 1;
            }
        }
        function countDown() {
            alarm = window.setTimeout(function(){
                trigger = true;
                timeUp();
            },total)
        }
        function timeUp() {
            $("audio").get(0).play();
            window.clearInterval(remain);
        }
        function timeLeft() {
            if (time.getHours() > hour) {
                console.log(time.getHours());
                hleft = (hour + 12) - (time.getHours()-12);
                console.log(hleft);
                if (time.getMinutes() > minute) {
                    mleft = 60 - time.getMinutes() + minute;
                } else if(time.getMinutes() < minute) {
                    mleft = minute - time.getMinutes();
                }
                console.log(hleft + "       " + mleft);
            } else if (time.getHours < hour) {
                hleft = hour - time.getHours();
                if (time.getMinutes() > minute) {
                    mleft = 60 - time.getMinutes() + minute;
                } else if(time.getMinutes() < minute) {
                    mleft = minute - time.getMinutes();
                }
                console.log(hleft + "       " + mleft);
            } else if (time.getHours() == hour) {
                hleft = 0;
                if (time.getMinutes() > minute) {
                    mleft = 60 - time.getMinutes() + minute;
                } else if(time.getMinutes() < minute) {
                    mleft = minute - time.getMinutes();
                }
                console.log(hleft + "       " + mleft);
            }
            total = hleft*360*1000 + mleft*60*1000 - time.getSeconds()*1000; 
            console.log(total);
        }
        function extract() {
            if ($("#getTime").val().substring(6,8) == "AM" && $("#getTime").val().length == 8 ) {
            console.log($("#getTime").val());
            console.log("8 characters");
            hour = parseInt($("#getTime").val().substring(0,2));
            minute = parseInt($("#getTime").val().substring(3,5));
            console.log(hour);
            console.log(minute);
            } else if ($("#getTime").val().length == 7 && $("#getTime").val().substring(5,7) == "AM") {
                console.log("7 characters");
                hour = parseInt($("#getTime").val().substr(0,1));
                minute = parseInt($("#getTime").val().substring(2,4));
                console.log(hour);
                console.log(minute);
            } else if ($("#getTime").val().substring(6,8) == "PM" && $("#getTime").val().length == 8  ) {
                console.log($("#getTime").val());
                console.log("8 characters");
                hour = parseInt($("#getTime").val().substring(0,2)) + 12;
                minute = parseInt($("#getTime").val().substring(3,5));
                console.log(hour);
                console.log(minute);
            } else if ($("#getTime").val().length == 7 && $("#getTime").val().substring(5,7) == "PM") {
                console.log("7 characters");
                hour = parseInt($("#getTime").val().substr(0,1)) + 12;
                minute = parseInt($("#getTime").val().substring(2,4));
                console.log(hour);
                console.log(minute);
            }
            timeLeft();
            countDown();
        }
        $("#start").click(
            function() {
                if(started == false) {
                    $(this).animate({marginTop:-20,},{queue:false},100);
                    $(this).animate({marginLeft:390,},{queue:false},100);
                    $(this).animate({height:150,},{queue:false},100);
                    $(this).animate({width:150,},{queue:false},100);
                    $(this).css("background-image", "none");
                    window.setTimeout(function(){
                        $("#start").animate({borderRadius:0}, 0);
                        $("#start").animate({width:500}, 100);
                        $("#start").animate({marginLeft:0}, 100);
                        $("#start").animate({marginTop:0}, 0);
                        $("#start").animate({height:110}, 0);
                    },300);
                    window.setTimeout(function(){$("#start").html($("#getTime").val());}, 800);
                    started = true;
                    extract();
                    $("#close").css("z-index", "10");
                    $("#remaining").css("opacity", "1");
                    $("#remaining").html(hleft + " hours and " + mleft + " minutes left");
                    remain = window.setInterval(function() {
                        displayTime();
                        $("#remaining").html(hleft + " hours and " + mleft + " minutes left");
                        console.log("display");
                    },60000);
                } else if (started == true && trigger == true) {
                    total = 60*1000;
                    mleft++;
                    console.log("added one minute to timer");
                    countDown();
                    $("#remaining").html(hleft + " hours and " + mleft + " minutes left");
                }
        })
}) 