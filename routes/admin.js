const express = require('express');

const coursesController = require('../controllers/courses');

const router = express.Router();

const auth = require('../util/authenticate');

router.get('/add-course', auth.isAdmin, coursesController.getAddCourse);
router.post('/add-course', auth.isAdmin, coursesController.postAddCourse);

router.get('/view-courses', auth.isAdmin, coursesController.getViewCourses);

router.get('/edit/:courseId', auth.isAdmin, coursesController.getEditCourse);
router.post('/edit-course', auth.isAdmin, coursesController.postEditCourse);

router.post('/delete-course', auth.isAdmin, coursesController.postDeleteCourse);

router.get('/reviews/:courseId', auth.isAdmin, coursesController.getCourseReviews);
router.post('/admin-delete-review', auth.isAdmin, coursesController.postAdminDeleteReview);



module.exports = router;