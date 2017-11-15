import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos, getLocation } from '../utils/api'
import Loading from './Loading'

function SelectLanguage (props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='languages'>
      {languages.map(function (lang) {
        return (
          <li
            style={lang === props.selectedLanguage ? {color: '#fd4e63'} : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
              {lang}
          </li>
        )
      })}
    </ul>
  )
}

function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

function Location(props) {
   return (
     <div>
       <select className='location' onChange={(e) => props.onSelected(e)} value={props.chosenLocation}>
         {props.usersWithLocations.map((loc,index) => {
           return (
             <option
              value={loc.location}
              key={index}>
               {loc.location}
             </option>
           )
         })}
       </select>
       <button
        className='search'
        onClick={e => props.onReset(e)}>
        Reset
       </button>
   </div>
   );
 }

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

Location.propTypes = {
  usersWithLocations: PropTypes.array.isRequired,

}

class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedLanguage: 'All',
      repos: null,
      chosenLocation: null,
      usersWithLocations: null
    };

    this.updateLanguage = this.updateLanguage.bind(this)
    this.chooseLocation = this.chooseLocation.bind(this)
    this.resetList = this.resetList.bind(this)
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  componentDidUpdate (nextProps, nextState) {
    fetchPopularRepos(nextState.selectedLanguage)
      .then(function (repos) {
        if (!this.state.repos) {
          this.setState(function () {
            return {
              repos
            }
          });
        }
      }.bind(this))

      if (this.state.repos && this.state.repos !== nextState.repos) {
        const location = getLocation(this.state.repos).map(user => {
          return user.then(userInfo => userInfo)
        })
        const arrayOfUsers = Promise.all(location)
          .then(userInfo => userInfo.map(info => {
            return { login: info.data.login, location: info.data.location ? info.data.location : "Missing location" }
          })
        )
        .then(users => {
          if (!this.state.usersWithLocations) {
            this.setState({ usersWithLocations: users })
          }
        })
    }
    if (this.state.repos && this.state.usersWithLocations && this.state.chosenLocation && !this.state.filteredRepo) {
      const user = this.state.usersWithLocations.find(user => user.location === this.state.chosenLocation)
      const filteredRepo = this.state.repos.find(repo => repo.owner.login === user.login)
      if (this.state.filteredRepo !== filteredRepo) {
        this.setState({ filteredRepo })
      }
    }
  }

  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });
  }

  chooseLocation(event) {
    event.persist()
    event.preventDefault()
    this.setState(function () {
      return {
        chosenLocation: event.target.value
      }
    });
  }

  resetList (event) {
    event.persist()
    event.preventDefault()
    this.setState({ filteredRepo: null, chosenLocation: null })
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
      {!this.state.usersWithLocations
        ? <Loading />
        : <Location
          onSelected={this.chooseLocation}
          onReset={this.resetList}
          usersWithLocations={this.state.usersWithLocations}/>
        }
        {!this.state.repos
          ? <Loading />
          : <RepoGrid repos={this.state.filteredRepo ? [this.state.filteredRepo] : this.state.repos} />
        }
      </div>
    )
  }
}

export default Popular;
