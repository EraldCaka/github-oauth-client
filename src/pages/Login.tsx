import APIClient from "../lib/apiClient";

function Login() {
  const apiClient = new APIClient("/oauth/clientID");

  const loginWithGithub = async () => {
    try {
      const clientId = await apiClient.get();
      const githubClientId = clientId?.toString();
      if (!githubClientId) {
        console.error("CLIENT_ID is not set");
        return;
      }
      window.location.assign(
        `https://github.com/login/oauth/authorize?client_id=${githubClientId}`
      );
    } catch (error) {
      console.error("Error fetching client ID:", error);
    }
  };

  return (
    <>
      <h1>Github App</h1>
      <button onClick={loginWithGithub}>Login with Github</button>
    </>
  );
}

export default Login;
