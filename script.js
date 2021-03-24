import http from 'k6/http';
import { check, sleep } from 'k6';
// export let options = {
//   vus: 100,
//   duration: '30s',
// };

export let options = {
  stages: [
    { duration: '30s', target: 1000 }, // below normal load
    // { duration: '5m', target: 100 },
    // { duration: '2m', target: 200 }, // normal load
    // { duration: '5m', target: 200 },
    // { duration: '2m', target: 300 }, // around the breaking point
    // { duration: '5m', target: 300 },
    // { duration: '2m', target: 400 }, // beyond the breaking point
    // { duration: '5m', target: 400 },
    // { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

let getID = () => {
  return Math.floor((Math.random()*100000) +1);
}
// export default function () {
//   const BASE_URL = `http://localhost:3002/`;
//   let productId = getID();
//   let responses = http.batch([
//     [
//       'GET',
//       `${BASE_URL}qa/questions/`,
//       null,
//       {},
//     ]
//   ])
//   sleep(1);
// }

//stages to test VU ramp up and down.
// export let options = {
//   stages: [
//     { duration: '30s', target: 100 },
//     { duration: '30s', target: 1000 },
//   ],
// };
export default function () {
  let productId = getID();
  let res = http.get(`http://localhost:3002/qa/questions/?product_id=${productId}`);
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}

