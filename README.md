# Component Change Reactive Utils

A web application that demonstrates reactive state management using ArcGIS JavaScript API utilities to track and display map component changes in real-time.

## Features

* **Real-time Updates:** Tracks map properties using ArcGIS reactive utilities
* **State Management:** Automatic UI updates based on component changes
* **Component Monitoring:** Tracks map readiness, zoom, scale, stationary status, and basemap changes

## Screenshot

1. The main application
   <img width="959" alt="image" src="https://github.com/user-attachments/assets/79cc173d-6137-4445-a2ca-295f7c856eb2" />

## Prerequisites

* Node.js
* Vite

## Project Setup

### Initialize Project

```bash
npm create vite@latest
```

Follow the instructions on screen to initialize the project.

### Install Dependencies

```bash
npm install @arcgis/map-components
```

## Code Structure

### HTML Structure

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Monitor component change using reactiveUtils</title>
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
@import "https://js.arcgis.com/calcite-components/3.2.1/calcite.css";
@import "https://js.arcgis.com/4.33/esri/themes/light/main.css";
@import "https://js.arcgis.com/4.33/map-components/main.css";

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

### TypeScript Structure

```typescript
import "./style.css";

import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-placement";

import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

// DOM elements
const map: HTMLArcgisMapElement | null = document.querySelector("arcgis-map");
if(!map){
  throw new Error("Map element not found");
}

const logElement: HTMLDivElement | null = document.querySelector("#messages");
if(!logElement){
  throw new Error("Log element not found");
}

// Wait for the map component to be ready
await map.viewOnReady();

// State object to track map properties
const state = {
  ready: false,      // Map component readiness status
  zoom: 0,        // Current zoom level
  scale: 0,       // Current scale
  stationary: false,  // Whether map is stationary
  basemap: "",     // Current basemap title
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
  () => map.ready,
  (isComponentReady) => {
    state.ready = isComponentReady;
    renderState();
  },
);

// Watch for changes in zoom, scale, and stationary status
reactiveUtils.watch(
  () => [map.zoom, map.scale, map.stationary],
  ([zoomLevel, scaleValue, isStationary]) => {
    state.zoom = zoomLevel as number;
    state.scale = scaleValue as number;
    state.stationary = isStationary as boolean;
    renderState();
  }
);

// Watch for changes in basemap
reactiveUtils.watch(
  () => {
    const basemap = map.basemap;
    return typeof basemap === 'string' ? basemap : basemap?.title;
  },
  (baseMapTitle) => {
    state.basemap = baseMapTitle || 'Unknown';
    renderState();
  }
);
```

### Running the Application

1. For development, run:
```bash
npm run dev
```

The application can then be run on `https://localhost:5173`

2. For production, run:
```bash
npm run build
npm run preview
```

