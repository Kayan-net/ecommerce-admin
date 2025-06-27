// ... existing code ...

const db = require('./db'); // Your database config file

async function main() {
  try {
    const data = await prisma.store.findFirst({
      where: { /* your conditions */ },
    });
    
    console.log(data);
  } catch (error) {
    console.error('Database query failed:', error.message);
  }
}

// ... rest of code ...