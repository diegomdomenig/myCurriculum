window.onresize = changeTemplateColumns;

function changeTemplateColumns() {
    if(window.innerWidth > 1300) {
        document.getElementById("boxes-grid-container").style.gridTemplateAreas = '"math english arts" "science languages history" "classics computer placeholder"'
    } else if(window.innerWidth > 750) {
        document.getElementById("boxes-grid-container").style.gridTemplateAreas = '"math english" "arts science" "languages history" "classics computer"'
    } else {
        document.getElementById("boxes-grid-container").style.gridTemplateAreas = '"math" "english" "arts" "science" "languages" "history" "classics" "computer"'
    }
}

function showMathHidden() {
    if(window.innerWidth > 1300) {
        document.getElementById('math-hidden').style.width = "31vw";
        $("#math-hidden").css({ left: 0 });
        $("#english-container").hide();
        $('#math-hidden').show();
        $("#math-hidden").animate({ "left": "27.3vw" }, 150);
    } else if(window.innerWidth > 750) {
        document.getElementById('math-hidden').style.width = "45vw";
        $("#math-hidden").css({ left: 0 });
        $("#english-container").hide();
        $('#math-hidden').show();
        $("#math-hidden").animate({ "left": "42vw" }, 150);
    }  
}

function hideMathHidden() {
    if(window.innerWidth > 1300) {
        $("#math-hidden").css({ left: 0 });
        $("#math-hidden").hide();
        $("#english-container").show();
    } else if(window.innerWidth > 750) {
        $("#math-hidden").css({ left: 0 });
        $("#math-hidden").hide();
        $("#english-container").show();
    }
}

function showEnglishHidden() {
    if(window.innerWidth > 1300) {
        document.getElementById('english-hidden').style.width = "31vw";
        $("#english-hidden").css({ left: 0 });
        $("#arts-container").hide();
        $('#math-container').show();
        $('#english-hidden').show();
        $("#english-hidden").animate({ "left": "+=27.3vw" }, 150);
    } else if (window.innerWidth > 750) {
        document.getElementById('english-hidden').style.width = "45vw";
        $("#english-hidden").css({ left: "-3vw" });
        $("#math-container").hide();
        $('#english-hidden').show();
        $("#english-hidden").animate({ "left": "-43.7vw" }, 150);
    }
}

function hideEnglishHidden() {
    if(window.innerWidth > 1300) {
        $("#english-hidden").css({ left: 0 });
        $("#english-hidden").hide();
        $("#arts-container").show();
        $("#math-container").show();
    } else if(window.innerWidth > 750) {
        $("#english-hidden").css({ left: 0 });
        $("#english-hidden").hide();
        $("#math-container").show();
    }
}

function showArtsHidden() {
    if(window.innerWidth > 1300) {
        document.getElementById('arts-hidden').style.width = "31vw";
        $("#arts-hidden").css({ left: "-3vw" });
        $("#english-container").hide();
        $('#math-container').show();
        $('#arts-hidden').show();
        $("#arts-hidden").animate({ "left": "-30.2vw" }, 150);
    } else if (window.innerWidth > 750) {
        document.getElementById('arts-hidden').style.width = "45vw";
        $("#arts-hidden").css({ left: 0 });
        $("#science-container").hide();
        $('#arts-hidden').show();
        $("#arts-hidden").animate({ "left": "42vw" }, 150);
    }
}

function hideArtsHidden() {
    if(window.innerWidth > 1300) {
        $("#arts-hidden").css({ left: 0 });
        $("#arts-hidden").hide();
        $("#english-container").show();
        $("#math-container").show();
    } else if(window.innerWidth > 750) {
        $("#arts-hidden").css({ left: 0 });
        $("#arts-hidden").hide();
        $("#science-container").show();
    }
}

function showScienceHidden() {
    if(window.innerWidth > 1300) {
        document.getElementById('science-hidden').style.width = "31vw";
        $("#science-hidden").css({ left: 0 });
        $("#languages-container").hide();
        $('#science-hidden').show();
        $("#science-hidden").animate({ "left": "27.3vw" }, 150);
    } else if(window.innerWidth > 750) {
        document.getElementById('science-hidden').style.width = "45vw";
        $("#science-hidden").css({ left: "-3vw" });
        $("#arts-container").hide();
        $('#science-hidden').show();
        $("#science-hidden").animate({ "left": "-43.7vw" }, 150);
    }  
}

function hideScienceHidden() {
    if(window.innerWidth > 1300) {
        $("#science-hidden").css({ left: 0 });
        $("#science-hidden").hide();
        $("#languages-container").show();
    } else if(window.innerWidth > 750) {
        $("#science-hidden").css({ left: 0 });
        $("#science-hidden").hide();
        $("#arts-container").show();
    }
}

function showLanguagesHidden() {
    if(window.innerWidth > 1300) {
        document.getElementById('languages-hidden').style.width = "31vw";
        $("#languages-hidden").css({ left: 0 });
        $("#history-container").hide();
        $('#languages-hidden').show();
        $("#languages-hidden").animate({ "left": "27.3vw" }, 150);
    } else if(window.innerWidth > 750) {
        document.getElementById('languages-hidden').style.width = "45vw";
        $("#languages-hidden").css({ left: 0 });
        $("#history-container").hide();
        $('#languages-hidden').show();
        $("#languages-hidden").animate({ "left": "42vw" }, 150);
    }  
}

function hideLanguagesHidden() {
    if(window.innerWidth > 1300) {
        $("#languages-hidden").css({ left: 0 });
        $("#languages-hidden").hide();
        $("#history-container").show();
    } else if(window.innerWidth > 750) {
        $("#languages-hidden").css({ left: 0 });
        $("#languages-hidden").hide();
        $("#history-container").show();
    }
}

function showHistoryHidden() {
    if(window.innerWidth > 1300) {
        document.getElementById('history-hidden').style.width = "31vw";
        $("#history-hidden").css({ left: "-3vw" });
        $("#languages-container").hide();
        $('#science-container').show();
        $('#history-hidden').show();
        $("#history-hidden").animate({ "left": "-30.2vw" }, 150);
    } else if (window.innerWidth > 750) {
        document.getElementById('history-hidden').style.width = "45vw";
        $("#history-hidden").css({ left: "-3vw" });
        $("#languages-container").hide();
        $('#history-hidden').show();
        $("#history-hidden").animate({ "left": "-43.7vw" }, 150);
    }
}

function hideHistoryHidden() {
    if(window.innerWidth > 1300) {
        $("#history-hidden").css({ left: 0 });
        $("#history-hidden").hide();
        $("#science-container").show();
        $("#languages-container").show();
    } else if(window.innerWidth > 750) {
        $("#history-hidden").css({ left: 0 });
        $("#history-hidden").hide();
        $("#languages-container").show();
    }
}

function showClassicsHidden() {
    if(window.innerWidth > 1300) {
        document.getElementById('classics-hidden').style.width = "31vw";
        $("#classics-hidden").css({ left: 0 });
        $("#computer-container").hide();
        $('#classics-hidden').show();
        $("#classics-hidden").animate({ "left": "27.3vw" }, 150);
    } else if(window.innerWidth > 750) {
        document.getElementById('classics-hidden').style.width = "45vw";
        $("#classics-hidden").css({ left: 0 });
        $("#computer-container").hide();
        $('#classics-hidden').show();
        $("#classics-hidden").animate({ "left": "42vw" }, 150);
    }  
}

function hideClassicsHidden() {
    if(window.innerWidth > 1300) {
        $("#classics-hidden").css({ left: 0 });
        $("#classics-hidden").hide();
        $("#computer-container").show();
    } else if(window.innerWidth > 750) {
        $("#classics-hidden").css({ left: 0 });
        $("#classics-hidden").hide();
        $("#computer-container").show();
    }
}

function showComputerHidden() {
    if(window.innerWidth > 1300) {
        document.getElementById('computer-hidden').style.width = "31vw";
        $("#computer-hidden").css({ left: 0 });
        $('#classics-container').show();
        $('#computer-hidden').show();
        $("#computer-hidden").animate({ "left": "27.3vw" }, 150);
    } else if (window.innerWidth > 750) {
        document.getElementById('computer-hidden').style.width = "45vw";
        $("#computer-hidden").css({ left: "-3vw" });
        $("#classics-container").hide();
        $('#computer-hidden').show();
        $("#computer-hidden").animate({ "left": "-43.7vw" }, 150);
    }
}

function hideComputerHidden() {
    if(window.innerWidth > 1300) {
        $("#computer-hidden").css({ left: 0 });
        $("#computer-hidden").hide();
        $("#classics-container").show();
    } else if(window.innerWidth > 750) {
        $("#computer-hidden").css({ left: 0 });
        $("#computer-hidden").hide();
        $("#classics-container").show();
    }
}

function getTopReview(reviews) {
    var topReview = reviews[0];
    for (review of reviews) {
        if (review.upvotes.items.length > topReview.upvotes.items.length) {
            topReview = review;
        }
    }
    return topReview;
}

function getRankColor(rank, subject) {
    switch (rank) {
        case ("Admin"):
            document.getElementById(subject + '-comment-user').style.color = "rgb(35, 155, 86)";
            break;
        case ("Veteran"):
            document.getElementById(subject + '-comment-user').style.color = "rgb(218,165,32)";
            break;
        case ("Master"):
            document.getElementById(subject + '-comment-user').style.color = "rgb(220,20,60)";
            break;
        case ("Apprentice"):
            document.getElementById(subject + '-comment-user').style.color = "rgb(0,139,139)";
            break;
        case ("Newbie"):
            document.getElementById(subject + '-comment-user').style.color = "rgb(100,149,237)";
            break;
        default:
            console.log("rank not found");
    }
}

function loadHome(imgLink, errorMessage) {
    if(imgLink != "none") {
        document.getElementById('account-image').src = imgLink;
    }
    if(errorMessage.length != 0) {
        alert("Couldn't sign you in\n" + errorMessage);
    }
}

function displayDescription(c, subject) {
    const course = JSON.parse(c);
    document.getElementById(subject + "-description").innerHTML = course.description;
    document.getElementById(subject + "-description-title").innerHTML = course.title;
    if (course.extraInfo == "none") {
        document.getElementById(subject + "-description-extras").style.display = "none";
        document.getElementById(subject + "-description").style.paddingTop = "0.3rem";
    } else {
        document.getElementById(subject + "-description-extras").style.display = "block";
        document.getElementById(subject + "-description-extras").innerHTML = course.extraInfo;
        document.getElementById(subject + "-description").style.paddingTop = "0.1rem";
    }
    const reviews = course.reviews.items;
    if (reviews.length > 0) {
        const ratings = [];
        for (review of reviews) {
            ratings.push(review.rating)
        }
        const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        document.getElementById(subject + '-rating-number').innerHTML = averageRating.toFixed(1);
        document.getElementById(subject + '-course-rating-stars').style.width = averageRating.toFixed(1) * 20 + "%";
        if (reviews.length == 1) {
            document.getElementById(subject + '-nOfRatings-reviews').innerHTML = "review";
        } else {
            document.getElementById(subject + '-nOfRatings-reviews').innerHTML = "reviews";
        }
        document.getElementById(subject + '-nOfRatings-number').innerHTML = ratings.length;
        const topReview = getTopReview(reviews);
        document.getElementById(subject + '-comment-extras').style.display = "block";
        document.getElementById(subject + '-comment-content').style.paddingTop = "0.2rem";
        if(topReview.anonymous) {
            document.getElementById(subject + '-comment-user').style.color = "rgb(80, 80, 80)";
            document.getElementById(subject + '-comment-user').innerHTML = "Anonymous";
        } else {
            getRankColor(topReview.userId.rank, subject);
            document.getElementById(subject + '-comment-user').innerHTML = topReview.userId.name;
        }
        document.getElementById(subject + '-comment-content').innerHTML = topReview.review;
        document.getElementById(subject + '-stars-inner').style.width = topReview.rating * 20 + "%";

    } else {
        document.getElementById(subject + '-comment-extras').style.display = "none";
        document.getElementById(subject + '-comment-content').style.paddingTop = "0.4rem";
        document.getElementById(subject + '-comment-content').innerHTML = "No Comments Yet";
        document.getElementById(subject + '-rating-number').innerHTML = "0.0";
        document.getElementById(subject + '-course-rating-stars').style.width = "0";
        document.getElementById(subject + '-nOfRatings-number').innerHTML = "0";
        document.getElementById(subject + '-nOfRatings-reviews').innerHTML = "reviews";

    }
}

function displayDefaultDescription(subject) {
    document.getElementById(subject + "-description").innerHTML = "No Description Available";
    document.getElementById(subject + "-description-title").innerHTML = "No Course Selected";
    document.getElementById(subject + "-description-extras").style.display = "none";
    document.getElementById(subject + '-comment-extras').style.display = "none";
    document.getElementById(subject + '-rating-number').innerHTML = "0.0";
    document.getElementById(subject + '-course-rating-stars').style.width = "0%";
    document.getElementById(subject + '-nOfRatings-reviews').innerHTML = "reviews";
    document.getElementById(subject + '-nOfRatings-number').innerHTML = "0";
    document.getElementById(subject + '-comment-content').innerHTML = "No Comments Yet";
}