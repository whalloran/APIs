const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Make an AJAX request
function getJSON( url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if(xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      return callback(data);
    }
  };
  xhr.send();
}

// Generate the markup for each profile
function generateHTML(data) {
  const section = document.createElement('section');
  peopleList.appendChild(section);
  const img_src = (data.thumbnail && data.thumbnail.source) ? data.thumbnail.source : "";
section.innerHTML = `<img src=${img_src}>`;
     //<img src=${data.thumbnail.source}>
  section.innerHTML +=    
  `<h2>${data.title}</h2>
      <p>${data.description}</p>
      <p>${data.extract}</p>
    `;
  } 
btn.addEventListener('click', () => {
  getJSON(astrosUrl, (json) => {
    json.people.map( person => {
      if (person.name == 'Sergey Ryzhikov') {
        person.name = person.name + '_(cosmonaut)';
      }
      else if (person.name == 'Mike Hopkins') {
        person.name = 'Michael S. Hopkins';
      }
      else if (person.name == 'Victor Glover') {
        person.name = 'Victor J. Glover';
      }
      getJSON(wikiUrl + person.name, generateHTML);
    });
  });
event.target.remove();
});





