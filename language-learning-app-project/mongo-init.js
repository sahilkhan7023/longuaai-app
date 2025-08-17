// MongoDB initialization script
db = db.getSiblingDB('ai-language-learning');

// Create collections
db.createCollection('users');
db.createCollection('subscriptions');
db.createCollection('lessons');
db.createCollection('progress');
db.createCollection('vocabulary');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "totalXP": -1 });
db.users.createIndex({ "currentStreak": -1 });

db.subscriptions.createIndex({ "userId": 1 }, { unique: true });
db.subscriptions.createIndex({ "stripeCustomerId": 1 }, { unique: true });
db.subscriptions.createIndex({ "stripeSubscriptionId": 1 }, { unique: true, sparse: true });

db.lessons.createIndex({ "language": 1, "difficulty": 1 });
db.lessons.createIndex({ "category": 1 });
db.lessons.createIndex({ "isPublished": 1 });

db.progress.createIndex({ "userId": 1, "lessonId": 1 });
db.progress.createIndex({ "userId": 1, "completedAt": -1 });

db.vocabulary.createIndex({ "userId": 1, "language": 1 });
db.vocabulary.createIndex({ "word": 1, "language": 1 });

print('Database initialized successfully!');

