/* eslint-disable no-unused-vars */
import React, {Component, Fragment} from "react";
import Swipeable from "react-swipy"

import Beatcard from "../Beatcard"

const wrapperStyles = {position: "relative", width: "250px", height: "250px"};
const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12,
};

const cards = [];
for (let i=0;i < 20; i++) {
  cards.push(<ImageCard />)
}


class App extends Component {
  state = {
    // cards: ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "7th", "8th", "9inth", "Tinth"],
    cards
  };

  remove = () =>
    this.setState(({cards}) => ({
      cards: cards.slice(1, cards.length),
    }));

  render() {
    const {cards} = this.state;

    return (
      <Fragment>
      <div style={{margin:"3vh", textAlign: "center"}}>
        <div style={wrapperStyles}>
          {cards.length > 0 ? (
            <div style={wrapperStyles}>
              <Swipeable id="SWIPABLE"
                limit={100}
                buttons={({left, right}) => (
                  <div style={actionsStyles}>
                    <Button onClick={left}>Reject</Button>
                    <Button onClick={right}>Accept</Button>
                  </div>
                )}
                onAfterSwipe={this.remove}
              >
              <div id="SWIPABLE_CARD"> {cards[0]} </div>
              </Swipeable>
              {cards.length > 1 && <Card zIndex={-1}>{cards[1]}</Card>}
            </div>
          ) : (
            <Card zIndex={-2}>No more cards</Card>
          )}
        </div>
      </div>
      <div />
      </Fragment>
    );
  }
}

export default App;