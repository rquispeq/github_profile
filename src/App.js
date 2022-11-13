import { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.svg'

function App() {

  const [user, setUser] = useState({});

  const getUser = async () => {
    const data = await fetch(' https://api.github.com/users/sammwyy').then( response => response.json());
    setUser(data);
  }

  useEffect( () => {
    getUser();
  },[])

  return (
    <div className="App">
      <div className="card">
        <div className="photo-profile">
            <img src={user?.avatar_url} alt="profile" />
        </div>
        <div className="content-profile">
            <div className="name">{user?.name}</div>
            <div className="bio">{user?.bio}</div>
            <div className="recounts">
                <div className="followers">
                    {user?.followers}
                </div>
                <div className="repos">
                    {user?.public_repos}
                </div>
                {(user?.twitter_username) && (<div className="twitter">
                    <a target="__blank" href={'https://twitter.com/' + user?.twitter_username}>@{user?.twitter_username}</a>
                </div>)}
                
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
