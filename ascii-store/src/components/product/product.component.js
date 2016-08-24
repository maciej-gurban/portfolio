import {toNumber} from 'lodash';
import moment from 'moment';

const apiFormat = 'ddd MMM DD YYYY HH:mm:ss ZZ';
const displayFormat = 'DD MMM YYYY';

export class ProductController {
  $onInit() {
    this.product = {
      id:    this.prod.id,
      face:  this.prod.face,
      date:  this.getDate(this.prod.date),
      size:  this.getSize(this.prod.size),
      price: this.getPrice(this.prod.price)
    };
  }
  getDate(dateString) {
    let inputDate = moment(dateString, apiFormat);
    let weekAgo = moment().subtract(7, 'days').startOf('day');
    if (inputDate.isValid()) {
      return inputDate.isBefore(weekAgo)
        ? inputDate.format(displayFormat)
        : inputDate.fromNow();
    }
    return dateString;
  }
  getPrice(price) {
    return toNumber(price) / 100;
  }
  getSize(size) {
    return size + 'px';
  }
}

export default {
  bindings: {
    prod: '<'
  },
  controller: ProductController,
  template: `
    <div class="card">
      <div class="card--product" style="font-size: {{$ctrl.product.size}}">
        <div class="card--product-inner">
          {{$ctrl.product.face}}
        </div>
      </div>
      <div class="card--caption">
        <div class="card--caption--added">
          Added: {{$ctrl.product.date}}
        </div>
        <div class="card--caption--price">
          Price: {{$ctrl.product.price | currency}}
        </div>
      </div>
    </div>
    `
}
