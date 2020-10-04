const Course = require('../models/course').Course;
const User = require('../models/user')
const {validationResult} = require('express-validator')
const nodeMailer = require('nodemailer'); 

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "mycurriculumtest@gmail.com",
        pass: `${process.env.EMAIL_PASSWORD}`
    }
})

function getReviewDate() {
    var d = new Date();
    return d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear()
}


exports.getReview = (req, res, next) => {
    const courseUrl = req.params.courseUrl;
    Course.find({ url: courseUrl })
        .then(courses => {
            course = courses[0];
            return course.checkUpvotes()
        })
        .then(result => {
            return course.sortReviews()
        })
        .then(result => {
            Course.find({ url: courseUrl })
                .select('title extraInfo description subject reviews url')
                .populate('reviews.items.userId', 'name rank')
                .then(courses => {
                    course = courses[0];
                    if (req.user) {
                        res.render('add-reviews', {
                            pageTitle: "Review",
                            course: course,
                            user: req.user._id,
                            hasReviewed: course.hasReviewed(req.user._id),
                            imgLink: req.user.imgLink
                        });
                    } else {
                        res.render('add-reviews', {
                            pageTitle: "Review",
                            course: course,
                            user: req.user,
                            hasReviewed: false,
                            imgLink: "none"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                })

        })
        .catch(err => {
            console.log(err);
        })
}


exports.postReview = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    } else {
        if(req.body.login == "true") {
            res.redirect('/login');
        } else if(req.user) {
            const courseId = req.body.courseId;
            const review = req.body.review
            const rating = 6 - Number(req.body.star);
            if(req.body.edit == "true") {
                Course.findById(courseId)
                .then(course => {
                    return course.editReview(req.user._id, review, rating, req.user.anonymous)
                })
                .then(result => {
                    res.redirect('/review/' + course.url);
                })
                .catch(err => {
                    console.log(err);
                })
            } else {
                createdAt = getReviewDate()
                if(!req.user.anonymous) {
                    req.user.addReview();
                }
                Course.findById(courseId)
                .then(course => {
                    return course.addReview(req.user._id, review, rating, req.user.anonymous, createdAt)
                })
                .then(result => {
                    res.redirect('/review/' + course.url);
                })
                .catch(err => {
                    console.log(err);
                })
            }
        } else {
            res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        }
    }
}

exports.deleteReview = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.redirect("https://www.youtube.com/watch?v=PfYnvDL0Qcw");
    } else {
        if(req.body.login == "true") {
            res.redirect('/login');
        } else if(req.user.id == req.body.userId) {
            const courseId = req.body.courseId;
            const reviewId = req.body.reviewId;
            const userId = req.body.userId;
            Course.findById(courseId)
                .then(course => {
                    return course.deleteReview(reviewId, userId, req.user);
                })
                .then(result => {
                    res.redirect('/review/' + course.url);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            res.redirect("https://www.youtube.com/watch?v=PfYnvDL0Qcw");
        }
    }

}

exports.reportReview = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.redirect("https://youtu.be/LDU_Txk06tM?t=75");
    }
    else {
        if(req.body.login == "true") {
            res.redirect('/login');
        } else if(req.user) {
            const courseId = req.body.courseId;
            const reviewId = req.body.reviewId;
            var courseName = "";
            Course.findById(courseId)
                .then(course => {
                    courseName = course.title;
                    return course.reportComment(reviewId, req.user._id);
                })
                .then(result => {
                    res.redirect('/review/' + course.url);
                    reportStats = result.getReportStats(reviewId);
                    if(reportStats[0] == 1) {
                        var mailOptions = {
                            from: "mycurriculumtest@gmail.com",
                            to: "diegomdomenig@gmail.com",
                            subject: "My Curriculum Reports",
                            text: "There have been two reports on a comment in the following course: \"" + courseName + "\""
                        }

                        return transporter.sendMail(mailOptions, (err, data) => {
                            if(err) {
                                console.log(err)
                            }
                        })
                    } else if (reportStats[0] > 4) {
                        User.findById(reportStats[1])
                        .then(user => {
                            return result.deleteReview(reviewId, reportStats[1], user);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            res.redirect("https://youtu.be/LDU_Txk06tM?t=75");
        }
    }

}

exports.postUpvote = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.redirect("https://youtu.be/HEXWRTEbj1I?t=3");
    } else {
        if(req.body.action == "login") {
            res.redirect('/login');
        } else if(req.user){
            const action = req.body.action;
            const reviewId = req.body.reviewId;
            const courseId = req.body.courseId;
            const userId = req.user._id;
            res.status(204).send();
            if (action == "downvote") {
                Course.findById(courseId)
                .then(course => {
                    return course.Upvote(reviewId, false, req.user);
                })
                .catch(err => {
                    console.log(err);
                })
            } else {
                Course.findById(courseId)
                .then(course => {
                    return course.Upvote(reviewId, true, req.user);
                })
                .catch(err => {
                    console.log(err);
                })
            }

        } else {
            res.redirect("https://youtu.be/HEXWRTEbj1I?t=3");
        }
    }
}