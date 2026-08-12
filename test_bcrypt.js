// Test bcryptjs v3 hash and compare
import bcrypt from 'bcryptjs';

const password = "testpass123";
console.log("bcryptjs version test");

// Test hash
const hash = await bcrypt.hash(password, 10);
console.log("Hash:", hash);

// Test compare - correct password
const match = await bcrypt.compare(password, hash);
console.log("Correct password match:", match);

// Test compare - wrong password
const noMatch = await bcrypt.compare("wrongpass", hash);
console.log("Wrong password match:", noMatch);
