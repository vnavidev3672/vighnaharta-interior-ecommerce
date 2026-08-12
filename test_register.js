(async () => {
  const res = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: "testuser", email: "test@test.com", password: "password" })
  });
  console.log(await res.json());
})();
