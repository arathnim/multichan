import React from 'react'
import style from '../style.sass'

// import newBoard from '../index'
// onClick={() => newBoard(x.id)

import { Query } from "react-apollo";
import gql from "graphql-tag";

const Chan = () => (
  <Query
    query={gql`
      {
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
      if (loading) return <p>Loading</p>;
      if (error) return <p>Error</p>;

      return(
        <div style={{color: '#0ff'}}>
            <p>{data.name}</p>
        </div>
      );
    }}
  </Query>
);

export default Chan

/*

<div className={style.metacard}>
  <div className={`${style.metacardheader} ${style.header}`}>
    <p>{data.name}</p>
    <i className="fas fa-ellipsis-v"></i>
  </div>
  {data.boards.map((x) =>
    <div className={`${style.card} ${style.flexrow}`}>
      <p>{x.name}</p>
      <p>{x.description}</p>
    </div>
  )}
</div>

*/
