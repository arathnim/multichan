import React from 'react'
import style from '../style.sass'

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Transition } from 'react-spring'

const Chan = ({ openNewBoard, springStyle }) => (
  <Query
    query={gql`
      query {
          name
          boards {
            name
            description
            id
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
              <p>{data.name}</p>
              <i style={{marginRight: '4px'}} className="fas fa-ellipsis-v"></i>
            </div>
            {data.boards.map((x) =>
              <div className={`${style.card} ${style.flexrow}`} onClick={() => openNewBoard(x.id)}>
                <p>{x.name}</p>
                <p>{x.description}</p>
              </div>
            )}
          </div>
        )
      }
    }
    }
  </Query>
);

export default Chan
