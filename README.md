# Component Change Reactive Utils

A web application that demonstrates reactive state management using ArcGIS JavaScript API utilities to track and display map component changes in real-time.

## Features

* **Real-time Updates:** Tracks map properties using ArcGIS reactive utilities
* **State Management:** Automatic UI updates based on component changes
* **Component Monitoring:** Tracks map readiness, zoom, scale, stationary status, and basemap changes

## Prerequisites

* Node.js
* Vite

## Project Setup

1. **Initialize Project**

    ```bash
    npm create vite@latest
    ```

    Follow the instructions on screen to initialize the project.

2. **Install Dependencies**

    ```bash
    npm install
    ```

## Code Structure

### HTML Structure

The HTML file sets up the basic structure for the ArcGIS web application:

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Monitor component change using reactiveUtils</title>
  
  <!-- Load the styles -->
  <link rel="stylesheet" href="./src/style.css">

  <!-- Load Calcite components from CDN -->
  <script type="module" src="https://js.arcgis.com/calcite-components/3.2.1/calcite.esm.js"></script>

  <!-- Load the ArcGIS Maps SDK for JavaScript from CDN -->
  <link rel="stylesheet" href="https://js.arcgis.com/4.33/esri/themes/dark/main.css">
  <script src="https://js.arcgis.com/4.33/"></script>

  <!-- Load Map components from CDN-->
  <script type="module" src="https://js.arcgis.com/4.33/map-components/"></script>
</head>
<body class="calcite-theme-dark">
  <arcgis-map id="map" item-id="ceb8954a5f2c457284c5074efd5a5ca0">
    <arcgis-zoom position="top-left"></arcgis-zoom>
    <arcgis-expand position="bottom-left">
      <arcgis-basemap-gallery></arcgis-basemap-gallery>
    </arcgis-expand>
    <arcgis-placement position ="top-right">
      <div id="info">
        <b>Watch for changes</b>
        <div id="messages"></div>
      </div>
    </arcgis-placement>
  </arcgis-map>
  <script type="module" src="./src/main.js"></script>
</body>
</html>

```

### CSS Structure

```css
html,
body {
  margin: 0;
  height: 100%;
}

#info {
  box-sizing: border-box;
  padding: 20px;
  height: 225px;
  width: 350px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 14px;
  line-height: 30px;
  overflow: auto;
  overflow-wrap: break-word;
}

#info span {
  font-weight: 600;
  color: #f7be81;
}

```

### JavaScript Structure

The main JavaScript file demonstrates comprehensive reactive state management:

```javascript
// Import ArcGIS reactive utilities for handling component state changes
const reactiveUtils = await $arcgis.import("@arcgis/core/core/reactiveUtils");

// DOM elements
const mapElement = document.getElementById("map");
const logElement = document.getElementById("messages");

// Wait for the map component to be ready
await mapElement.viewOnReady();

// State object to track map properties
const state = {
  ready: false,      // Map component readiness status
  zoom: null,        // Current zoom level
  scale: null,       // Current scale
  stationary: null,  // Whether map is stationary
  basemap: null,     // Current basemap title
};

// Function to update and render the state in the UI
const renderState = () => {
  logElement.innerHTML = `
  <span>ready</span>: ${state.ready} </br>
  <span>zoom</span>: ${state.zoom ?? "-"} </br>
  <span>scale</span>: ${state.scale ?? "-"} </br>
  <span>stationary</span>: ${state.stationary ?? "-"} </br>
  <span>basemap</span>: ${state.basemap ?? "-"}`;
};

// Watch for changes in map component readiness
reactiveUtils.watch(
  () => mapElement.ready,
  (isComponentReady) => {
    state.ready = isComponentReady;
    renderState();
  },
  {initialValue: true}
);

// Watch for changes in zoom, scale, and stationary status
reactiveUtils.watch(
  () => [mapElement.zoom, mapElement.scale, mapElement.stationary],
  ([zoomLevel, scaleValue, isStationary]) => {
    state.zoom = zoomLevel;
    state.scale = scaleValue;
    state.stationary = isStationary;
    renderState();
  },
  {initialValue: true}
);

// Watch for changes in basemap
reactiveUtils.watch(
  () => mapElement.basemap?.title,
  (baseMapTitle) =>{
    state.basemap = baseMapTitle;
    renderState();
  },
  {initialValue: true}
);
```

### Running the Application

1. For development, run:
```bash
npm run dev
```

2. For production, run:
```bash
npm run build
npm run preview
```

