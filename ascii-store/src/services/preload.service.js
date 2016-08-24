export default class {
  constructor($q) {
    'ngInject';
    return () => new Preloader($q);
  }
}

class Preloader {
  constructor($q) {
    this.on  = () => $q.when(this.setAs.call(this, true));
    this.off = () => $q.when(this.setAs.call(this, false));
  }
  setAs(status) {
    this.loading = status;
  }
}
