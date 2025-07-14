// export async function register(data) {
//   const response = await fetch('http://127.0.0.1:8000/api/users/create', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Erreur lors de l’inscription.');
//   }

//   return await response.json(); // succès
// }
// // creaction de la fonction login 
// export async function login(data) {
//   const response = await fetch('http://127.0.0.1:8000/api/login_check', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Identifiants incorrects');
//   }

//   return await response.json(); // contient le token JWT
// }
