async function addNewUser(email, preferences) {
  const preferencesValues = preferences.map((p) => p.label);

  const response = await fetch("http://localhost:5000/newuser", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      preferences: preferencesValues,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const text = await response.text();

  return [response.ok, text];
}

export default addNewUser;
