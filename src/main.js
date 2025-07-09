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
