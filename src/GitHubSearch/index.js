



import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function GitHubSearch() {
  const [query, setQuery] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  const YOUR_ACCESS_TOKEN = 'your_access_token';

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`https://api.github.com/kivuvarosekivuvan`, {
        headers: {
          Authorization: `Bearer ghp_RmXcwtgBdv7ukSzMDBBYNaJ30m4z5L159bCx}`,
        },
      });
      setUserProfile(response.data);
      setRepos([]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserRepos = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${query}/repos`);
      setRepos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReadmeContent = async (owner, repo) => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/readme`);
      const readmeContentResponse = await axios.get(response.data.download_url);
      const readmeContent = readmeContentResponse.data;
      console.log(readmeContent); // Display or process the README content here
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input id="enter" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button id='btn' onClick={fetchUserProfile}>Search</button>

      {userProfile ? (
        <>
          <h3>{userProfile.login}</h3>
          <img src={userProfile.avatar_url} alt="Avatar" id="image" />
          <p>{userProfile.name}</p>
          <p>{userProfile.bio}</p>
          <button onClick={fetchUserRepos}>View Repositories</button>

          {repos.length > 0 ? (
            <ul>
              {repos.map((repo) => (
                <li key={repo.id}>
                  <h4>{repo.name}</h4>
                  <p>{repo.description}</p>
                  <button onClick={() => fetchReadmeContent(userProfile.login, repo.name)}>View Readme</button>
                </li>
              ))}
            </ul>
          ) : (
            <i>No repositories found.</i>
          )}
        </>
      ) : (
        <i id="no">No user profile found.</i>
      )}
    </>
  );
}

export default GitHubSearch;
