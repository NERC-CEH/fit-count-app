import species from './insects.json';
import * as speciesResources from './resources';

const extendWithResources = sp => Object.assign(sp, speciesResources[sp.id]);

species.forEach(extendWithResources);

export default species;