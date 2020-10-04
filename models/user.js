const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    anonymous: {
        type: Boolean,
        required: true
    },
    reviews: {
        type: Number,
        required: true
    },
    upvotesGiven: {
        type: Number,
        required: true
    },
    upvotesReceived: {
        type: Number,
        required: true
    },
    imgLink: {
        type: String,
        required: true
    }
})

function scoreMax(score, max) {
    if(score > max) {
        return max
    } else {
        return score
    }
}

userSchema.methods.addReview = function() {
    reviews = this.reviews;
    reviews++;
    this.reviews = reviews;
    const score = scoreMax(50*this.reviews, 1250) + scoreMax(2*this.upvotesGiven, 50) + 20*this.upvotesReceived;
    if(this.rank != "Admin") {
        if(score >= 1500) {
            this.rank = "Veteran";
        } else if (score >= 500) {
            this.rank = "Master";
        } else if (score >= 100) {
            this.rank = "Apprentice";
        } else {
            this.rank = "Newbie";
        }
    }
    return this.save()
}

userSchema.methods.addUpvoteGiven = function() {
    upvotes = this.upvotesGiven;
    upvotes++;
    this.upvotesGiven = upvotes;
    const score = scoreMax(50*this.reviews, 1250) + scoreMax(2*this.upvotesGiven, 50) + 20*this.upvotesReceived;
    if(this.rank != "Admin") {
        if(score >= 1500) {
            this.rank = "Veteran";
        } else if (score >= 500) {
            this.rank = "Master";
        } else if (score >= 100) {
            this.rank = "Apprentice";
        } else {
            this.rank = "Newbie";
        }
    }
    return this.save();
}

userSchema.methods.deleteUpvoteGiven = function() {
    upvotes = this.upvotesGiven;
    if(upvotes>0) {
        upvotes--;
    }
    this.upvotesGiven = upvotes;
    const score = scoreMax(50*this.reviews, 1250) + scoreMax(2*this.upvotesGiven, 50) + 20*this.upvotesReceived;
    if(this.rank != "Admin") {
        if(score >= 1500) {
            this.rank = "Veteran";
        } else if (score >= 500) {
            this.rank = "Master";
        } else if (score >= 100) {
            this.rank = "Apprentice";
        } else {
            this.rank = "Newbie";
        }
    }
    return this.save();
}

userSchema.methods.addUpvoteReceived = function() {
    upvotes = this.upvotesReceived;
    upvotes++;
    this.upvotesReceived = upvotes;
    const score = scoreMax(50*this.reviews, 1250) + scoreMax(2*this.upvotesGiven, 50) + 20*this.upvotesReceived;
    if(this.rank != "Admin") {
        if(score >= 1500) {
            this.rank = "Veteran";
        } else if (score >= 500) {
            this.rank = "Master";
        } else if (score >= 100) {
            this.rank = "Apprentice";
        } else {
            this.rank = "Newbie";
        }
    }
    return this.save();
}

userSchema.methods.deleteUpvoteReceived = function() {
    upvotes = this.upvotesReceived;
    if(upvotes>0) {
        upvotes--;
    }
    this.upvotesReceived = upvotes;
    const score = scoreMax(50*this.reviews, 1250) + scoreMax(2*this.upvotesGiven, 50) + 20*this.upvotesReceived;
    if(this.rank != "Admin") {
        if(score >= 1500) {
            this.rank = "Veteran";
        } else if (score >= 500) {
            this.rank = "Master";
        } else if (score >= 100) {
            this.rank = "Apprentice";
        } else {
            this.rank = "Newbie";
        }
    }
    return this.save();
}

userSchema.methods.deleteReview = function(amount) {
    upvotes = this.upvotesReceived;
    revs = this.reviews;
    if(upvotes >= amount) {
        upvotes = upvotes-amount;
    }
    if(revs > 0) {
        revs--;
    }
    this.upvotesReceived = upvotes;
    this.reviews = revs;
    this.save();
}

userSchema.methods.subtractUpvotesReceived = function(amount) {
    upvotes = this.upvotesReceived;
    if(upvotes >= amount) {
        upvotes = upvotes-amount;
    }
    this.upvotesReceived = upvotes;
    this.save();
}

userSchema.methods.changeAnonymous = function(isAnonymous) {
    this.anonymous = isAnonymous;
    return this.save();
}


module.exports = mongoose.model('User', userSchema);