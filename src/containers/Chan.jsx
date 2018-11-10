import React from 'react'
import style from '../style.sass'

import newBoard from '../index.jsx'

import { Query } from "react-apollo";
import gql from "graphql-tag";

const Chan = () => (
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
    {({ loading, error, data }) =>
      <div className={style.metacard}>
        <div className={`${style.metacardheader} ${style.header}`}>
          <p>{loading ? "loading" : (error ? "error" : data.name)}</p>
          <i className="fas fa-ellipsis-v"></i>
        </div>
        {(!loading && !error) && data.boards.map((x) =>
          <div className={`${style.card} ${style.flexrow}`} onClick={() => newBoard(x.id)}>
            <p>{x.name}</p>
            <p>{x.description}</p>
          </div>
        )}
      </div>
    }
  </Query>
);

console.log(newBoard)

export default Chan
