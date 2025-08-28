const API_BASE_URL = "http://localhost:8000/reset-password";

/**
 * Envoyer la demande de réinitialisation de mot de passe
 * @param {string} email
 * @returns {Promise<Object>}
 */
export async function requestPasswordReset(email) {
  const res = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur lors de l'envoi de l'email de réinitialisation");
  }

  return res.json();
}

/**
 * Valider le token et réinitialiser le mot de passe
 * @param {string} token
 * @param {string} newPassword
 * @returns {Promise<Object>}
 */
export async function resetPassword(token, newPassword) {
  const res = await fetch(`${API_BASE_URL}/reset/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plainPassword: newPassword }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur lors de la réinitialisation du mot de passe");
  }

  return res.json();
}