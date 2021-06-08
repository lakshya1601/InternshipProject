import React, { Component } from "react";

export default class ScoreTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Scores: [],
    };
  }

  /*
        Setup Connection to Communicate-
            - Parent
            - Sibling (Form Element)
    */
  componentDidMount = () => {
    if (this.props.TableEventHandler) {
      this.props.TableEventHandler(this.EventHandler);
    }
  };

  EventHandler = (event, data) => {
    console.log("SIBLING table EVENT HANDLER", "event", event, "data", data);

    switch (event) {
      case "submit_data_to_table":
        this.HandleTable("add", data);
        break;

      default:
        break;
    }
  };

  //   'data' can be 'data to push' or 'index to use to remove subject', depends on the 'action' value
  HandleTable = (action, data) => {
    // create copy of data
    let temp = [];
    temp = [...this.state.Scores];
    //
    if (action === "add") {
      // check if request is while editing
      if (data.Editing) {
        // find the index in array using the local track we kept
        let check = this.state.Scores.findIndex((ele) => {
          return ele.UID === data.UID;
        });
        if (check !== 1) {
          temp[check] = {
            ...data,
            Editing: false,
          };
        }
      } else {
        temp.push(data);
      }
    } else if (action === "remove") {
      temp.splice(data, 1);
    } else {
      console.log("what?!");
    }

    this.setState({
      Scores: temp,
    });
  };

  EditRequest = (score, index) => {
    if (this.props.NotifyParent) {
      this.props.NotifyParent("table", "update_data", score);
    }
    // create copy
    let temp = [];
    temp = [...this.state.Scores];
    if (index || index === 0) {
      temp[index] = {
        ...temp[index],
        Editing: true,
      };
    }

    // keep local track
    this.setState({
      Scores: temp,
    });
    //
  };

  FethScore = (drink) => {
    let sum = 0;
    this.state.Scores.forEach((score) => {
      if (drink === score.Cocktail) {
        sum += parseInt(score.Points);
      }
    });
    return sum;
  };

  render() {
    return (
      <div className="score-table">
        <h1>Entries</h1>
        {/* Scores */}
        <div className="scores">
          <label className="score-card">{`#1 Malta(${this.FethScore(
            "Malta"
          )})`}</label>
          <label className="score-card">{`#2 Sönfee(${this.FethScore(
            "Sönfee"
          )})`}</label>
          <label className="score-card">{`#3 Santrá(${this.FethScore(
            "Santrá"
          )})`}</label>
        </div>
        {/* Headers */}
        <div className="tab-headers bckgrnd-y flex">
          <div className="header">Name</div>
          <div className="header">Cocktail</div>
          <div className="header">Points Given</div>
          <div className="header">Action</div>
        </div>
        {/* Table Data */}
        <div className="tab-data">
          {this.state.Scores.map((score, index) => {
            return (
              <div className="data-row flex">
                <div className="data-item">{score.PersonName}</div>
                <div className="data-item">{score.Cocktail}</div>
                <div className="data-item">{score.Points}</div>
                <div className="data-item">
                  {!score.Editing ? (
                    <>
                      <button
                        className="hand"
                        onClick={() => {
                          this.EditRequest(score, index);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="hand"
                        onClick={() => {
                          this.HandleTable("remove", index);
                        }}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    "Editing"
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {this.state.Scores.length === 0 ? (
          <div className="no-data">No Data</div>
        ) : null}
      </div>
    );
  }
}
