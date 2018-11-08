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
            <div className={style.col} id={style.chancol}>

              <div className={style.metacard}>
                <div className={`${style.metacardheader} ${style.header}`}>
                  <p>Eggchan</p>
                  <i className="fas fa-ellipsis-v"></i>
                </div>
                <div className={`${style.card} ${style.flexrow}`}>
                  <p>/ck/</p>
                  <p>cooking</p>
                </div>
                <div className={`${style.card} ${style.flexrow}`}>
                  <p>/diy/</p>
                  <p>do it yourself</p>
                </div>
                <div className={`${style.card} ${style.flexrow}`}>
                  <p>/p/</p>
                  <p>programming</p>
                </div>
                <div className={`${style.card} ${style.flexrow}`}>
                  <p>/r/</p>
                  <p>rice</p>
                </div>
              </div>

              <div className={style.metacard}>
                <div className={`${style.metacardheader} ${style.header}`}>
                  <p>Lainchan</p>
                  <i className="fas fa-ellipsis-v"></i>
                </div>
                <div className={`${style.card} ${style.flexrow}`}>
                  <p>/λ/</p>
                  <p>programming</p>
                </div>
                <div className={`${style.card} ${style.flexrow}`}>
                  <p>/diy/</p>
                  <p>do it yourself</p>
                </div>
                <div className={`${style.card} ${style.flexrow}`}>
                  <p>/sec/</p>
                  <p>security</p>
                </div>
                <div className={`${style.card} ${style.flexrow}`}>
                  <p>/Ω/</p>
                  <p>technology</p>
                </div>
                <div className={`${style.card} ${style.flexrow}`}>
                  <p>/inter/</p>
                  <p>interactive media</p>
                </div>
                <div className={`${style.card} ${style.flexrow}`}>
                  <p>/lit/</p>
                  <p>literature</p>
                </div>
              </div>

            </div>

            <div className={style.col} id={style.boardcol}>

              <div className={style.metacard}>
                <div className={`${style.metacardheader} ${style.header}`}>
                  <p>Eggchan /p/</p>
                  <i className="fas fa-ellipsis-v"></i>
                </div>
                <div className={style.card}>
                  <div className={`${style.threadmeta} ${style.flexrow}`}>
                    <p>Contributions</p>
                    <p>Arathnim, yesterday</p>
                  </div>
                  <p>This site brought to you by react.js, codepen, lambdacomplex, dysfigured, arathnim, and delicious apple brandy.</p>
                </div>
                <div className={style.card}>
                  <div className={`${style.threadmeta} ${style.flexrow}`}>
                    <p>Go Thread</p>
                    <p>Lambda, 2 days ago</p>
                  </div>
                  <p>Go Thread? Go Thread.</p>
                </div>
                <div className={style.card}>
                  <div className={`${style.threadmeta} ${style.flexrow}`}>
                    <p>Lisp General</p>
                    <p>Anonymous, a week ago</p>
                  </div>
                  <p>Commence your worship of the programmable programming language.</p>
                </div>
              </div>

              <div className={style.metacard}>
                <div className={`${style.metacardheader} ${style.header}`}>
                  <p>Eggchan /ck/</p>
                  <i className="fas fa-ellipsis-v"></i>
                </div>
                <div className={style.card}>
                  <div className={`${style.threadmeta} ${style.flexrow}`}>
                    <p>/CG/ - Cheese General</p>
                    <p>Anonymous, a week ago</p>
                  </div>
                  <p>So, I think my latest queso fresco turned out pretty good. I need to order some rennet so I can make some mozzarella or something.</p>
                </div>
              </div>

              <div className={style.metacard}>
                <div className={`${style.metacardheader} ${style.header}`}>
                  <p>Eggchan /diy/</p>
                  <i className="fas fa-ellipsis-v"></i>
                </div>
                <div className={style.card}>
                  <div className={`${style.threadmeta} ${style.flexrow}`}>
                    <p>Eggchan General</p>
                    <p>Anonymous, 3 day ago</p>
                  </div>
                  <p>Eggchan is /diy/, right? (tbh i'm gonna spam this thread to test shit)</p>
                </div>
                <div className={style.card}>
                  <div className={`${style.threadmeta} ${style.flexrow}`}>
                    <p>Layout on mobile</p>
                    <p>Anonymous, 5 day ago</p>
                  </div>
                  <p>It seems broken. Threads appear to be indented, giving the impression they are replies to other threads.</p>
                </div>
              </div>

            </div>

            <div className={style.col} id={style.threadcol}>

              <div className={style.metacard}>
                <div className={`${style.metacardheader} ${style.header}`}>
                  <p>/CG/ - Cheese General</p>
                  <i className="fas fa-ellipsis-v"></i>
                </div>
                <div className={style.card}>
                  <div className={style.postmeta}>
                    <span>Anonymous</span>
                    <span>No. 1</span>
                  </div>
                  <p>So, I think my latest queso fresco turned out pretty good. I need to order some rennet so I can make some mozzarella or something.</p>
                </div>
                <div className={style.card}>
                  <div className={style.postmeta}>
                    <span>Anonymous</span>
                    <span>No. 2</span>
                  </div>
                  <p>Pictures?</p>
                </div>
              </div>

              <div className={style.metacard}>
                <div className={`${style.metacardheader} ${style.header}`}>
                  <p>React!</p>
                  <i className="fas fa-ellipsis-v"></i>
                </div>
                <div className={style.card}>
                  <div className={style.postmeta}>
                    <span>Anonymous</span>
                    <span>No. 34</span>
                  </div>
                  <p>this site brought to you by react.js</p>
                </div>
                <div className={style.card}>
                  <div className={style.postmeta}>
                    <span>Anonymous</span>
                    <span>No. 50</span>
                  </div>
                  <p>it's beautiful i love it</p>
                </div>
              </div>

              <div className={style.metacard}>
                <div className={`${style.metacardheader} ${style.header}`}>
                  <p>Go Thread</p>
                  <i className="fas fa-ellipsis-v"></i>
                </div>
                <div className={style.card}>
                  <div className={style.postmeta}>
                    <span>Anonymous</span>
                    <span>No. 1</span>
                  </div>
                  <p>Go Thread? Go Thread.</p>
                </div>
                <div className={style.card}>
                  <div className={style.postmeta}>
                    <span>Anonymous</span>
                    <span>No. 2</span>
                  </div>
                  <p>Yeah, go is comfy tbh</p>
                </div>
                <div className={style.card}>
                  <div className={style.postmeta}>
                    <span>Anonymous</span>
                    <span>No. 39</span>
                  </div>
                  <p>lol no generics</p>
                </div>
                <div className={style.card}>
                  <div className={style.postmeta}>
                    <span>Anonymous</span>
                    <span>No. 41</span>
                  </div>
                  <p>test</p>
                </div>
                <div className={style.card}>
                  <div className={style.postmeta}>
                    <span>Anonymous</span>
                    <span>No. 50</span>
                  </div>
                  <p>Go sucks</p>
                </div>
              </div>

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
          [document.getElementById(style.chancol), document.getElementById(style.boardcol), document.getElementById(style.threadcol)],
          { scrollbars: { visibility: 'hidden'} }
        );
});
