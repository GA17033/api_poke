const card = document.querySelector('#pokemon');
const template = document.querySelector('#template').content;
const fragment = document.createDocumentFragment();
const search_poke = document.querySelector('#search-poken');
const search_btn = document.querySelector('.search_btn');
const url = 'https://pokeapi.co/api/v2/pokemon/';
const btn_next = document.querySelector('#btn-next');
const btn_prev = document.querySelector('#btn-prev');
const btn_all = document.querySelector('.search_all');

btn_all.addEventListener('click', async() => {
  traer(url);
})
let btnnext;
let btnprev;
window.addEventListener('DOMContentLoaded', (event) => {
  traer(url);
  
});
btn_next.addEventListener('click', async(event) => {
  event.preventDefault();
  const url = event.target.dataset.url;
  card.innerHTML = '';
  traer(url);
})

btn_prev.addEventListener('click', async(event) => {
  event.preventDefault();
  const url = event.target.dataset.url;
  card.innerHTML = '';
  traer(url);
})
const traer = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  btnnext = data.next ? data.next : btn_pag.remove();
  btnprev = data.previous;
  btn_next.dataset.url = btnnext ;
  btn_prev.dataset.url = btnprev ;
  //console.log(btnnext);
  recorrer(data.results);
  console.log(data.results);
  }
const recorrer = async(data) => {
  for(let index of data){
    const data = await fetch(index.url);
    const pokemon = await data.json();
   // console.log(pokemon);
    mostrar(pokemon);
  }
}
const mostrar = data=>{
  template.querySelector('img').src = data.sprites.front_default;
  template.querySelector('h5').textContent ="Name: " + data.name;
  template.querySelector('p').textContent = "Type: " + data.types[0].type.name;
  template.querySelector('.btn-dark').dataset.id=data.id;
  const clone = template.cloneNode(true);
  fragment.appendChild(clone);
  card.appendChild(fragment);
}
const buscar = async() => {
  const busqueda = search_poke.value;
  const response = await fetch(url + busqueda);
  const data = await response.json();
  card.innerHTML = '';
 
  mostrar(data);
}
search_btn.addEventListener('click', buscar);




