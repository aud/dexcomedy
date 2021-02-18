// const wait = (delay: number) => {
//   return new Promise(resolve => setTimeout(resolve, delay));
// }

// function fetchWithRetry({url, delay, tries, fetchOptions = {}}) {
//   return fetch(url, fetchOptions).catch(err => {
//     triesLeft = tries - 1;

//     if (!triesLeft) throw err;

//     return wait(delay).then(() => fetchWithRetry(url, delay, triesLeft, fetchOptions));
//   });
// }
