import {concat, size} from 'lodash';

export class FrontPageController {
  constructor($q, Products, Api, Preload) {
    'ngInject';
    this.when = $q.when;
    this.Products = Products;
    this.Api = Api;
    this.preload = Preload();
  }

  $onInit() {
    this.pageSize = 20;
    this.params = {
      limit: this.pageSize,
      skip:  0
    };

    this.productList  = [];
    this.prefetchList = [];

    // Initially, first batch of products is fetched and displayed
    // Next batch of results is then prefetched and cached for better UX
    this.getInitialProducts();
  }

  isAdRow(index) {
    return index % this.Api.adEvery === 0;
  }

  isLastPage(result) {
    return size(result) < this.pageSize;
  }

  fetchProducts() {
    return this.Products.get(this.params);
  }

  configureNextRequest() {
    return this.when(
      this.params.skip += this.pageSize
    );
  }

  saveToView(result) {
    this.productList = concat(this.productList, result.data);
  }

  saveToCache(result) {
    this.prefetchList = result.data;
    this.endOfCatalogue = this.isLastPage(result.data);
  }

  readCached() {
    this.productList = concat(this.productList, this.prefetchList);
  }

  getInitialProducts() {
    return this.preload.on()
      .then(() => this.fetchProducts())
      .then(result => this.saveToView(result))
      .then(() => this.preload.off())
      .then(() => this.getNextProducts());
  }

  getNextProducts() {
    return this.configureNextRequest()
      .then(() => this.fetchProducts())
      .then(products => this.saveToCache(products));
  }
}
export default {
  controller: FrontPageController,
  template: `
    <aw-front-header></aw-front-header>

    <div class="grid-container centered-narrow">
      <div ng-repeat="product in $ctrl.productList track by $index">
        <aw-advertisement
          ng-if="$ctrl.isAdRow($index)"
          class="grid-item ad"
          index="$index">
        </aw-advertisement>
        <div class="grid-item one-of-four">
          <aw-product prod="product"></aw-product>
        </div>
      </div>
    </div>

    <aw-front-preloader
      ng-if="$ctrl.preload.loading">
    </aw-front-preloader>

    <aw-front-load-more
      ng-if="!$ctrl.preload.loading && !$ctrl.endOfCatalogue"
      ng-click="$ctrl.readCached(); $ctrl.getNextProducts();">
    </aw-front-load-more>

    <aw-front-catalogue-end
      ng-if="$ctrl.endOfCatalogue">
    </aw-front-catalogue-end>
  `
}
