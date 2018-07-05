"use strict";

var Project = React.createClass({

  displayName: "Project",

  propTypes: {
    projectData: React.PropTypes.object
  },

  getProject: function getProject() {
    var projectItems = [];
    this.props.projectData.items.forEach(function (val) {
      projectItems.push(React.createElement(ProjectItem, { projectItemData: val }));
    });
    return projectItems;
  },

  render: function render() {
    return React.createElement(
      "section",
      { className: "project" },
      React.createElement(
        "h2",
        { className: "text-uppercase" },
        React.createElement("i", { className: "fa fa-lg fa-terminal" }),
        this.props.projectData.title
      ),
      this.getProject()
    );
  }

});

var ProjectItem = React.createClass({

  displayName: "ProjectItem",

  propTypes: {
    projectItemData: React.PropTypes.object
  },
  rawMarkup: function rawMarkup() {
    var rawMarkup = marked(this.props.projectItemData.summary.toString(), { sanitize: false });
    return { __html: rawMarkup };
  },
  getProjectDate: function getProjectDate() {
    return React.createElement(
      "div",
      { className: "dates" },
      this.props.projectItemData.date
    );
  },
  getProjectLink: function getProjectLink() {

    if (this.props.projectItemData.link != "") {
      return React.createElement(
        "div",
        { className: "project-link" },
        React.createElement(
          "a",
          { href: this.props.projectItemData.link, className: "tooltips", target: "_blank" },
          React.createElement("i", { className: "fa fa-2x fa-lg fa-github" }),
          React.createElement(
            "span",
            null,
            "Github"
          )
        )
      );
    } else {
      return React.createElement("div", { className: "project-link" });
    }
  },
  render: function render() {
    var getHighlights = this.props.projectItemData.highlights.map(function (item) {
      return React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          { className: "label" },
          item
        )
      );
    });
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-sm-2" },
          React.createElement(
            "strong",
            null,
            this.props.projectItemData.name
          ),
          React.createElement(
            "strong",
            null,
            this.getProjectDate()
          ),
          this.getProjectLink()
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement("div", { className: "justify-align", dangerouslySetInnerHTML: this.rawMarkup() }),
          React.createElement(
            "ul",
            { className: "skills-list list-inline" },
            getHighlights
          )
        )
      ),
      React.createElement("div", { className: "divider-items" })
    );
  }
});

var Resume = React.createClass({

  displayName: "Resume",

  getInitialState: function getInitialState() {
    return { jsonObj: data[language], data: data, language: language };
  },
  handleClick_de: function handleClick_de(param) {
    this.setState({ language: "de" });
    setCookie("language", "de", 30);
  },
  handleClick_en: function handleClick_en(param) {
    this.setState({ language: "en" });
    setCookie("language", "en", 30);
  },
  handleClick_fr: function handleClick_fr(param) {
    this.setState({ language: "fr" });
    setCookie("language", "fr", 30);
  },

  render: function render() {

    this.state.jsonObj = this.state.data[this.state.language];

    if (this.state.jsonObj) {
      var profile = this.state.jsonObj.basics;
      var project = this.state.jsonObj.project;
      var menu = profile.menu;
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(MenuItem, { menuItemData: menu }),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "aside",
            { className: "col-md-3" },
            React.createElement(
              "div",
              { className: "inner" },
              React.createElement(Profile, { profileData: profile, handleClick_en: this.handleClick_en, handleClick_de: this.handleClick_de, handleClick_fr: this.handleClick_fr })
            )
          ),
          React.createElement(
            "main",
            { className: "col-md-9" },
            React.createElement(
              "div",
              { className: "inner" },
              React.createElement(Project, { projectData: project })
            )
          )
        )
      );
    } else {
      return React.createElement(
        "p",
        null,
        "Loading"
      );
    }
  }
});
ReactDOM.render(React.createElement(Resume, { data: data }), document.getElementById('reactjson'));