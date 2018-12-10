import React from 'react'
import style from '../style.sass'

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import { Transition, Spring } from 'react-spring'

import Tippy from '@tippy.js/react'

import Chan from './Chan'

class Sidebar extends React.Component {

  state = {searchFocus: false}

  render() {
    const {openNewBoard, clients} = this.props;
    const {searchFocus} = this.state;
    return (
      <div className={style.col} id={style.chancol}>

        <div className={style.menu}>

          <Tippy content="Link to server">
            <div className={style.menuButton}>
              <i className="fas fa-link"></i>
            </div>
          </Tippy>

          <Tippy content="Unlink from server">
            <div className={style.menuButton}>
              <i className="fas fa-unlink"></i>
            </div>
          </Tippy>

          <Tippy content="Settings">
            <div className={style.menuButton}>
              <i className="fas fa-cog"></i>
            </div>
          </Tippy>

        </div>

        <div className={style.searchBar}>
          <input placeholder="Query..."
            onFocus={() => this.setState({searchFocus: true})}
            onBlur={() => this.setState({searchFocus: false})} />
          <i style={{color: "#fff"}} className="fas fa-search"></i>
        </div>

        <Transition
          items={searchFocus}
          from={{ maxHeight: '0px' }}
          enter={{ maxHeight: '200px' }}
          leave={{ maxHeight: '0px' }}>
          {searchFocus =>
            searchFocus &&
            (props =>
              <div style={{...props, overflow: "hidden"}}>
                <div className={style.searchInfoBox}>
                  <p><strong>Search Format</strong></p>
                  <p><strong>#username</strong> filters by user</p>
                  <p><strong>@server</strong> filters by federated server</p>
                  <p><strong>~term</strong> removes results containing the term</p>
                  <p><strong>"term"</strong> use exact instead of fuzzy matching</p>
                </div>
              </div>
            )}
        </Transition>

        <div className={style.colContent}>

          <Transition
            items={clients}
            keys={(item) => clients.indexOf(item)}
            from={{ opacity: 0, transform: 'translate3d(0,40px,0)', maxHeight: '1000px', marginTop: '20px'}}
            enter={{ opacity: 1, transform: 'translate3d(0,0px,0)', maxHeight: '1000px', marginTop: '20px'}}
            leave={{ opacity: -1, transform: 'translate3d(0,0px,0)', maxHeight: '0px',    marginTop: '0px'}}>
            {item => props => <Chan openNewBoard={openNewBoard} client={item} springStyle={props} />}
          </Transition>

        </div>
      </div>
    )
  }

}

export default Sidebar
