$(document).ready(function() {
    document.getElementsByTagName("html")[0].style.visibility = "visible";
});

function smushPage() {
    const accountStatsDiv = document.getElementById('account-stats');
    const everythingDiv = document.getElementById('everything');
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const accountInfoDiv = document.getElementById('account-info');
    const navbar = document.getElementById('navbar');
    const footer = document.getElementById('footer');
    const statsRankDiv = document.getElementById('stats-rank');
    const rankBarsDiv = document.getElementsByClassName('rank-bars');
    const rankNewbieDiv = document.getElementById('rank-newbie');
    const rankPictureDiv = document.getElementsByClassName('rank-picture');
    const anonymousBoxDiv = document.getElementById('anonymous-box');
    const anonymousTitleDiv = document.getElementById('anonymous-title');
    const anonymousDescriptionDiv = document.getElementById('anonymous-description');
    const anonymousToggleDiv = document.getElementById('anonymous-toggle');
    const leftStatsBoxDiv = document.getElementById('left-stats-box');
    const leftStatsBoxTitleDiv = document.getElementById('left-stats-box-title');
    const progressBoxDiv = document.getElementById('progress-box');
    const progressBoxTitleDiv = document.getElementById('progress-box-title');
    const progressStatsDiv = document.getElementById('progress-stats');
    const leftStatsDiv = document.getElementById('left-stats');
    const rightStatsDiv = document.getElementById('right-stats');

    if(window.innerWidth > 800) {
        leftStatsDiv.style.height = "100%";
        rightStatsDiv.style.height = "100%";
        progressStatsDiv.style.height = "100%";
        anonymousBoxDiv.style.height = "100%";
        leftStatsBoxDiv.style.height = "100%";

        everythingDiv.style.height = vh-navbar.offsetHeight-footer.offsetHeight + "px";
        accountStatsDiv.style.height = everythingDiv.offsetHeight - accountInfoDiv.offsetHeight + "px";
        statsRankDiv.style.height = leftStatsBoxDiv.offsetHeight - leftStatsBoxTitleDiv.offsetHeight + "px";
        for (var i = 0; i < rankPictureDiv.length; i++) {
            rankPictureDiv[i].style.width = rankNewbieDiv.offsetHeight + "px";
            rankBarsDiv[i].style.width = statsRankDiv.offsetWidth - rankPictureDiv[i].offsetWidth -2 + "px";
        }
        anonymousDescriptionDiv.style.height = anonymousBoxDiv.offsetHeight - anonymousTitleDiv.offsetHeight - anonymousToggleDiv.offsetHeight -6 + "px";
        progressStatsDiv.style.height = progressBoxDiv.offsetHeight - progressBoxTitleDiv.offsetHeight + -6 +"px";
    } else {
        accountStatsDiv.style.height = "auto";
        progressStatsDiv.style.height = "auto";
        anonymousBoxDiv.style.height = "auto";
        anonymousDescriptionDiv.style.height = "auto";
        everythingDiv.style.height = "auto";
        rightStatsDiv.style.height = "auto";
        leftStatsDiv.style.height = "auto";
        leftStatsBoxDiv.style.height = "25rem";
        leftStatsBoxTitleDiv.style.height = "auto";

        statsRankDiv.style.height = leftStatsBoxDiv.offsetHeight - leftStatsBoxTitleDiv.offsetHeight + "px";
        const rankPictureDiv = document.getElementsByClassName('rank-picture');
        const rankBarsDiv = document.getElementsByClassName('rank-bars');
        for (var i = 0; i < rankPictureDiv.length; i++) {
            rankPictureDiv[i].style.width = rankNewbieDiv.offsetHeight + "px";
            rankBarsDiv[i].style.width = statsRankDiv.offsetWidth - rankPictureDiv[i].offsetWidth -2 + "px";
        }

    }
}

window.addEventListener('resize', function(event) {
    smushPage();
});

function loadStuff(u) {
    user = JSON.parse(u);
    document.getElementById('account-image').src = user.imgLink;
    if(user.anonymous) {
        document.getElementById('anonymous-checkbox').checked = true;
    }
    const total = calculatePoints(user);
    document.getElementById('score-score').innerHTML = total+1;
    displayScore(total);
    smushPage();
}

function displayScore(total) {
    const apprenticeBar = document.getElementById('bars-inner-apprentice');
    const masterBar = document.getElementById('bars-inner-master');
    const veteranBar = document.getElementById('bars-inner-veteran');
    const apprenticeNumber = document.getElementById('apprentice-bars-number');
    const masterNumber = document.getElementById('master-bars-number');
    const veteranNumber = document.getElementById('veteran-bars-number');
    const newbiePicture = document.getElementById('newbie-logo');
    const apprenticePicture = document.getElementById('apprentice-logo');
    const masterPicture = document.getElementById('master-logo');
    const veteranPicture = document.getElementById('veteran-logo');
    if(total > 1500) {
        $('#bars-inner-newbie').animate({ width: "100%" }, 400);
        setTimeout(function() { 
            newbiePicture.src = "/images/newbie-color.png";
            $('#bars-inner-apprentice').animate({ width: "100%" }, 400);
        }, 400);
        setTimeout(function() { 
            apprenticePicture.src = "/images/apprentice-color.png";
            $('#bars-inner-master').animate({ width: "100%" }, 400);
        }, 800);
        setTimeout(function() { 
            masterPicture.src = "/images/master-color.png";
            $('#bars-inner-veteran').animate({ width: "100%" }, 400);
        }, 1200);
        setTimeout(function() { 
            veteranPicture.src = "/images/master-color.png";
        }, 1600);
        apprenticeNumber.innerHTML = "100 / 100";
        masterNumber.innerHTML = "400 / 400";
        veteranNumber.innerHTML = "1000 / 1000";

    } else if(total > 500) {
        $('#bars-inner-newbie').animate({ width: "100%" }, 400);
        setTimeout(function() { 
            newbiePicture.src = "/images/newbie-color.png";
            $('#bars-inner-apprentice').animate({ width: "100%" }, 400);
        }, 400);
        setTimeout(function() { 
            apprenticePicture.src = "/images/apprentice-color.png";
            $('#bars-inner-master').animate({ width: "100%" }, 400);
        }, 800);
        setTimeout(function() { 
            masterPicture.src = "/images/master-color.png";
            $('#bars-inner-veteran').animate({ width: (total-500)/10 + "%" }, 400);
        }, 1200);
        if(total == 1500) {
            setTimeout(function() {
                veteranPicture.src = "/images/master-color.png";
            }, 1600);
        }
        apprenticeNumber.innerHTML = "100 / 100";
        masterNumber.innerHTML = "400 / 400";
        veteranNumber.innerHTML = total-500 + " / 1000";
    } else if(total > 100) {
        $('#bars-inner-newbie').animate({ width: "100%" }, 400);
        setTimeout(function() { 
            newbiePicture.src = "/images/newbie-color.png";
            $('#bars-inner-apprentice').animate({ width: "100%" }, 400);
        }, 400);
        setTimeout(function() { 
            apprenticePicture.src = "/images/apprentice-color.png";
            $('#bars-inner-master').animate({ width: (total-100)/4 +"%" }, 400);
        }, 800);
        if(total == 500) {
            setTimeout(function() { 
                masterPicture.src = "/images/master-color.png";
            }, 1200);
        }
        apprenticeNumber.innerHTML = "100 / 100";
        masterNumber.innerHTML = (total-100) + " / 400";
    } else {
        $('#bars-inner-newbie').animate({ width: "100%" }, 400);
        setTimeout(function() { 
            newbiePicture.src = "/images/newbie-color.png";
            $('#bars-inner-apprentice').animate({ width: total + "%" }, 400);
        }, 400);
        if(total == 100) {
            setTimeout(function() { 
                apprenticePicture.src = "/images/apprentice-color.png";
            }, 800);
        }
        apprenticeNumber.innerHTML = total + " / 100";
    }
}

function calculatePoints(user) {
    var reviewsPoints;
    var upvotesGivenPoints;
    var upvotesReceivedPoints;
    if(user.reviews > 25) {
        reviewsPoints = 1250;
    } else {
        reviewsPoints = user.reviews*50;
    }
    if(user.upvotesGiven > 25) {
        upvotesGivenPoints = 50;
    } else {
        upvotesGivenPoints = user.upvotesGiven*2;
    }
    upvotesReceivedPoints = user.upvotesReceived*20;
    return reviewsPoints + upvotesGivenPoints + upvotesReceivedPoints;
}

function submitAnonymousForm() {
    const hidden = document.getElementById('anonymous-hidden');
    if(document.getElementById('anonymous-checkbox').checked) {
        hidden.value = "on"
        document.getElementById('anonymous-anonymous').innerHTML = "On";
    } else {
        hidden.value = "off";
        document.getElementById('anonymous-anonymous').innerHTML = "Off";
    }
    document.getElementById('anonymous-form').submit();
}