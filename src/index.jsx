import React from 'react'
import { render } from 'react-dom'

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import style from './style.sass'

import history from './history'

import Chan from './containers/Chan'
import Board from './containers/Board'
import Thread from './containers/Thread'
import Sidebar from './containers/Sidebar'

import { Transition } from 'react-spring'

import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/dist/themes/light.css'

tippy.setDefaults({
  theme: "light",
  delay: [500, null]
})

const initialClient = "http://localhost:4000/graphql"

class Init extends React.Component {

  state = {openBoards: [], openThreads: [], clients: [new ApolloClient({uri: initialClient}), new ApolloClient({uri: "https://arathnim.me/multichan/graphql"})]}

  newBoard = (id, client, hash) => {
    if (this.state.openBoards.map(x => x.hash).includes(hash)) {
      // TODO: scroll to it
    } else {
      this.setState({openBoards: this.state.openBoards.concat([ {id, client, hash} ])});
      // const boards = document.getElementById(style.boardcol).getElementsByClassName(style.metacard);
      // boardWindowInstance.scroll(boards[boards.length - 1], 300, "easeInOutSine")
    }
  }

  newThread = (id, client, hash) => {
    if (this.state.openThreads.map(x => x.hash).includes(hash)) {
      // TODO: scroll to it
    } else {
      this.setState({openThreads: this.state.openThreads.concat([ {id, client, hash} ])});
      // const boards = document.getElementById(style.boardcol).getElementsByClassName(style.metacard);
      // boardWindowInstance.scroll(boards[boards.length - 1], 300, "easeInOutSine")
    }
  }

  closeBoard = (id, hash) => {
    if (this.state.openBoards.map(x => x.hash).includes(hash)) {
      this.setState({openBoards: this.state.openBoards.filter(x => x.hash != hash)});
    } else {
      console.log('tried to close non-existant board')
    }
  }

  closeThread = (id, hash) => {
    if (this.state.openThreads.map(x => x.hash).includes(hash)) {
      this.setState({openThreads: this.state.openThreads.filter(x => x.hash != hash)});
    } else {
      console.log('tried to close non-existant thread')
    }
  }

  render() {
      return (
          <div className={style.root}>

            <Sidebar openNewBoard={this.newBoard} clients={this.state.clients}/>

            <div className={style.col} id={style.boardcol}>
              <div className={style.colContent}>

                <div className={style.colspacer} />

                <Transition
                  items={this.state.openBoards}
                  keys={(item) => item.hash}
                  from={{ opacity: 0, transform: 'translate3d(0,40px,0)', maxHeight: '1000px', marginTop: '20px'}}
                  enter={{ opacity: 1, transform: 'translate3d(0,0px,0)', maxHeight: '1000px', marginTop: '20px'}}
                  leave={{ opacity: -1, transform: 'translate3d(0,0px,0)', maxHeight: '0px',    marginTop: '0px'}}>
                  {item => props =>
                    <Board id={item.id} client={item.client} hash={item.hash} springStyle={props} openNewThread={this.newThread} closeBoard={this.closeBoard} />
                  }
                </Transition>

              </div>
            </div>

            <div className={style.col} id={style.threadcol}>
              <div className={style.colContent}>

                <div className={style.colspacer} />

                <Transition
                  items={this.state.openThreads}
                  keys={(item) => item.hash}
                  from={{ opacity: 0, transform: 'translate3d(0,40px,0)', maxHeight: '1000px', marginTop: '20px'}}
                  enter={{ opacity: 1, transform: 'translate3d(0,0px,0)', maxHeight: '1000px', marginTop: '20px'}}
                  leave={{ opacity: -1, transform: 'translate3d(0,0px,0)', maxHeight: '0px',    marginTop: '0px'}}>
                  {item => props => <Thread id={item.id} client={item.client} hash={item.hash} springStyle={props} closeThread={this.closeThread} />}
                </Transition>

              </div>
            </div>


          </div>
      );
    }
}

document.title="Multichan"

render(<Init />, document.getElementById('main'))
