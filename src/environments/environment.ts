// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// Front seul
/*
export const environment = {
  production: false,
  APIURLAPP: 'https://smartercoreski-dev.eu-gb.mybluemix.net/api',
  MODE: 'dev'
};
*/

// Front seul prod
/*
export const environment = {
  production: false,
  MODE: 'DEV',
  APIURLAPP: 'https://smartercoreski-prod.eu-gb.mybluemix.net/api',
  APIURLAUTH: 'http://smartercoreski-prod.eu-gb.mybluemix.net/api/v2/auth'

};
*/
// Front et Back

export const environment = {
  production: false,
  MODE: 'dev',
  DEBUG: true,
  APIURLAPP: 'http://localhost:9080/occuspace/api',
  APIURLAUTH: 'http://localhost:9080/occuspace/api/v2/auth'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
