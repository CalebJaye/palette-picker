import './style.css'
import palettes from './palettes.json'
import { v4 as generateUUID } from 'uuid';

// Make palettes iterable
let allPalettes = Object.values(palettes);


const form = document.getElementById('first-form');
const palettesList = document.getElementById('palettes-list');


const createPaletteElement = (palette) => {
  const paletteItem = document.createElement('li');
  paletteItem.className = 'palette-item';
  
  const title = document.createElement('h3');
  title.textContent = palette.title;
  
  const colorsContainer = document.createElement('div');
  colorsContainer.className = 'colors-container';
  
  palette.colors.forEach((color, index) => {
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = color;
    colorBox.title = `Color ${index + 1}: ${color}`;
    colorsContainer.appendChild(colorBox);
  });
  
  const temperature = document.createElement('p');
  temperature.className = `temperature ${palette.temperature}`;
  temperature.textContent = `Temperature: ${palette.temperature}`;
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete Palette';
  deleteButton.className = 'delete-button';
  deleteButton.addEventListener('click', () => deletePalette(palette.uuid));
  
  paletteItem.appendChild(title);
  paletteItem.appendChild(colorsContainer);
  paletteItem.appendChild(temperature);
  paletteItem.appendChild(deleteButton);
  
  return paletteItem;
};


const displayPalettes = () => {
  palettesList.innerHTML = '';
  allPalettes.forEach(palette => {
    const paletteElement = createPaletteElement(palette);
    palettesList.appendChild(paletteElement);
  });
};


const deletePalette = (uuid) => {
  allPalettes = allPalettes.filter(palette => palette.uuid !== uuid);
  displayPalettes();
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  const newPalette = {
    title: formData.get('paletteName'),
    colors: [
      formData.get('firstPaletteColor'),
      formData.get('secondPaletteColor'),
      formData.get('thirdPaletteColor')
    ],
    uuid: generateUUID(),
    temperature: formData.get('temperature')
  };
  
  allPalettes.push(newPalette);
  
  displayPalettes();
  
  e.target.reset();
  
  document.getElementById('neutral').checked = true;
};

form.addEventListener('submit', handleSubmit);

displayPalettes();