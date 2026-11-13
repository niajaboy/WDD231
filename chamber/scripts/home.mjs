import { initNavigation, initFooterDates } from './navigation.mjs';
import { initWeather } from './weather.mjs';
import { initSpotlights } from './spotlights.mjs';

initNavigation();
initFooterDates();
initWeather();
initSpotlights(3);