/**
 * BACKEND-READY API FILE
 * ------------------------
 * When backend is ready:
 *   Replace mock responses with real fetch/axios requests.
 */

export const loginApi = async (email, password) => {
  console.log("LOGIN API CALLED → waiting for backend connection");

  // MOCK response (temporary)
  return {
    success: true,
    user: {
      email,
      role: "developer",
      token: "mock-token-123"
    }
  };
};

export const registerApi = async (email, password, role) => {
  console.log("REGISTER API CALLED → waiting for backend connection");

  // MOCK response (temporary)
  return {
    success: true,
    user: {
      email,
      role,
      token: "mock-token-123"
    }
  };
};
