var nOfReviews;
var bodyDisabled = false;
var isEditing = false;

window.addEventListener('resize', function(event) {
    smushPage();
});

function showDots(index) {
    $('#menu-'+index).show();
}

function hideDots(index) {
    if(window.innerWidth > 800) {
        if(document.getElementById('popover-'+index).style.display == "" || document.getElementById('popover-'+index).style.display == "none") {
            $('#menu-'+index).hide();
        }
    }
}

function showPopover(index) {
    setTimeout(function() { 
        if(document.getElementById('popover-'+index).style.display == "none") {
            $('#popover-'+index).show();
        } else {
            $('#popover-'+index).hide();
        }
    }, 1);
}

function disableBody() {
    bodyDisabled = true;
}

function hidePopovers() {
    if(!bodyDisabled) {
        var popovers = document.getElementsByClassName('menu-popover');
        for (i = 0; i < popovers.length; i++) {
            popovers[i].style.display = "none";
        }
    } else {
        bodyDisabled = false;
    }
}

function fillModalForm(courseId, reviewId, userId, user, action) {
    document.getElementById(action +'-courseId').value = courseId;
    document.getElementById(action +'-userId').value = userId;
    document.getElementById(action +'-reviewId').value = reviewId;
    if(!user) {
        document.getElementById(action+'-login').value = "true";
    } else {
        document.getElementById(action+'-login').value = "false";
    }
}

function showStars(userId, edit, index) {
    if(!userId) {
        document.getElementById("form-login").value = "true";
        document.getElementById("star1").checked = "true";
        document.getElementById("form7").value = "a";
        document.getElementById("reviews-form").submit();
    } else {
        document.getElementById("add-a-review").style.display = "none";
        var radios = document.getElementsByClassName('rating-star');
        for (i = 0; i < radios.length; i++) {
            radios[i].checked = false;
        }
        if(edit) {
            radios[5-Number((document.getElementById('review-'+index).style.width).slice(0, -1))/20].checked = true;
            document.getElementById('star-continue').disabled = false;
            document.getElementById("review-submit").disabled = false;
            isEditing = true;
            document.getElementById("form7").value = document.getElementById('review-review-'+index).innerHTML;
            document.getElementById("current").innerHTML = document.getElementById('review-review-'+index).innerHTML.length;
        } else {
            document.getElementById('star-continue').disabled = true;
        }
        $('#fieldset-container').fadeIn(400);
        smushPage();
    }
}

function showTextArea() {
    document.getElementById("fieldset-container").style.display = "none";
    getStarValues(value => {
        const percentage = (6 - value) * 20 + "%";
        document.getElementById('textarea-stars').style.width = percentage;
    })
    if(!isEditing) {
        document.getElementById("form7").value = "";
        document.getElementById("review-submit").disabled = true;
        document.getElementById("current").innerHTML = 0;
    }
    document.getElementById("form7").style.height = "100%";
    $('#rating-and-review').fadeIn(400);
    smushPage();
}

function showButtons() {
    $('#review-buttons').fadeIn(400);
    smushPage();
}

function cancelRating() {
    document.getElementById('fieldset-container').style.display = "none";
    $('#add-a-review').fadeIn(400);
    isEditing = false;
    hidePopovers();
    smushPage();
}

function cancelReview() {
    document.getElementById("rating-and-review").style.display = "none";
    $('#add-a-review').fadeIn(400);
    $('#review-buttons').hide();
    isEditing = false;
    hidePopovers();
    smushPage();
}

function submitReview() {
    if(isEditing) {
        document.getElementById('form-edit').value = "true";
    }
    document.getElementById("rating-and-review").style.display = "none";
    smushPage();
    document.getElementById("reviews-form").submit();
    
}

function getStarValues(cb) {
    const elements = document.getElementsByName('star');
    elements.forEach(e => {
        if (e.checked) {
            cb(e.value);
        }
    });
}

function unDisable() {
    document.getElementById('star-continue').disabled = false;
}

function smushPage() {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const reviewDiv = document.getElementById('submitted-reviews');
    const addReviewDiv = document.getElementById('add-reviews');
    const navbarDiv = document.getElementById('navbar');
    const titleDiv = document.getElementById('course-title');
    const reviewsContainer = document.getElementById('reviews-container');
    const rCpaddingTop = window.getComputedStyle(reviewsContainer, null).getPropertyValue('padding-top').slice(0, 1);
    const addReviewPadding = window.getComputedStyle(addReviewDiv, null).getPropertyValue('padding-top').slice(0, 1);
    const allContainer = document.getElementById('all-container');
    const courseExtras = document.getElementById('course-extras');
    const courseDescription = document.getElementById('course-description');
    const courseSpecialties = document.getElementById('course-specialties');
    const courseRating = document.getElementById('rating');
    if(window.innerWidth > 800) {
        reviewsContainer.style.height = vh - navbarDiv.offsetHeight - titleDiv.offsetHeight + "px";
        reviewDiv.style.height = reviewsContainer.offsetHeight - addReviewDiv.offsetHeight - rCpaddingTop - addReviewPadding + 2 + "px";
        addReviewDiv.style.width = vw - courseExtras.offsetWidth + "px";
        allContainer.style.height = vh - navbarDiv.offsetHeight - titleDiv.offsetHeight + "px";
        courseExtras.style.height = vh - navbarDiv.offsetHeight - titleDiv.offsetHeight + "px";
        if(vh < courseDescription.offsetHeight + courseSpecialties.offsetHeight + courseRating.offsetHeight + navbarDiv.offsetHeight + titleDiv.offsetHeight + 7) {
            courseDescription.style.height = courseExtras.offsetHeight - courseSpecialties.offsetHeight - courseRating.offsetHeight - 5 + "px";
        } else {
            courseDescription.style.height = "auto";
        }
        var dots = document.getElementsByClassName('menu-div');
        for (i = 0; i < dots.length; i++) {
            dots[i].style.display = "none";
        }
    } else {
        courseExtras.style.height = "auto";
        reviewDiv.style.height = "auto";
        //reviewsContainer.style.height = "auto";
        //allContainer.style.height = titleDiv.offsetHeight + courseExtras.offsetHeight + reviewsContainer.offsetHeight + "px";
        addReviewDiv.style.width = "100%";
        document.getElementById('everything').style.height = "auto";
        document.getElementById('body').style.height = "auto";
        var dots = document.getElementsByClassName('menu-div');
        for (i = 0; i < dots.length; i++) {
            dots[i].style.display = "inline-block";
        }

    }
}

function changedTextArea(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
    smushPage();
    var x = document.getElementById("form7").value;
    if (x.length > 0) {
        document.getElementById("review-submit").disabled = false;
    } else {
        document.getElementById("review-submit").disabled = true;
    }
    document.getElementById("current").innerHTML = x.length;
}

function loadCourses(extraInfo, subject) {
    if (extraInfo == "none") {
        document.getElementById('course-specialties').style.display = "none";
        document.getElementById('rating').style.height = "7.5rem";
    }
    title = document.getElementById('course-title');
    switch (subject) {
        case "math":
            title.style.background = "rgb(126, 157, 252)";
            break;
        case "english":
            title.style.background = "rgb(255, 112, 112)";
            break;
        case "arts":
            title.style.background = "rgb(255, 228, 108)";
            break;
        case "science":
            title.style.background = "rgb(168, 151, 255)";
            break;
        case "languages":
            title.style.background = "rgb(81, 211, 133)";
            break;
        case "history":
            title.style.background = "rgb(255, 174, 102)";
            break;
        case "classics":
            title.style.background = "rgb(233, 123, 150)";
            break;
        case "computer":
            title.style.background = "rgb(89, 204, 194)";
            break;
        default:
            console.log("subject not found");
    }
}

function loadRating(reviews) {
    if (reviews.length > 0) {
        var ratings = []
        for (review of reviews) {
            ratings.push(review.rating);
        }
        ratingLength = ratings.length
        const fives = [];
        const fours = [];
        const threes = [];
        const twos = [];
        const ones = [];
        const averageRating = ratings.reduce((a, b) => a + b, 0) / ratingLength;
        for (rating of ratings) {
            if (rating == 5) {
                fives.push(rating)
            }
            if (rating == 4) {
                fours.push(rating)
            }
            if (rating == 3) {
                threes.push(rating)
            }
            if (rating == 2) {
                twos.push(rating)
            }
            if (rating == 1) {
                ones.push(rating)
            }
        }
        document.getElementById('rating-number').innerHTML = averageRating.toFixed(1);
        document.getElementById('course-rating-stars').style.width = averageRating.toFixed(1) * 20 + "%";

        $('#bars-inner-5').animate({ width: (fives.length / ratingLength) * 100 + "%" }, 800);
        $('#bars-inner-4').animate({ width: (fours.length / ratingLength) * 100 + "%" }, 800);
        $('#bars-inner-3').animate({ width: (threes.length / ratingLength) * 100 + "%" }, 800);
        $('#bars-inner-2').animate({ width: (twos.length / ratingLength) * 100 + "%" }, 800);
        $('#bars-inner-1').animate({ width: (ones.length / ratingLength) * 100 + "%" }, 800);
        document.getElementById('nOfRatings-number').innerHTML = ratingLength;
    }
}

function loadRank(index, review) {
    if(!review.anonymous) {
        switch (review.userId.rank) {
            case ("Admin"):
                document.getElementById('userRank-' + index).style.color = "rgb(35, 155, 86)";
                break;
            case ("Veteran"):
                document.getElementById('userRank-' + index).style.color = "rgb(218,165,32)";
                break;
            case ("Master"):
                document.getElementById('userRank-' + index).style.color = "rgb(220,20,60)";
                break;
            case ("Apprentice"):
                document.getElementById('userRank-' + index).style.color = "rgb(0,139,139)";
                break;
            case ("Newbie"):
                document.getElementById('userRank-' + index).style.color = "rgb(100,149,237)";
                break;
            default:
                console.log("rank not found");
        }
    }

}


function loadStuff(r, userId, extraInfo, subject, _hasReviewed) {
    smushPage();
    let reviews = JSON.parse(r);
    loadRating(reviews);
    loadCourses(extraInfo, subject)
    const nOfReviews = reviews.length;
    const hasReviewed = (_hasReviewed == 'true');
    if(hasReviewed) {
        document.getElementById("add-a-review").disabled = true;
    }
    if (nOfReviews > 0) {
        for (let i = 0; i < nOfReviews; i++) {
            if(reviews[i].userId._id == userId){
                document.getElementById("upvote-" + i).disabled = true;
                document.getElementById("arrow-" + i).style.color = "rgb(200, 200, 200)";
                document.getElementById("arrow-" + i).style.cursor = "not-allowed";
                document.getElementById("report-" + i).style.display = "none";
            } else {
                document.getElementById("edit-" + i).style.display = "none";
                document.getElementById("delete-" + i).style.display = "none";
            }
            const percentage = reviews[i].rating * 20 + "%";
            document.getElementById('review-' + i).style.width = percentage;
            loadRank(i, reviews[i]);
            for (let upvote of reviews[i].upvotes.items) {
                if (upvote.userId == userId) {
                    document.getElementById("upvote-" + i).checked = true;
                    document.getElementById("arrow-" + i).style.color = "rgb(10,95,212)";
                }
            }
        }
        document.getElementById('rev-container-' + (nOfReviews - 1)).style.border = "none";
    }
}

function submitUpvote(index, userId) {
    document.getElementById("upvote-" + index).disabled = true;
    setTimeout(function() {
        document.getElementById("upvote-" + index).disabled = false;
        }, 200);
    if (!document.getElementById("upvote-" + index).checked) {
        if(!userId) {
            document.getElementById("action-" + index).value = "login";
        } else {
            document.getElementById("arrow-" + index).style.color = "rgb(215, 215, 215)";
            el = document.getElementById("number-" + index);
            el.innerHTML = Number(el.textContent) - 1;
            document.getElementById("action-" + index).value = "downvote";
        }
        document.getElementById("form-" + index).submit();
    } else {
        if(!userId) {
            document.getElementById("action-" + index).value = "login";
            document.getElementById("form-" + index).submit();
        } else {
            document.getElementById("arrow-" + index).style.color = "rgb(10,95,212)";
            el = document.getElementById("number-" + index);
            el.innerHTML = Number(el.textContent) + 1;
            document.getElementById("action-" + index).value = "upvote";
            document.getElementById("form-" + index).submit();
        }
    }
    
}