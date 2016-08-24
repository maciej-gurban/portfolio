import {shuffle, range} from 'lodash';

const POOL_SIZE    = 1000;
const INSERT_EVERY = 20;

class AdController {
  constructor(Api) {
    'ngInject';
    this.Api = Api;
  }
  $onInit() {
    this.list = this.generateIds();
  }
  generateIds() {
    return shuffle(range(POOL_SIZE + 1));
  }
  getAd(index) {
    let adIndex = index / this.Api.adEvery;
    return this.list[adIndex];
  }
}

export default {
  controller: AdController,
  replace: true,
  bindings: {
    index: '<'
  },
  template: `
    <div>
      <img ng-src="{{$ctrl.Api.host}}/ad/?r={{$ctrl.getAd($ctrl.index)}}"/>
    </div>
  `
};
