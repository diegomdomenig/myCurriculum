const mongoose = require('mongoose');
const User = require('../models/user');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    extraInfo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    class: {
        type: String,
            required: true
    },
    subject: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    reviews: {
        items: [{
            userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            review: { type: String, required: true },
            rating: { type: Number, required: true },
            anonymous: {type: Boolean, required: false},
            upvotes: {
                items: [{
                    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
                }]
            },
            reports: {
                items: [{
                    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
                }]
            },
            createdAt: { type: String, required: true },
            edited: { type: Boolean, required: true }
        }]
    }
})

courseSchema.methods.addReview = function(userId, review, rating, anonymous, createdAt) {
    const reviewItems = [...this.reviews.items];
    if(!reviewItems.find(rev => {
        return rev.userId._id.toString() == userId.toString()
    })) {
        reviewItems.push({
            userId: userId,
            review: review,
            rating: rating,
            anonymous: anonymous,
            createdAt: createdAt,
            edited: false
        });
        const updatedReviews = {
            items: reviewItems
        }
        this.reviews = updatedReviews;
        return this.save();
    }
};

courseSchema.methods.reportComment = function(reviewId, userId) {
    const reviewItems = [...this.reviews.items];
    const reviewIndex = reviewItems.findIndex(rev => rev._id.toString() == reviewId.toString());
    if(reviewIndex != -1) {
        if(reviewItems[reviewIndex].userId._id.toString() != userId.toString()) {
            const updatedReports = reviewItems[reviewIndex].reports.items.filter(item => {
                return item.userId.toString() !== userId.toString();
            })
            updatedReports.push({ userId: userId });
            reviewItems[reviewIndex].reports.items = updatedReports;
        }
    }
    return this.save();
}

courseSchema.methods.getReportStats = function(reviewId) {
    const reviewItems = [...this.reviews.items];
    const reviewIndex = reviewItems.findIndex(rev => rev._id.toString() == reviewId.toString());
    if(reviewIndex != -1) {
        return [reviewItems[reviewIndex].reports.items.length, reviewItems[reviewIndex].userId]
    } else {
        return [-1];
    }
}

courseSchema.methods.deleteReview = function(reviewId, userId, user) {
    const reviewItems = [...this.reviews.items];
    const reviewIndex = reviewItems.findIndex(rev => rev._id.toString() == reviewId.toString());
    if(reviewIndex != -1) {
        if(reviewItems[reviewIndex].userId._id.toString() == userId.toString()) {
            user.deleteReview(reviewItems[reviewIndex].upvotes.items.length);
            //user.subtractUpvotesReceived(reviewItems[reviewIndex].upvotes.items.length);
            reviewItems.splice(reviewIndex, 1);
        }
    }
    const updatedReviews = {
        items: reviewItems
    }
    this.reviews = updatedReviews;
    return this.save();
}

courseSchema.methods.adminDeleteReview = function(reviewId, userId) {
    const reviewItems = [...this.reviews.items];
    const reviewIndex = reviewItems.findIndex(rev => rev._id.toString() == reviewId.toString());
    if(reviewIndex != -1) {
        User.findById(userId)
        .then(user => {
            const nOfUpvotes = reviewItems[reviewIndex].upvotes.items.length
            user.deleteReview(nOfUpvotes);
            reviewItems.splice(reviewIndex, 1);
            const updatedReviews = {
                items: reviewItems
            }
            this.reviews = updatedReviews;
            return this.save();
        })
    }
}

courseSchema.methods.editReview = function(userId, editedReview, editedRating, anonymous) {
    const reviewItems = [...this.reviews.items];
    const reviewIndex = reviewItems.findIndex(rev => rev.userId._id.toString() == userId.toString());
    if(reviewIndex != -1) {
        reviewItems[reviewIndex].review = editedReview;
        reviewItems[reviewIndex].rating = editedRating;
        reviewItems[reviewIndex].anonymous = anonymous;
        reviewItems[reviewIndex].edited = true;
    }
    const updatedReviews = {
        items: reviewItems
    }
    this.reviews = updatedReviews;
    return this.save();
}

courseSchema.methods.hasReviewed = function(_userId) {
    const reviewItems = [...this.reviews.items];
    if(reviewItems.find(review => {
        return review.userId._id.toString() == _userId.toString()
    })) {
        return true;
    } else {
        return false;
    }
}

courseSchema.methods.hasReviews = function() {
    const reviews = this.reviews.items;
    return reviews.length > 0;
}

courseSchema.methods.getRatings = function() {
    const ratings = []
    this.reviews.items.forEach(review => {
        ratings.push(review.rating);
    });
    return ratings;
}

courseSchema.methods.checkUpvotes = function() {
    if (this.reviews.length > 1) {
        var seen = {}
        const updatedUpvotes = this.reviews.items.upvotes.items.filter(function(item) {
            return seen.hasOwnProperty(item.userId) ? false : (seen[item.userId] = true);
        })
        this.reviews.items.upvotes.items = updatedUpvotes;
        return this.save()
    } else {
        return this.save()
    }
}

courseSchema.methods.sortReviews = function() {
    reviews = this.reviews.items;
    if (reviews.length > 1) {
        reviews.sort((a, b) => (a.upvotes.items.length < b.upvotes.items.length) ? 1 : -1);
    }
    const updatedReviews = {
        items: reviews
    }
    this.reviews = updatedReviews;
    return this.save()
}

courseSchema.methods.Upvote = function(_reviewId, isUpvote, user) {
    var reviews = this.reviews.items;
    const index = reviews.findIndex((review) => review._id == _reviewId);
    if(index != -1){
        if(reviews[index].userId.toString() !== user._id.toString()) {
            if (isUpvote) {
                const previousUpvotes = reviews[index].upvotes.items.length;
                const upvotes = reviews[index].upvotes.items.filter(item => {
                    return item.userId.toString() !== user._id.toString();
                })
                if(previousUpvotes == upvotes.length) {
                    user.addUpvoteGiven();
                    if(!reviews[index].anonymous) {
                        User.findById(reviews[index].userId)
                        .then(user => {
                            user.addUpvoteReceived();
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }

                }
                upvotes.push({ userId: user._id });
                reviews[index].upvotes.items = upvotes;
            } else {
                const previousUpvotes = reviews[index].upvotes.items.length;
                const upvotes = reviews[index].upvotes.items.filter(item => {
                    return item.userId.toString() !== user._id.toString();
                })
                if(previousUpvotes > upvotes) {
                    user.deleteUpvoteGiven();
                    if(!reviews[index].anonymous) {
                        User.findById(reviews[index].userId)
                        .then(user => {
                            user.deleteUpvoteReceived();
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }
                }
                reviews[index].upvotes.items = upvotes;
            }
            const updatedReviews = {
                items: reviews
            }
            this.reviews = updatedReviews;
            return this.save()
        }
    }
}

const Course = mongoose.model('Course', courseSchema);

const fetchAllCourses = callback => {
    const courses = [];
    Course.find({ subject: 'math' })
        .select('title extraInfo reviews description url class -_id')
        .populate('reviews.items.userId', 'name rank')
        .then(mathCourses => {
            courses.push(mathCourses);
            return Course.find({ subject: 'english' })
                .select('title extraInfo reviews description url class -_id')
                .populate('reviews.items.userId', 'name rank')
        })
        .then(englishCourses => {
            courses.push(englishCourses);
            return Course.find({ subject: 'arts' })
                .select('title extraInfo reviews description url class -_id')
                .populate('reviews.items.userId', 'name rank')
        })
        .then(artsCourses => {
            courses.push(artsCourses);
            return Course.find({ subject: 'science' })
                .select('title extraInfo reviews description url class -_id')
                .populate('reviews.items.userId', 'name rank')
        })
        .then(scienceCourses => {
            courses.push(scienceCourses);
            return Course.find({ subject: 'languages' })
                .select('title extraInfo reviews description url class -_id')
                .populate('reviews.items.userId', 'name rank')
        })
        .then(languageCoursess => {
            courses.push(languageCoursess);
            return Course.find({ subject: 'history' })
                .select('title extraInfo reviews description url class -_id')
                .populate('reviews.items.userId', 'name rank')
        })
        .then(historyCourses => {
            courses.push(historyCourses);
            return Course.find({ subject: 'classics' })
                .select('title extraInfo reviews description url class -_id')
                .populate('reviews.items.userId', 'name rank')
        })
        .then(classicsCourses => {
            courses.push(classicsCourses);
            return Course.find({ subject: 'computer' })
                .select('title extraInfo reviews description url class -_id')
                .populate('reviews.items.userId', 'name rank')
        })
        .then(computerCourses => {
            courses.push(computerCourses);
            callback(courses);
        })
        .catch(err => {
            console.log(err);
        })
}

const adminFetchCourses = callback => {
    Course.find()
        .then(courses => {
            callback(courses);
        })
        .catch(err => { console.log(err) })
}

exports.Course = Course;
exports.fetchAllCourses = fetchAllCourses;
exports.adminFetchCourses = adminFetchCourses;