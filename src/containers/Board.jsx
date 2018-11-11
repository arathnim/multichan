import React from 'react'
import style from '../style.sass'

import { Query } from "react-apollo";
import gql from "graphql-tag";

const Board = ({ id, openNewThread, springStyle }) => (
  <Query variables={{ id: id }} pollInterval={10000}
    query={gql`
      query Board($id: Int) {
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
    `}

  >

    {({ loading, error, data }) => {
      if (loading || error) {
        return null;
      } else {
        return (
          <div className={style.metacard} style={springStyle}>
            <div className={`${style.metacardheader} ${style.header}`}>
              <p>{data.board.name}</p>
              <i style={{marginRight: '4px'}} className="fas fa-ellipsis-v"></i>
            </div>
            {data.board.threads.map((x) =>
              <div className={style.card} onClick={() => openNewThread(x.id)}>
                <div className={`${style.threadmeta} ${style.flexrow}`}>
                  <p>{x.name}</p>
                  <p>{x.posts[0].author}</p>
                </div>
                <p>{x.posts[0].message}</p>
              </div>
            )}
          </div>
        )
      }
    }
    }
  </Query>
);

export default Board
