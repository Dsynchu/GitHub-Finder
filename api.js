




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
    <div class="user-card ">
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
      <div class="border-2 rounded  rounded-xl  absolute p-4 mt-4 left-156 text-center flex flex-col item-center justify-center">
      <img class="ml-15 mb-4" src="${data.avatar_url}" alt="Avatar" width="100">

      <h2 class="text-xl mt-4 mb-2 text-gray-400">${data.name || "No Name Provided"}</h2>

      <p class="text-emerald-500 "><strong class="text-white">Username:</strong>  ${data.login}</p>

      <p class="mt-1"><strong>Public Repos:</strong> ${data.public_repos}</p>

      <p class="mt-1"><strong>Followers:</strong> ${data.followers}</p>

      <a class="text-blue-500 mt-1 border-b-1 w-[90px] ml-16" href="${data.html_url}" target="_blank">View Profile</a>
      </div>
      
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
