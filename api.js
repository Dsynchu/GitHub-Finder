




const searchBtn = document.getElementById('searchBtn');
const usernameInput = document.getElementById('usernameInput');
const resultDiv = document.getElementById('result');


searchBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (username) {
    getUser(username);
  } else {
    resultDiv.innerHTML = "<p>Please enter a username.</p>";
  }
});


async function getUser(username) {
  const url = `https://api.github.com/users/${username}`;
   
  
  resultDiv.innerHTML = `
    <div class="user-card">
      <div class="skeleton avatar"></div>
      <div class="skeleton text"></div>
      <div class="skeleton text"></div>
      <div class="skeleton text"></div>
    </div>
  `;




  try {
    // resultDiv.innerHTML = "<p>Loading...</p>";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    // Display user info
    resultDiv.innerHTML = `
      <img src="${data.avatar_url}" alt="Avatar" width="100">

      <h2>${data.name || "No Name Provided"}</h2>

      <p><strong>Username:</strong> ${data.login}</p>

      <p><strong>Public Repos:</strong> ${data.public_repos}</p>

      <p><strong>Followers:</strong> ${data.followers}</p>

      <a href="${data.html_url}" target="_blank">View Profile</a>
      
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
