const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function() {
        // Password is required only if user doesn't have GitHub or Google ID
        return !this.githubId && !this.googleId;
      },
    },
    // GitHub OAuth fields (unchanged)
    githubId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    // Google OAuth fields (added)
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    // Email verification
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    // Account type tracking (updated to include Google)
    accountType: {
      type: String,
      enum: ['local', 'github', 'google', 'hybrid'],
      default: 'local',
    },
    // Registration source (added)
    registrationSource: {
      type: String,
      enum: ['local', 'github', 'google'],
      default: 'local',
    },
    // Password reset fields
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    
    // GitHub profile data (unchanged)
    githubProfile: {
      username: String,
      publicRepos: Number,
      followers: Number,
      following: Number,
      bio: String,
      location: String,
      company: String,
      blog: String,
    },
    // Google profile data (added)
    googleProfile: {
      name: String,
      picture: String,
      verifiedEmail: Boolean,
      locale: String,
    },
    // Last login tracking
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
    // Login method tracking (updated to include Google)
    lastLoginMethod: {
      type: String,
      enum: ['local', 'github', 'google'],
      default: 'local',
    },
    profilephoto: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ githubId: 1 });
userSchema.index({ googleId: 1 }); // Added Google index
userSchema.index({ createdAt: -1 });

// Pre-save middleware to set account type (updated for Google)
userSchema.pre('save', function(next) {
  if (this.isNew) {
    const hasGithub = !!this.githubId;
    const hasGoogle = !!this.googleId;
    const hasPassword = !!this.password;
    
    if (hasGithub && !hasGoogle && !hasPassword) {
      this.accountType = 'github';
      this.isEmailVerified = true;
    } else if (hasGoogle && !hasGithub && !hasPassword) {
      this.accountType = 'google';
      this.isEmailVerified = true;
    } else if ((hasGithub || hasGoogle) && hasPassword) {
      this.accountType = 'hybrid';
    } else {
      this.accountType = 'local';
    }
  }
  next();
});

// Instance method to get full name (unchanged)
userSchema.methods.getFullName = function() {
  return `${this.firstname} ${this.lastname}`.trim();
};

// Instance method to get display avatar (updated for Google)
userSchema.methods.getDisplayAvatar = function() {
  if (this.profilephoto) {
    return this.profilephoto;
  }
  if (this.avatar) {
    return this.avatar;
  }
  // Use Google or GitHub avatar if available
  if (this.googleProfile?.picture) {
    return this.googleProfile.picture;
  }
  if (this.githubProfile?.avatarUrl) {
    return this.githubProfile.avatarUrl;
  }
  
  // Fallback to initials-based avatar
  const initials = `${this.firstname.charAt(0)}${this.lastname.charAt(0)}`.toUpperCase();
  return `https://ui-avatars.com/api/?name=${initials}&background=3B82F6&color=fff&size=150`;
};

// Instance method to check if user can login with password (fixed syntax error)
userSchema.methods.canLoginWithPassword = function() {
  return this.accountType === 'local' || this.accountType === 'hybrid';
};

// Static method to find user by email or GitHub ID (unchanged)
userSchema.statics.findByEmailOrGitHub = function(email, githubId) {
  const query = { $or: [] };
  
  if (email) {
    query.$or.push({ email: email });
  }
  
  if (githubId) {
    query.$or.push({ githubId: githubId });
  }
  
  return this.findOne(query);
};

// New static method for Google OAuth
userSchema.statics.findByEmailOrGoogle = function(email, googleId) {
  const query = { $or: [] };
  
  if (email) {
    query.$or.push({ email: email });
  }
  
  if (googleId) {
    query.$or.push({ googleId: googleId });
  }
  
  return this.findOne(query);
};

// Virtual for user profile summary (updated)
userSchema.virtual('profileSummary').get(function() {
  return {
    id: this._id,
    name: this.getFullName(),
    email: this.email,
    avatar: this.getDisplayAvatar(),
    accountType: this.accountType,
    isEmailVerified: this.isEmailVerified,
    joinedAt: this.createdAt,
    lastLoginAt: this.lastLoginAt,
    registrationSource: this.registrationSource,
  };
});

// Ensure virtuals are included in JSON output
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
