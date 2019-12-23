import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import './style/userStyle.css'


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName: this.props.match.params.searchName,
            users: [],
            usersRepo: [],
            notFound: false,
        }
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onClickTeste = this.onClickTeste.bind(this);
        this.getDetailsUser = this.getDetailsUser.bind(this);
        this.details = this.details.bind(this);
    }
    onChangeSearch(ev) {
        this.setState({
            searchName: ev.target.value
        })
    }
    getDetailsUser() {
        axios.get(`https://api.github.com/users/${this.state.searchName}`)
            .then(res => {
                const users = res.data;
                this.setState({ users, notFound: false });
            }).catch((error) => { this.setState({ notFound: true }); })

        axios.get(`https://api.github.com/users/${this.state.searchName}/repos`)
            .then(res => {
                const usersRepo = res.data;
                this.setState({ usersRepo });
            })
    }
    componentDidMount() {
        this.getDetailsUser();
    }


    constructRepoDetails(usersRepo) {
        const usersRepoDesc = usersRepo.sort((a, b) => (b.stargazers_count - a.stargazers_count))
        const repo = usersRepoDesc.map(repoDetails => {
            return (
                <ul key={repoDetails.id}>
                    <li className="repo-name">
                        {repoDetails.name}
                    </li>
                    <li className="repo-description">
                        {repoDetails.description}
                    </li>
                    <li className="star-count">
                        <i className="iconDetails fa fa-star-o"></i>{repoDetails.stargazers_count}
                    </li>
                </ul>
            )

        });
        return repo
    }
    onClickTeste() {
        this.getDetailsUser();
    }
    details(user) {
        let countStar = 0;
        this.state.usersRepo.map(repo => {
            countStar += repo.stargazers_count;
        });
        return (
            <div style={{ display: 'flex' }}>
                <div className="container">
                    <img className="user-avatar" src={user.avatar_url}></img>
                    <div className="user-name">{user.name}</div>
                    <div className="user-login">{user.login}</div>
                    <ul style={{ paddingLeft: 0 }}>
                        <li className="userDetails">
                            <i className="iconDetails fa fa-building"></i>{user.company}
                        </li>
                        <li className="userDetails">
                            <i className="iconDetails fa fa-map-marker"></i>{user.location}
                        </li>
                        <li className="userDetails">
                            <i className="iconDetails fa fa-star-o"></i>{countStar}
                        </li>
                        <li className="userDetails">
                            <i className="iconDetails fa fa-archive"></i>{user.public_repos}
                        </li>
                        <li className="userDetails">
                            <i className="iconDetails fa fa-users"></i>{user.followers}
                        </li>
                    </ul>
                </div>
                <div className="repoDetails">
                    {this.constructRepoDetails(this.state.usersRepo)}
                </div>
            </div>)
    }
    render() {
        const user = this.state.users
        const erro = this.state.notFound
        let detailsUser;
        if (erro) {
            detailsUser = (<div className="Not-found-message">
                <h2>User not found :(</h2>
            </div>)
        } else {
            detailsUser = this.details(user)
        }
        return (
            <div className="borderContainer">
                <div className="Github-SearchScreen">
                    Github
                        <span className="text-styleScreen-1">
                        Search
                        </span>
                    <div>
                        <input className="Search-InputScreen" type="text" value={this.state.searchName} onChange={this.onChangeSearch}></input>
                    </div>
                    <Link to={{ pathname: `${this.state.searchName}`, query: '/users' }}>
                        <button onClick={this.onClickTeste} className="Search-Button"><i className="fa fa-search fa-2x fa-rotate-90" style={{ color: 'white' }}></i></button></Link>
                </div>
                {detailsUser}
            </div>
        )
    }
}
export default Users