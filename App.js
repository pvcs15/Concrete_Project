import React from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import './style/style.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        searchName: '',
    }
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }
  onChangeSearch(ev){
    this.setState({
      searchName: ev.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <div className="Github-Search">
          Github
            <span className="text-style-1">
            Search
            </span>
        </div>
        <div>
        <input className="Search-Input" type="text" value={this.state.searchName} onChange={this.onChangeSearch}></input><Link to={{pathname: `users/${this.state.searchName}`, query: '/users'}}><button className="Search-Button"><i className="fa fa-search fa-2x fa-rotate-90" style={{ color: 'white' }}></i></button></Link>
        </div>
      </div>
    )
  }
}

export default App;
