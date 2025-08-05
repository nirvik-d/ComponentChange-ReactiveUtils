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
