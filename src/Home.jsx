import React, { Component } from "react";
import ScoreForm from "./ScoreForm";
import ScoreTable from "./ScoreTable";

let _FormEventHandler = undefined;
let _TableEventHandler = undefined;

export default class Home extends Component {
  // Events Fired by Siblings (children to parent)
  EventHandler = (child, event, data) => {
    console.log(
      "PARENT EVENT HANDLER",
      "child",
      child,
      "event",
      event,
      "event data",
      data
    );
    /*
        - from 'form' then goes to 'table'
        - from 'table' then goes to 'form'
    */

    if (child === "form") {
      if (_TableEventHandler) {
        _TableEventHandler(event, data);
      }
    } else if (child === "table") {
      if (_FormEventHandler) {
        _FormEventHandler(event, data);
      }
    } else {
      console.log("what?!");
    }
  };

  render() {
    return (
      <div className="home">
        {/* Header */}
        <nav className="flex jc-space-between ai-center">
          FE Task
          <div className="btn-grp">
            <button>Info</button>
            <button>Task</button>
          </div>
        </nav>
        {/*  */}
        {/* Form and Table */}
        <div className="form-table-wraper flex jc-space-around">
          {/* Form */}
          <ScoreForm
            FormEventHandler={(fn) => {
              _FormEventHandler = fn;
            }}
            NotifyParent={this.EventHandler}
          />
          {/* Table */}
          <ScoreTable
            TableEventHandler={(fn) => {
              _TableEventHandler = fn;
            }}
            NotifyParent={this.EventHandler}
          />
        </div>
      </div>
    );
  }
}
