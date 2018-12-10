import React from 'react'
import style from '../style.sass'

import { Query, Mutation } from "react-apollo";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

import { Transition, Spring } from 'react-spring'

import TextareaAutosize from 'react-autosize-textarea';

const getThread = gql`
  query Thread($id: Int) {
    thread(id: $id) {
      name
      posts {
        author
        message
        id
      }
    }
  }
`

const newPost = gql`
  mutation addPost($id: Int, $message: String, $author: String) {
    addPost(threadID: $id, message: $message, author: $author) {
      id
      message
      author
    }
  }
`

class AddPost extends React.Component {
  state = {author: "", message: ""}

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
    const {author, message} = this.state;

    return (
      <Mutation
        mutation={newPost}
        update={(cache, { data: { addPost } }) => {
          const { thread } = cache.readQuery({ query: getThread, variables: { id: id } });
          cache.writeQuery({
            query: getThread,
            data: { thread: { name: thread.name, posts: thread.posts.concat([addPost]) } },
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
                name="author"
                type="text"
                placeholder="Anonymous"
                value={this.state.author}
                onChange={this.handleInputChange} />
              <div className={style.inputBorder} />
            </div>

            <Spring
              from={{ opacity: (message === "") ? '0.4' : '0.4' }}
              to={{   opacity: (message === "") ? '0.4' : '1' }}>
              {props => (
                <i style={{...props, color: '#3498db', fontSize: '1.5em'}}
                   className="fas fa-check-circle"
                   onClick={ () => {
                     if (!(message === "")) {
                       update({ variables: { id, author: (author || "Anonymous"), message } });
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

class Thread extends React.Component {

  state = {addingNewPost: false}

  endAdd = () => {
    this.setState({addingNewPost: false})
  }


  render() {
    const {springStyle, closeThread, id, client, hash} = this.props;
    const {addingNewPost} = this.state;
    return (
      <ApolloProvider client={client}>
      <Query query={getThread} pollInterval={10000} variables={{ id: id }}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          } else {
            return (
              <div className={style.metacard} style={springStyle}>
                <div className={`${style.metacardheader} ${style.header}`} onClick={() => closeThread(id, hash)}>
                  <p>{data.thread.name}</p>
                  <Spring
                    from={{ transform: addingNewPost ? 'rotate(0deg)' : 'rotate(135deg)' }}
                    to={{ transform: addingNewPost ? 'rotate(135deg)' : 'rotate(0deg)' }}>
                    {props =>
                      <i style={{...props, marginRight: '4px'}}
                         className="fas fa-plus"
                         onClick={(e) => {
                           e.stopPropagation()
                           this.setState({addingNewPost: !addingNewPost})
                         }} />}
                  </Spring>
                </div>
                {data.thread.posts.map((x) =>
                  <div className={style.card}>
                    <div className={style.postmeta}>
                      <span>{x.author}</span>
                      <span>{"No. " + x.id}</span>
                    </div>
                    <p>{x.message}</p>
                  </div>
                )}
                <Transition
                  items={addingNewPost}
                  from={{ maxHeight: '0px' }}
                  enter={{ maxHeight: '300px' }}
                  leave={{ maxHeight: '0px' }}>
                  {addingNewPost =>
                    addingNewPost &&
                    (props => <AddPost id={id} endAdd={this.endAdd} springStyle={props} />)}
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

export default Thread
