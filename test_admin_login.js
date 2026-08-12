(async () => {
  const res = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: "omkar3672", password: "om@3672" })
  });
  console.log(await res.json());
})();
