import { useEffect, useState } from 'react'
import { BsTwitter } from 'react-icons/bs'
import { RiGitRepositoryFill } from 'react-icons/ri'
import { MdPeopleAlt } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import { Bars } from 'react-loader-spinner'
import Select, { components, DropdownIndicatorProps } from 'react-select'
import './App.css'

function App() {

    const [user, setUser] = useState({});
    const [listUsers, setListUsers] = useState([]);
    const [search, setSearch] = useState('');

    const getUser = async () => {
        const data = await fetch('https://api.github.com/users/sammwyy')
            .then(response => response.json());
        setUser(data)
    }

    const handleSearch = (text) => {
        if (typeof text === 'string' && text.length > 2) {
            setSearch(text)
        }
    }


    const searchUser = async (text) => {
        // console.log('texto busqueda',text)
        if (text.length > 2 && typeof text === 'string') {
            const responseData = await fetch(`https://api.github.com/search/users?q=${text}`)
                .then(response => response.json())
            // .then(data => setListUsers(data.items));
            // return data
            const githubUsers = responseData.items.map((githubUser) => {
                return { value: githubUser.login, label: githubUser.login }
            })
            setListUsers(githubUsers)
        } else {
            setListUsers([])
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
        searchUser(search)
    }, [search])


    return (
        <div className="App">
            <div className="search">
                <Select
                    onInputChange={(e) => handleSearch(e)}
                    options={listUsers}
                    placeholder="Buscar usuario"
                />
            </div>
            <div className="card">
                {!user.hasOwnProperty('id') ?
                    (<Bars
                        height="80"
                        width="80"
                        color="#9AD2CB"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />) :
                    (<>
                        <div className="photo-profile">
                            <img src={user.avatar_url} alt="profile" />
                        </div>
                        <div className="content-profile">
                            <div className="name">{user.name}</div>
                            <div className="bio">{user.bio}</div>
                            <div className="recounts">
                                <div className="followers">
                                    <MdPeopleAlt />
                                    {user.followers}
                                </div>
                                <div className="repos">
                                    <RiGitRepositoryFill />
                                    {user.public_repos}
                                </div>
                                {(user.twitter_username) && (
                                    <div className="twitter">
                                        <a target="__blank"
                                            href={'https://twitter.com/' + user.twitter_username}>
                                            <BsTwitter />
                                            {user.twitter_username}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>)
                }

            </div>
        </div>
    );
}

export default App;
