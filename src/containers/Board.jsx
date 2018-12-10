import React from 'react'
import style from '../style.sass'

import { Query, Mutation } from "react-apollo";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

import { Transition, Spring } from 'react-spring'

import Tippy from '@tippy.js/react'

import TextareaAutosize from 'react-autosize-textarea';

const getBoard = gql`
  query board($id: Int){
    board(id: $id) {
      name
      threads {
        name
        id
        posts {
          author
          message
        }
      }
    }
  }
`

const newThread = gql`
  mutation addThread($id: Int, $title: String, $message: String, $author: String) {
    addThread(boardID: $id, name: $title, message: $message, author: $author) {
      id
      name
      posts {
        author
        message
      }
    }
  }
`

class AddThread extends React.Component {
  state = {author: "", title: "", message: ""}

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {springStyle, endAdd, id} = this.props;
    const {author, title, message} = this.state;

    return (
      <Mutation
        mutation={newThread}
        update={(cache, { data: { addThread } }) => {
          console.log([addThread])
          const { board }= cache.readQuery({ query: getBoard, variables: { id: id } });
          console.log([board, board.name, board.threads, addThread])
          cache.writeQuery({
            query: getBoard,
            data: { board: { name: board.name, threads: board.threads.concat([addThread]) } },
            variables: { id }
          });
        }}
      >
      {update => (
        <div style={{...springStyle, overflow: 'hidden'}}>
          <div className={style.card}>

          <div className={style.flexrow} style={{width: '100%'}}>
            <div>
              <input
                name="title"
                type="text"
                placeholder="Title"
                value={this.state.title}
                onChange={this.handleInputChange} />
              <div className={style.inputBorder} />
              <input
                name="author"
                type="text"
                placeholder="Anonymous"
                value={this.state.author}
                onChange={this.handleInputChange} />
              <div className={style.inputBorder} />
            </div>

            <Spring
              from={{ opacity: (message === "" || title === "") ? '0.4' : '0.4' }}
              to={{   opacity: (message === "" || title === "") ? '0.4' : '1' }}>
              {props => (
                <i style={{...props, marginRight: '4px', color: '#3498db', fontSize: '1.5em'}}
                   className="fas fa-check-circle"
                   onClick={ () => {
                     if (!(message === "" || title === "")) {
                       update({ variables: { id, author: (author || "Anonymous"), message, title } });
                       endAdd();
                     }
                   }
                   } />
              )}
            </Spring>
          </div>

          <div>
            <TextareaAutosize
              name="message"
              type="text"
              maxRows={10}
              placeholder="Post"
              value={this.state.message}
              onChange={this.handleInputChange} />
            <div className={style.inputBorder} />
          </div>

          </div>
        </div>
      )}
      </Mutation>
    )
  }
}

class Board extends React.Component {

  state = {addingNewThread: false}

  endAdd = () => {
    this.setState({addingNewThread: false})
  }


  render() {
    const {springStyle, openNewThread, closeBoard, id, client, hash} = this.props;
    const {addingNewThread} = this.state;
    return (
      <ApolloProvider client={client}>
      <Query query={getBoard} pollInterval={10000} variables={{ id: id }}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          } else {
            return (
              <div className={style.metacard} style={springStyle}>
                <div className={`${style.metacardheader} ${style.header}`} onClick={() => closeBoard(id, hash)}>
                  <p>{data.board.name}</p>
                  <Spring
                    from={{ transform: addingNewThread ? 'rotate(0deg)' : 'rotate(135deg)' }}
                    to={{ transform: addingNewThread ? 'rotate(135deg)' : 'rotate(0deg)' }}>
                    {props =>
                        <i style={{...props, marginRight: '4px'}}
                           className="fas fa-plus"
                           onClick={(e) => {
                             e.stopPropagation()
                             this.setState({addingNewThread: !addingNewThread})
                           }} />
                    }
                  </Spring>
                </div>
                {data.board.threads.map((x) =>
                  <div className={style.card} onClick={() => openNewThread(x.id, client, hash + x.id + x.name + x.posts[0].message)}>
                    <div className={`${style.threadmeta} ${style.flexrow}`}>
                      <p>{x.name}</p>
                      <p>{x.posts[0].author}</p>
                    </div>
                    <p>{x.posts[0].message}</p>
                  </div>
                )}
                <Transition
                  items={addingNewThread}
                  from={{ maxHeight: '0px' }}
                  enter={{ maxHeight: '300px' }}
                  leave={{ maxHeight: '0px' }}>
                  {addingNewThread =>
                    addingNewThread &&
                    (props => <AddThread id={id} endAdd={this.endAdd} springStyle={props} />)}
                </Transition>
              </div>
            )
          }
        }
        }
      </Query>
      </ApolloProvider>
    )
  }

}

export default Board
