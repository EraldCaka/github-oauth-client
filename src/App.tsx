import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const loginWithGithub = () => {
    const githubClientId = "6f4804a2c75009b348cb";

    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${githubClientId}`
    );
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <h1>React App</h1>
      <button onClick={loginWithGithub}>Login with Github</button>
    </>
  );
}

export default App;
