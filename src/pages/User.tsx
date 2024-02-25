import { useState, useEffect } from "react";
import APIClient from "../lib/apiClient";
import UserRes from "../models/User";
import Repository from "../models/Repository";
import "../assets/style/user.css";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [userData, setUserData] = useState<UserRes | null>(null);
  const [repoData, setRepoData] = useState<Repository[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiClient = new APIClient<UserRes>("/oauth/user");
        const userData = await apiClient.get();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchRepoData = async () => {
      try {
        const apiClient = new APIClient<Repository[]>(
          "/oauth/staredRepositories"
        );
        const repoData = await apiClient.get();
        setRepoData(repoData);
      } catch (error) {
        console.error("Error fetching repository data:", error);
      }
    };

    fetchUserData();
    fetchRepoData();
  }, []);

  const openRepo = (name: string, repoName: string) => {
    navigate(`/commit/${name}/${repoName}`);
  };

  return (
    <div className="container">
      <div className="left-content">
        {userData && (
          <div>
            <img src={userData.avatar_url} alt="User avatar" />
            <h2 className="h2-left">{userData.name}</h2>
            <h2 className="h2-left">{userData.login}</h2>
          </div>
        )}
      </div>

      <div className="right-content">
        <h2 className="repositories-h2">Starred Repositories</h2>
        <div className="repositories">
          {repoData &&
            repoData.map((repo) => (
              <div key={repo.id} className="repository-item">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repository-button"
                  onClick={() => openRepo(repo.owner.login, repo.name)}
                >
                  {repo.name}
                </a>
                <p className="repository-owner">{repo.owner.login}</p>
                <p className="repository-description">{repo.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default User;
