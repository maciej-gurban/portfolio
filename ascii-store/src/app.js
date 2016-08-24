import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routerConfig from './index.route';

import ApiConfig from './constants/api.config';

import ProductService from './services/product.service';
import PreloadService from './services/preload.service';
import {
  RequestInterceptor,
  InterceptorConfig
} from './services/request.interceptor';

import FrontPageComponent from './components/front.page/front.page.component';
import frontHeader from './components/front.page/page.header.component'
import frontPreloader from './components/front.page/page.preloader.component'
import frontCatalogueEnd from './components/front.page/page.end.component'
import frontLoadMore from './components/front.page/page.load.more.component'

import advertisement from './components/front.page/ad.component'

import ProductComponent from './components/product/product.component';

angular.module('ascii-store', [
    uiRouter
  ])
  .constant('Api', ApiConfig)
  .config(routerConfig)
  .config(InterceptorConfig)

  .service('Products', ProductService)
  .service('Preload', PreloadService)
  .service('RequestInterceptor', RequestInterceptor)

  .component('awFrontPage', FrontPageComponent)
  .component('awFrontHeader', frontHeader)
  .component('awFrontPreloader', frontPreloader)
  .component('awFrontPageEnd', frontCatalogueEnd)
  .component('awFrontLoadMore', frontLoadMore)
  .component('awAdvertisement', advertisement)
  .component('awProduct', ProductComponent)
