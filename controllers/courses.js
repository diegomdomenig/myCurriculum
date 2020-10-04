const Course = require('../models/course').Course;
const fetchAllCourses = require('../models/course').fetchAllCourses;
const adminFetchCourses = require('../models/course').adminFetchCourses;

exports.getHome = (req, res, next) => {
    fetchAllCourses(courses => {
        if (req.user) {
            res.render('home', {
                pageTitle: "Home",
                math: courses[0],
                english: courses[1],
                arts: courses[2],
                science: courses[3],
                languages: courses[4],
                history: courses[5],
                classics: courses[6],
                computer: courses[7],
                imgLink: req.user.imgLink,
                errorMessage: []
            });
        } else {
            res.render('home', {
                pageTitle: "Home",
                math: courses[0],
                english: courses[1],
                arts: courses[2],
                science: courses[3],
                languages: courses[4],
                history: courses[5],
                classics: courses[6],
                computer: courses[7],
                imgLink: "none",
                errorMessage: req.flash('error')
            });
        }
    });
}

exports.getAddCourse = (req, res, next) => {
    res.render('admin/add-course', {
        pageTitle: "Add Course"
    })

}

exports.postAddCourse = (req, res, next) => {
    const title = req.body.title;
    const shortTitle = req.body.shortTitle;
    const extraInfo = req.body.extraInfo;
    const description = req.body.description;
    const _class = req.body.class;
    const subject = req.body.subject;
    const url = req.body.url;

    const course = new Course({
        title: title,
        shortTitle: shortTitle,
        extraInfo: extraInfo,
        description: description,
        class: _class,
        subject: subject,
        url: url
    })

    course.save()
        .then(result => {
            res.redirect('/admin/view-courses');
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getViewCourses = (req, res, next) => {
    adminFetchCourses(courses => {
        res.render('admin/view-courses', {
            pageTitle: "View Courses",
            courses: courses
        });
    });
}

exports.getEditCourse = (req, res, next) => {
    const courseId = req.params.courseId;
    Course.findById(courseId)
        .then(course => {
            res.render('admin/edit-course', { pageTitle: course.title, course: course });
        })
        .catch(err => { console.log(err) })
}

exports.getCourseReviews = (req, res, next) => {
    const courseId = req.params.courseId;
    Course.findById(courseId)
        .then(course => {
            res.render('admin/admin-reviews', { pageTitle: course.title, course: course });
        })
        .catch(err => { console.log(err) })
}

exports.postEditCourse = (req, res, next) => {
    const courseId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedShorTitle = req.body.shortTitle;
    const updatedExtraInfo = req.body.extraInfo;
    const updatedDescription = req.body.description;
    const updatedClass = req.body.class;
    const updatedSubject = req.body.subject;
    const updatedUrl = req.body.url;

    Course.findById(courseId)
        .then(course => {
            course.title = updatedTitle;
            course.shortTitle = updatedShorTitle;
            course.extraInfo = updatedExtraInfo;
            course.description = updatedDescription;
            course.class = updatedClass;
            course.subject = updatedSubject;
            course.url = updatedUrl;
            return course.save();
        })
        .then(result => {
            res.redirect("/admin/view-courses")
        })
        .catch(err => { console.log(err) });
}

exports.postDeleteCourse = (req, res, next) => {
    const courseId = req.body.courseId;
    Course.findByIdAndDelete(courseId)
        .then(() => {
            res.redirect("/admin/view-courses")
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postAdminDeleteReview = (req, res, next) => {
    const courseId = req.body.courseId;
    const reviewId = req.body.reviewId;
    const userId = req.body.userId;
    Course.findById(courseId)
    .then(course => {
        return course.adminDeleteReview(reviewId, userId);
    })
    .then(result => {
        res.redirect('/admin/reviews/'+ courseId)
    })
    .catch(err => {
        console.log(err);
    })
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