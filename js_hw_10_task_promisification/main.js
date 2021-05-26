// Promisification task 01
const delay = ms => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve(ms);
      }, ms);
   });
};
const logger01 = time => console.log(`Resolved after ${time}ms`);
// Вызовы функции для проверки
delay(2000).then(logger01); // Resolved after 2000ms
delay(1000).then(logger01); // Resolved after 1000ms
delay(1500).then(logger01); // Resolved after 1500ms


// Promisification task 02
const users = [
   { name: "Mango", active: true },
   { name: "Poly", active: false },
   { name: "Ajax", active: true },
   { name: "Lux", active: false }
];
const toggleUserState = (allUsers, userName, callback) => {
   const updatedUsers = allUsers.map(user =>
      user.name === userName ? { ...user, active: !user.active } : user
   );
   callback(updatedUsers);
};
const toggleUserState02 = (allUsers, userName) => {
   return new Promise((resolve, reject) => {
      const updatedUsers = allUsers.map(user =>
         user.name === userName ? { ...user, active: !user.active } : user
      );
      resolve(updatedUsers);
   });
};
const logger02 = updatedUsers => console.table(updatedUsers);
/*
 * Сейчас работает так
 */
toggleUserState(users, "Mango", logger02);
toggleUserState(users, "Lux", logger02);
/*
 * Должно работать так
 */
toggleUserState02(users, "Mango").then(logger02);
toggleUserState02(users, "Lux").then(logger02);


// Promisification task 03
const randomIntegerFromInterval = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction, onSuccess, onError) => {
   const delay = randomIntegerFromInterval(200, 500);

   setTimeout(() => {
      const canProcess = Math.random() > 0.3;

      if (canProcess) {
         onSuccess(transaction.id, delay);
      } else {
         onError(transaction.id);
      }
   }, delay);
};

//  Promisification
const makeTransaction02 = transaction => {
   const delay = randomIntegerFromInterval(200, 500);
   return new Promise((resolve, reject) => {
      let id = transaction.id;
      setTimeout(() => {
         const canProcess = Math.random() > 0.3;

         if (canProcess) {
            const result = { id, delay };
            resolve(result);
         } else {
            reject(Error(transaction.id));
         }
      }, delay);
   });
};
//===========
const logSuccess = (id, time) => {
   console.log(`Transaction ${id} processed in ${time}ms`);
};
const logSuccess02 = (result) => {
   console.log(`Transaction ${result.id} processed in ${result.delay}ms`);
};
const logError = id => {
   console.warn(`Error processing transaction ${id}. Please try again later.`);
};
/*
 * Работает так
 */
makeTransaction({ id: 70, amount: 150 }, logSuccess, logError);
makeTransaction({ id: 71, amount: 230 }, logSuccess, logError);
makeTransaction({ id: 72, amount: 75 }, logSuccess, logError);
makeTransaction({ id: 73, amount: 100 }, logSuccess, logError);
/*
 * Должно работать так
 */
makeTransaction02({ id: 70, amount: 150 })
   .then(logSuccess02)
   .catch(logError);

makeTransaction02({ id: 71, amount: 230 })
   .then(logSuccess02)
   .catch(logError);

makeTransaction02({ id: 72, amount: 75 })
   .then(logSuccess02)
   .catch(logError);

makeTransaction02({ id: 73, amount: 100 })
   .then(logSuccess02)
   .catch(logError);