interface Types {
  [k: string]: {
    lat: number;
    lng: number;
    zoom?: number;
  };
}

const COUNTRIES_CENTROID: Types = {
  HR: { lat: 45.1, lng: 15.2, zoom: 9 },
  CY: {
    lat: 35.126413,
    lng: 33.429859,

    zoom: 8,
  },
  DE: {
    lat: 51.165691,
    lng: 10.451526,
    zoom: 5,
  },
  IE: { lat: 53.41291, lng: -8.24389, zoom: 6 },
  PT: { lat: 39.399872, lng: -8.224454, zoom: 6 },
  SE: { lat: 60.128161, lng: 18.643501, zoom: 4 },
  GB: {
    lat: 55.378051,
    lng: -3.435973,
    zoom: 5,
  },
  AR: {
    lat: -34.996496,
    lng: -64.967282,
    zoom: 4,
  },
  BR: {
    lat: -14.235004,
    lng: -51.92528,
    zoom: 4,
  },

  CL: {
    lat: -35.675147,
    lng: -71.542969,
    zoom: 5,
  },
};

export default COUNTRIES_CENTROID;
