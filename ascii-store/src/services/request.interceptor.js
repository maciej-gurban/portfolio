import {compact, startsWith} from 'lodash';

// Transforms newline-delimeted object collection in an array of objects
const formatResponse = data => {
  return compact(data.split("\n")).map(angular.fromJson);
};

export function RequestInterceptor($q, Api) {
  'ngInject';
  this.request = request => {
    if (startsWith(request.url, Api.host)) {
      request.transformResponse = formatResponse;
    }
    return $q.when(request);
  }
}

export function InterceptorConfig($httpProvider) {
  'ngInject';
  $httpProvider.interceptors.push('RequestInterceptor');
}
