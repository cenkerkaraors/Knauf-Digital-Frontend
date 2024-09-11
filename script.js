const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

//////////////////////////////////////////////////////////////////// 
function renderColumn(title, users) { 
  const columnDiv = document.createElement('div'); 
  columnDiv.classList.add('column'); 
  const h3 = document.createElement('h3'); 
  h3.textContent = title; 
  columnDiv.appendChild(h3);

  users.forEach((user) => { 
    const cardDiv = document.createElement('div'); 
    cardDiv.classList.add('card');

    const nameP = document.createElement('p'); 
    nameP.textContent = `Name: ${user.name}`; 
    cardDiv.appendChild(nameP);

    const usernameP = document.createElement('p'); 
    usernameP.textContent = `Username: ${user.username}`; 
    cardDiv.appendChild(usernameP);

    const websiteP = document.createElement('p'); 
    websiteP.textContent = `Website: ${user.website}`; 
    cardDiv.appendChild(websiteP);

    columnDiv.appendChild(cardDiv); 
  });

  const wrapperDiv = document.getElementById('wrapper'); 
  wrapperDiv.appendChild(columnDiv); 
}

////////////////////////////////////////////////////////////////////
function fetchData() {
  // Fetch the data from the end-point
  fetch(USERS_ENDPOINT)
  .then(response => {
    if (!response.ok) {
      throw new Error('Problem with the network response');
    }
    return response.json();
  })
  .then(data => {
    // Group users by their website TLD
    const userData = Object.groupBy(data, ({ website }) => website.toString().split(".").at(-1));

    // Render columns for each TLD
    Object.keys(userData).forEach(key => {
        renderColumn("." + key, userData[key]);
      });    
  })
  .catch(error => {
    console.error('Problem with the fetch operation:', error);
  });

}
