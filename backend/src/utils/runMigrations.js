// Fixed backend/src/utils/runMigrations.js
const { connectDatabase } = require('./database');
const logger = require('./logger');

async function runMigrations() {
  try {
    console.log('🔄 Running database migrations...');
    
    const sequelize = await connectDatabase();
    
    // Sync all models (this will create tables if they don't exist)
    await sequelize.sync({ alter: true });
    
    console.log('✅ Database migrations completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    logger.error('Migration error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  runMigrations();
}

module.exports = runMigrations;