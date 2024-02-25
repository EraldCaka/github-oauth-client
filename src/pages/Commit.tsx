import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import APIClient from "../lib/apiClient";
import CommitRes from "../models/Commit";
import { PieChart } from "@mui/x-charts";
import "../assets/style/user.css";

const Commit = () => {
  const { name, repoName } = useParams();
  const [commitData, setCommitData] = useState<CommitRes[]>([]);
  const [filteredCommitData, setFilteredCommitData] = useState<CommitRes[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [commitCountByDate, setCommitCountByDate] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const fetchCommitData = async () => {
      try {
        const apiClient = new APIClient<CommitRes[]>(
          `/oauth/repository/commit?name=${name}&repo=${repoName}`
        );
        const commitData = await apiClient.get();
        setCommitData(commitData);
        setFilteredCommitData(commitData);
      } catch (error) {
        console.error("Error fetching commit data:", error);
      }
    };
    fetchCommitData();
  }, [name, repoName]);

  useEffect(() => {
    const filteredData = commitData.filter((commit) => {
      const commitDate = new Date(commit.commit.author.date);
      const selectedDateObj = selectedDate ? new Date(selectedDate) : null;

      if (selectedDateObj) {
        return commitDate <= selectedDateObj;
      } else {
        return true;
      }
    });
    setFilteredCommitData(filteredData);
  }, [commitData, selectedDate]);

  useEffect(() => {
    const commitCountMap: { [key: string]: number } = {};
    filteredCommitData.forEach((commit) => {
      const date = new Date(commit.commit.author.date).toLocaleDateString();
      commitCountMap[date] = (commitCountMap[date] || 0) + 1;
    });
    setCommitCountByDate(commitCountMap);
  }, [filteredCommitData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="container">
      <div className="left-content">
        <h2 className="repositories-h2">Commits</h2>
        <div className="date-filter">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="repositories">
          {filteredCommitData.map((commit) => (
            <div key={commit.sha} className="repository-item">
              <p className="repository-sha">SHA: {commit.sha}</p>
              <p className="repository-owner">
                Date: {formatDate(commit.commit.author.date)}
              </p>
              <p className="repository-description">
                Committer:
                <a href={commit.author.html_url} target="_blank" rel="">
                  {" "}
                  {commit.commit.author.name}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="right-content-chart">
        <PieChart
          className="pie-chart-fixed"
          series={[
            {
              data: Object.entries(commitCountByDate).map(
                ([date, count], index) => ({
                  id: index,
                  value: count,
                  label: `${date} - ${count} commits`,
                })
              ),
            },
          ]}
          width={1000}
          height={500}
          style={{ color: "white" }}
        />
      </div>
    </div>
  );
};

export default Commit;
{
  /* <div className="commit-count">
          <h2 className="chart-h2">Commits by Date</h2>
          {Object.keys(commitCountByDate).map((date) => (
            <div key={date} className="commit-count-item">
              <p className="commit-count-date">{date}</p>
              <p className="commit-count-number">
                {commitCountByDate[date]} commits
              </p>
            </div>
          ))}
        </div> */
}
