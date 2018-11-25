import React from 'react'
import { render } from 'react-dom'

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import style from './style.sass'

import history from './history'

import Chan from './containers/Chan'
import Board from './containers/Board'
import Thread from './containers/Thread'

import { Transition } from 'react-spring'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class Init extends React.Component {

  state = {openBoards: [], openThreads: []}

  newBoard = (id) => {
    if (this.state.openBoards.includes(id)) {
      // TODO: scroll to it
    } else {
      this.setState({openBoards: this.state.openBoards.concat([id])});
      // const boards = document.getElementById(style.boardcol).getElementsByClassName(style.metacard);
      // boardWindowInstance.scroll(boards[boards.length - 1], 300, "easeInOutSine")
    }
  }

  newThread = (id) => {
    if (this.state.openThreads.includes(id)) {
      // TODO: scroll to it
    } else {
      this.setState({openThreads: this.state.openThreads.concat([id])});
      // const boards = document.getElementById(style.boardcol).getElementsByClassName(style.metacard);
      // boardWindowInstance.scroll(boards[boards.length - 1], 300, "easeInOutSine")
    }
  }

  closeBoard = (id) => {
    if (this.state.openBoards.includes(id)) {
      this.setState({openBoards: this.state.openBoards.filter(x => x != id)});
    } else {
      console.log('tried to close non-existant board')
    }
  }

  closeThread = (id) => {
    if (this.state.openThreads.includes(id)) {
      this.setState({openThreads: this.state.openThreads.filter(x => x != id)});
    } else {
      console.log('tried to close non-existant thread')
    }
  }

  render() {
      return (
        <ApolloProvider client={client}>
          <div className={style.root}>

            <div className={style.col} id={style.chancol}>
              <div className={style.colContent}>

                <Transition
                  items={true}
                  from={{ opacity: 0, transform: 'translate3d(0,40px,0)', maxHeight: '1000px', marginTop: '20px'}}
                  enter={{ opacity: 1, transform: 'translate3d(0,0px,0)', maxHeight: '1000px', marginTop: '20px'}}
                  leave={{ opacity: -1, transform: 'translate3d(0,0px,0)', maxHeight: '0px',    marginTop: '0px'}}>
                  {item => props => <Chan openNewBoard={this.newBoard} springStyle={props} />}
                </Transition>

              </div>
            </div>

            <div className={style.col} id={style.boardcol}>
              <div className={style.colContent}>

                <Transition
                  items={this.state.openBoards}
                  from={{ opacity: 0, transform: 'translate3d(0,40px,0)', maxHeight: '1000px', marginTop: '20px'}}
                  enter={{ opacity: 1, transform: 'translate3d(0,0px,0)', maxHeight: '1000px', marginTop: '20px'}}
                  leave={{ opacity: -1, transform: 'translate3d(0,0px,0)', maxHeight: '0px',    marginTop: '0px'}}>
                  {item => props => <Board id={item} springStyle={props} openNewThread={this.newThread} closeBoard={this.closeBoard} />}
                </Transition>

              </div>
            </div>

            <div className={style.col} id={style.threadcol}>
              <div className={style.colContent}>

                <Transition
                  items={this.state.openThreads}
                  from={{ opacity: 0, transform: 'translate3d(0,40px,0)', maxHeight: '1000px', marginTop: '20px'}}
                  enter={{ opacity: 1, transform: 'translate3d(0,0px,0)', maxHeight: '1000px', marginTop: '20px'}}
                  leave={{ opacity: -1, transform: 'translate3d(0,0px,0)', maxHeight: '0px',    marginTop: '0px'}}>
                  {item => props => <Thread id={item} springStyle={props} closeThread={this.closeThread} />}
                </Transition>

              </div>
            </div>


          </div>
        </ApolloProvider>
      );
    }
}

document.title="multichan"

render(<Init />, document.getElementById('main'))
