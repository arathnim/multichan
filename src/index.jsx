import React from 'react'
import { render } from 'react-dom'

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import style from './style.sass'

import history from './history'

import Chan from './containers/Chan'

const client = new ApolloClient({
  uri: "./graphql"
});

// {openBoards.map((b) => <Board id={b}>)}

class Init extends React.Component {

  state = {openBoards: [], openThreads: []}

  newBoard(id) {
    console.log('reached newBoard')
    if (this.state.openBoards.includes(id)) {
      // TODO: scroll to it
    } else {
      this.setState({openBoards: this.state.openBoards.concat([id])});
      const boards = document.getElementById(style.boardcol).getElementsByClassName(style.metacard);
      boardWindowInstance.scroll(boards[boards.length - 1], 300, "easeInOutSine")
    }
  }

  newThread(id) {

  }

  render() {
      return (
        <ApolloProvider client={client}>
          <div className={style.root}>
            <div className={style.col} id={style.chancol}>
              <Chan openNewBoard={this.newBoard} />
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
        </ApolloProvider>
      );
    }
}

document.title="multichan"

render(<Init />, document.getElementById('main'))

var chanWindowInstance, boardWindowInstance, threadWindowInstance;

document.addEventListener("DOMContentLoaded", function() {
  chanWindowInstance   = OverlayScrollbars(document.getElementById(style.chancol),   { scrollbars: { visibility: 'hidden'} });
  boardWindowInstance  = OverlayScrollbars(document.getElementById(style.boardcol),  { scrollbars: { visibility: 'hidden'} });
  threadWindowInstance = OverlayScrollbars(document.getElementById(style.threadcol), { scrollbars: { visibility: 'hidden'} });
});
