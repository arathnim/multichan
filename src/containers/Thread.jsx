import React from 'react'
import style from '../style.sass'

import { Query } from "react-apollo";
import gql from "graphql-tag";

const Thread = ({ id, springStyle }) => (
  <Query variables={{ id: id }} pollInterval={10000}
    query={gql`
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
    `}

  >

    {({ loading, error, data }) => {
      if (loading || error) {
        return null;
      } else {
        return (
          <div className={style.metacard} style={springStyle}>
            <div className={`${style.metacardheader} ${style.header}`}>
              <p>{data.thread.name}</p>
              <i style={{marginRight: '4px'}} className="fas fa-ellipsis-v"></i>
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
          </div>
        )
      }
    }

    }
  </Query>
);

export default Thread
