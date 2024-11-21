const baseURL = "https://api.spotify.com/v1";
export const api = async (
  url: string,
  options?: { method?: string; body?: any; headers?: any }
) => {
  const token = localStorage.getItem("access_token");

  if (!token) throw new Error("User not authorized");
  try {
    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); 
      const error = new Error(
        errorData.message || `Request failed with status ${response.status}`
      );

      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    if (response.status === 204) {
      return Promise.resolve();
    }

    return await response.json();
  } catch (err) {
    if (!err.status) {
      console.error("Network error:", err.message);
      throw new Error("Network error occurred. Please try again.");
    }

    throw err; 
  }
};
