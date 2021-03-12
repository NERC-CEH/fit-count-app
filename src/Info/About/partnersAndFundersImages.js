// funders
import Defra from './images/funders/Defra-logo.jpg';
import JNCC from './images/funders/JNCCLogo.jpg';
import ScotGov from './images/funders/Scot_Gov_logo.jpg';
import WelchGov from './images/funders/Welsh_Gov.jpg';
import DAERA from './images/funders/DAERA.jpg';

// partners
import BBCT_CMYK from './images/partners/BBCT_CMYK.jpg';
import BC from './images/partners/Butterfly-conservation.jpg';
import Bto from './images/partners/BTO_Master_logo_landscape.jpg';
import Hymettus from './images/partners/Hymettus logo.jpg';
import Nhm from './images/partners/national-history-museum.png';
import Ceh from './images/partners/UKCEH-Logo_Long_Positive_CMYK.png';
import Leeds from './images/partners/University of Leeds.png';
import Reading from './images/partners/University of Reading.png';
import pMSKY from './images/partners/p-MS-ky.png';
import darvinInitiative from './images/partners/darvin_initiative.png';

const funders = [
  {
    url:
      'https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs',
    images: Defra,
    alt: 'SponsorLogo',
    width: '130px',
    type: 'funders',
  },
  {
    url: 'https://gov.wales/',
    images: WelchGov,
    alt: 'SponsorLogo',
    width: '100px',
    type: 'funders',
  },
  {
    url: 'https://jncc.gov.uk/',
    images: JNCC,
    alt: 'SponsorLogo',
    width: '130px',
    type: 'funders',
  },
  {
    url: 'https://www.gov.scot/',
    images: ScotGov,
    alt: 'SponsorLogo',
    width: '130px',
    type: 'funders',
  },
  {
    url: 'http://www.daera-ni.gov.uk/',
    images: DAERA,
    alt: 'SponsorLogo',
    width: '225px',
    type: 'funders',
  },
];

const partners = [
  {
    url: 'https://www.ceh.ac.uk/',
    images: Ceh,
    alt: 'SponsorLogo',
    width: '130px',
  },
  {
    url: 'https://www.nhm.ac.uk/',
    images: Nhm,
    alt: 'SponsorLogo',
    width: '100px',
  },
  {
    url: 'https://butterfly-conservation.org/',
    images: BC,
    alt: 'SponsorLogo',
    width: '100px',
  },
  {
    url: 'https://www.bto.org/',
    images: Bto,
    alt: 'SponsorLogo',
    width: '130px',
  },
  {
    url: 'http://www.hymettus.org.uk/',
    images: Hymettus,
    alt: 'SponsorLogo',
    width: '130px',
  },
  {
    url: 'https://www.leeds.ac.uk/',
    images: Leeds,
    alt: 'SponsorLogo',
    width: '130px',
  },
  {
    url: 'http://www.reading.ac.uk/',
    images: Reading,
    alt: 'SponsorLogo',
    width: '130px',
  },
  {
    url: 'https://www.bumblebeeconservation.org/',
    images: BBCT_CMYK,
    alt: 'SponsorLogo',
    width: '130px',
  },
  {
    url: 'https://www.gov.uk/government/organisations/natural-england',
    images: pMSKY,
    alt: 'SponsorLogo',
    width: '130px',
    forCyprus: true,
  },
  {
    url: 'https://www.gov.uk/government/groups/the-darwin-initiative',
    images: darvinInitiative,
    alt: 'SponsorLogo',
    width: '130px',
    forCyprus: true,
  },
];

export { funders, partners };
