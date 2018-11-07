import React from 'react'
import { render } from 'react-dom'
import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom'

import style from './style.sass'

import history from './history'

class Init extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <Router history={history}>
          <div className={style.root}>
            <div className={style.col} id="chancol">
            </div>

            <div className={style.col} id="boardcol">
            </div>

            <div className={style.col} id="threadcol">
            </div>


          </div>
        </Router>
      );
    }
}

document.title="multichan"

render(<Init />, document.getElementById('main'))

document.addEventListener("DOMContentLoaded", function() {
        OverlayScrollbars(
          [document.getElementById('chancol'), document.getElementById('boardcol'), document.getElementById('threadcol')],
          { scrollbars: { visibility: 'hidden'} }
        );
});
