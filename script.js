let allUsers = [];
let filteredUsers = [];
let userCounter = 0;
let maleCounter = 0;
let femaleCounter = 0;
let ageSum = 0;
let ageAvg = 0;

const userContainer = document.querySelector('#user-container');
const userCounterDisp = document.querySelector('#user-counter');
const maleCounterDisp = document.querySelector('#male-counter');
const femaleCounterDisp = document.querySelector('#female-counter');
const ageSumDisp = document.querySelector('#age-sum');
const ageAvgDisp = document.querySelector('#age-avg');
const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');

window.addEventListener('load', () => {
  fetchUsers();
});

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();

  allUsers = json.results.map((user) => {
    const { name, picture, dob, gender } = user;

    return {
      name: `${name.first} ${name.last}`,
      picture: picture.thumbnail,
      age: dob.age,
      gender,
    };
  });

  // Initial attribution
  filteredUsers = allUsers;

  render();
}

function render() {
  renderFilteredUsers();
  renderFilteredUsersStats();
}

function renderFilteredUsers() {
  let filteredUsersHTML = '';

  filteredUsers.forEach((user) => {
    const { age, gender, name, picture } = user;

    filteredUsersHTML += `
      <div class="user">
        <img src="${picture}">
        <h3>${name}, ${age} anos</h3>
      </div>
    `;
  });

  userContainer.innerHTML = filteredUsersHTML;
}

function renderFilteredUsersStats() {
  updateUserStats(filteredUsers);
  userCounterDisp.textContent = userCounter;
  maleCounterDisp.textContent = maleCounter;
  femaleCounterDisp.textContent = femaleCounter;
  ageSumDisp.textContent = ageSum;
  ageAvgDisp.textContent = ageAvg;
}

function updateUserStats(userArray) {
  userCounter = userArray.length;
  maleCounter = userArray.filter((user) => {
    return user.gender === 'male';
  }).length;
  femaleCounter = userArray.filter((user) => {
    return user.gender === 'female';
  }).length;
  ageSum = userArray.reduce((acc, curr) => {
    return acc + curr.age;
  }, 0);
  ageAvg = ageSum / userArray.length;
}

function filterResults() {
  let filterValue = document.querySelector('#search-bar').value;
  console.log(filterValue);

  filteredUsers = allUsers.filter((user) => {
    return user.name.toLowerCase().includes(filterValue.toLowerCase());
  });
}

searchButton.addEventListener('click', () => {
  filterResults();
  render();
});

searchBar.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    filterResults();
    render();
  }
});
