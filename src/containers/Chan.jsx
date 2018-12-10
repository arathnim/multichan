import React from 'react'
import style from '../style.sass'

import { Query, Mutation } from "react-apollo";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

import { Transition, Spring } from 'react-spring'

import Tippy from '@tippy.js/react'

const getChan = gql`
  {
    name
    boards {
      name
      description
      id
    }
  }
`

const newBoard = gql`
  mutation newBoard($name: String, $description: String) {
    addBoard(name: $name, description: $description) {
      id
      name
      description
    }
  }
`

class AddBoard extends React.Component {
  state = {boardName: "", boardDescription: ""}

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {springStyle, endAdd} = this.props;
    const {boardName, boardDescription} = this.state;

    return (
      <Mutation
        mutation={newBoard}
        update={(cache, { data: { addBoard } }) => {
          const { name, boards } = cache.readQuery({ query: getChan });
          console.log([addBoard, boards, name])
          cache.writeQuery({
            query: getChan,
            data: { name: name, boards: boards.concat([addBoard]) }
          });
        }}
      >
      {update => (
        <div style={{...springStyle, overflow: 'hidden'}}>
          <div className={`${style.card} ${style.flexrow}`}>
            <div>
              <input
                name="boardName"
                type="text"
                placeholder="/board/"
                value={this.state.boardName}
                onChange={this.handleInputChange} />
              <div className={style.inputBorder} />
              <input
                name="boardDescription"
                type="text"
                placeholder="description"
                value={this.state.boardDescription}
                onChange={this.handleInputChange} />
              <div className={style.inputBorder} />
            </div>

            <Spring
              from={{ opacity: (boardName === "" || boardDescription === "") ? '0.4' : '0.4' }}
              to={{   opacity: (boardName === "" || boardDescription === "") ? '0.4' : '1' }}>
              {props => (
                <i style={{...props, marginRight: '4px', color: '#3498db', fontSize: '1.5em'}}
                   className="fas fa-check-circle"
                   onClick={ () => {
                     if (!(boardName === "" || boardDescription === "")) {
                       update({ variables: { name: boardName, description: boardDescription } });
                       endAdd();
                     }
                   }
                   } />
              )}
            </Spring>

          </div>
        </div>
      )}
      </Mutation>
    )
  }
}

class Chan extends React.Component {

  state = {addingNewBoard: false}

  endAdd = () => {
    this.setState({addingNewBoard: false})
  }

  render() {
    const {springStyle, openNewBoard, client} = this.props;
    const {addingNewBoard} = this.state;
    return (
      <ApolloProvider client={client}>
      <Query query={getChan} pollInterval={10000}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return null;
          } else {
            return (
              <div className={style.metacard} style={springStyle}>
                <div className={`${style.metacardheader} ${style.header}`}>
                  <p>{data.name}</p>
                  <Spring
                    from={{ transform: addingNewBoard ? 'rotate(0deg)' : 'rotate(135deg)' }}
                    to={{ transform: addingNewBoard ? 'rotate(135deg)' : 'rotate(0deg)' }}>
                    {props =>
                      <Tippy content={addingNewBoard ? 'Cancel' : 'New post'}>
                        <i style={{...props, marginRight: '4px'}}
                           className="fas fa-plus"
                           onClick={() => this.setState({addingNewBoard: !addingNewBoard})} />
                      </Tippy>
                      }
                  </Spring>
                </div>
                {data.boards.map((x) =>
                  <div className={`${style.card} ${style.flexrow}`} onClick={() => openNewBoard(x.id, client, x.id + x.name + x.description + data.name)}>
                    <p>{x.name}</p>
                    <p>{x.description}</p>
                  </div>
                )}
                <Transition
                  items={addingNewBoard}
                  from={{ maxHeight: '0px' }}
                  enter={{ maxHeight: '100px' }}
                  leave={{ maxHeight: '0px' }}>
                  {addingNewBoard =>
                    addingNewBoard &&
                    (props => <AddBoard endAdd={this.endAdd} springStyle={props} />)}
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

export default Chan
