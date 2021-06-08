import React, { Component } from "react";

const COCKTAILS = ["Malta", "Santrá", "Sönfee"];

const InitialValues = {
  PersonName: "",
  Cocktail: "",
  Points: "",
  Editing: false,
  UID: Math.random(),
};

export default class ScoreForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...InitialValues };
  }

  /*
        Setup Connection to Communicate-
            - Parent
            - Sibling (Table Element)
    */
  componentDidMount = () => {
    if (this.props.FormEventHandler) {
      this.props.FormEventHandler(this.EventHandler);
    }
  };

  EventHandler = (event, data) => {
    console.log("SIBLING form EVENT HANDLER", "event", event, "data", data);
    switch (event) {
      case "update_data":
        this.HandleUpdate(data);
        break;

      default:
        break;
    }
  };

  HandleSubmit = (evt) => {
    evt.preventDefault();
    console.log(this.state, "data");
    if (this.props.NotifyParent) {
      if (!this.state.Editing) {
        this.state.UID = Math.random();
      }
      this.props.NotifyParent("form", "submit_data_to_table", this.state);
    }
    // reset
    this.ResetForm();
  };

  HandleChange = (evt) => {
    let { name, value } = evt.target;

    this.setState({
      [name]: value,
    });
  };

  HandleUpdate = (data) => {
    this.setState({
      ...data,
      Editing: true,
    });
  };

  ResetForm = () => {
    if (this.state.Editing) {
      if (this.props.NotifyParent) {
        this.props.NotifyParent("form", "submit_data_to_table", this.state);
      }
    }
    this.setState({
      ...InitialValues,
    });
  };

  render() {
    return (
      <div className="score-form">
        <form onSubmit={this.HandleSubmit}>
          <h1>Add Entry</h1>
          <div>
            {/* Person Name */}
            <div className="field">
              <label className="ds-block" for="PersonName">
                Name
              </label>
              <input
                type="text"
                name="PersonName"
                placeholder="Enter your name"
                minLength="3"
                maxlength="30"
                value={this.state.PersonName}
                onChange={this.HandleChange}
                required
              />
            </div>

            {/* Cocktail */}
            <div className="field">
              <label className="ds-block" for="Cocktail">
                Select cocktail
              </label>
              <select
                name="Cocktail"
                placeholder="Cocktails"
                value={this.state.Cocktail}
                onChange={this.HandleChange}
                required
              >
                <option selected hidden value="">
                  Select cocktail
                </option>
                {COCKTAILS.map((cocktail) => {
                  return <option value={cocktail}>{cocktail}</option>;
                })}
              </select>
            </div>
            {/* Points */}
            <div className="field">
              <label className="ds-block" for="Points">
                Points (0 to 10)
              </label>
              <input
                type="number"
                name="Points"
                placeholder="Give points"
                min="0"
                max="10"
                value={this.state.Points}
                onChange={this.HandleChange}
                required
              />
            </div>
          </div>
          <div className="form-btn-grp flex jc-flex-end">
            <button className="hand" type="button" onClick={this.ResetForm}>
              {!this.state.Editing ? "Reset" : "Cancel"}
            </button>
            <button className="hand bckgrnd-y" type="submit">
              {!this.state.Editing ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
