export const languages = {
  et: 'Eesti',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const langs = Object.keys(languages) as Lang[];

export const defaultLang: Lang = 'et';

/** localStorage key holding the visitor's chosen language. */
export const LANG_STORAGE_KEY = 'lang';

/**
 * English is the source of truth: every key must exist here.
 * Other languages may be partial; missing keys fall back to English.
 */
const en = {
  'meta.description': 'Cardo Tisler — Woodworking, renovation, and garden projects.',
  'nav.location': 'Tartu · Estonia',
  'nav.toggleMenu': 'Toggle menu',
  'nav.switchLanguage': 'Switch language',
  'nav.allWork': 'All Work',

  'category.Woodworking': 'Woodworking',
  'category.Renovation': 'Renovation',
  'category.Garden': 'Garden',
  'category.Other': 'Other',

  'home.eyebrow': 'Catalogue of Works',
  'home.headline': 'Documenting the process of earning my surname',
  'home.recentWork': 'Recent Work',
  'home.viewAll': 'View all projects →',
  'home.empty': 'Projects coming soon.',

  'listing.breadcrumbHome': 'Home',
  'listing.eyebrow': 'Catalogue of Works',
  'listing.countOne': '{count} project recorded',
  'listing.countMany': '{count} projects recorded',
  'listing.empty': 'Coming soon.',
  'listing.emptyDefault': 'No projects yet.',

  'project.specifications': 'Specifications',
  'project.material': 'Material',
  'project.finish': 'Finish',
  'project.dimensions': 'Dimensions',
  'project.completed': 'Completed',
  'project.materialCosts': 'Material Costs',
  'project.total': 'Total',
  'project.show': 'Show',
  'project.hide': 'Hide',
  'project.buildProgress': 'Build Progress',
  'project.gallery': 'Gallery',
  'project.before': 'Before',
  'project.after': 'After',

  'controls.viewLarger': 'View larger',
  'controls.previousImage': 'Previous image',
  'controls.nextImage': 'Next image',
  'controls.previous': 'Previous',
  'controls.next': 'Next',
  'controls.close': 'Close',
};

export type UIKey = keyof typeof en;

const et: Partial<Record<UIKey, string>> = {
  'category.Woodworking': 'Puutöö',
  'category.Renovation': 'Renoveerimine',
  'category.Garden': 'Aiamaa',
  'nav.allWork': 'Kõik projektid',
  'nav.location': 'Tartu · Estonia',
  'nav.toggleMenu': 'Ava menüü',
  'nav.switchLanguage': 'Muuda keelt',
  'category.Other': 'Muu',
  'home.eyebrow': 'Projektide kogum',
  'home.headline': 'Teekond oma perekonnanime väljateenimiseni',
  'home.recentWork': 'Hiljutised tööd',
  'home.viewAll': 'Vaata kõiki projekte →',
  'home.empty': 'Projektid tulevad varsti.',
  'meta.description': 'Cardo Tisler — Puutöö, renoveerimise ja aiamaa projektid.',
  'listing.breadcrumbHome': 'Pealeht',
  'listing.eyebrow': 'Projektide kogum',
  'listing.countOne': '{count} projekt',
  'listing.countMany': '{count} projekti',
  'listing.empty': 'Tulemas.',
  'listing.emptyDefault': 'Projekte veel pole.',
  'project.specifications': 'Projekti detailid',
  'project.material': 'Materjal',
  'project.finish': 'Viimistlus',
  'project.dimensions': 'Mõõdud',
  'project.completed': 'Valmis',
  'project.materialCosts': 'Materjali hind',
  'project.total': 'Kokku',
  'project.show': 'Näita',
  'project.hide': 'Peida',
  'project.buildProgress': 'Protsess',
  'project.gallery': 'Galerii',
  'project.before': 'Enne',
  'project.after': 'Pärast',
  'controls.viewLarger': 'Vaata suuremalt',
  'controls.previousImage': 'Eelmine pilt',
  'controls.nextImage': 'Järgmine pilt',
  'controls.previous': 'Eelmine',
  'controls.next': 'Järgmine',
  'controls.close': 'Sulge',
};

export const ui: Record<Lang, Partial<Record<UIKey, string>>> = { en, et };

export const dateLocales: Record<Lang, string> = {
  et: 'et-EE',
  en: 'en-GB',
};
