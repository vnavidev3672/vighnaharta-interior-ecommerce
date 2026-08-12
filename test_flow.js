// Test the full register → login cycle
(async () => {
  const timestamp = Date.now();
  const username = `user_${timestamp}`;
  const email = `test_${timestamp}@test.com`;
  const password = "myPassword123";

  console.log(`\n--- Registering: ${username} ---`);
  const regRes = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  const regData = await regRes.json();
  console.log("Register response:", JSON.stringify(regData, null, 2));

  if (regData.success) {
    console.log(`\n--- Logging in: ${username} ---`);
    const loginRes = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const loginData = await loginRes.json();
    console.log("Login response:", JSON.stringify(loginData, null, 2));
  }
})();
