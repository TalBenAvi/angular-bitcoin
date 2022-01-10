// import { Injectable } from '@angular/core';
// import { Observable, BehaviorSubject, of, observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class StorageService {
//   static store:any;
//   static load: any;
//   constructor() {}

//   store(key, value) {
//     localStorage[key] = JSON.stringify(value);
//   }

//   load(key) {
//     var value = localStorage[key] || [];
//     return value;
//   }
//   loader(key) {
//     var value = localStorage[key] || null;
//     return value;
//   }
//   remove(key) {
//     localStorage.removeItem(key);
//   }
// }
function store(key, value) {
  localStorage[key] = JSON.stringify(value);
}

function load(key) {
  var value = localStorage[key] || [];
  return value;
}
function loader(key) {
  var value = localStorage[key] || null;
  return value;
}
function remove(key) {
  localStorage.removeItem(key);
}
export const StorageService = {
  store,
  load,
  remove,
  loader
};