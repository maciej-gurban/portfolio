export default class {
  constructor($http, Api) {
    'ngInject';
    this.$http = $http;
    this.Api = Api;
  }
  get(params) {
    return this.$http.get(
      `${this.Api.host}/api/products`,
      {params}
    );
  }
}
