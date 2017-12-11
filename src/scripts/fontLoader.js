import WebFont from 'webfontloader';

WebFont.load({
  active: () => {
    sessionStorage.robotoMonoLoaded = true;
  },
  google: {
    families: ['Roboto Mono:400,400italic,700,700italic']
  }
});
