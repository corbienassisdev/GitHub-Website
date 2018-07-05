"use strict";

var About = React.createClass({
  displayName: "About",
  propTypes: {
    aboutData: React.PropTypes.object
  },
  rawMarkup: function rawMarkup() {
    var rawMarkup = marked(this.props.aboutData.summary.toString(), { sanitize: true });
    return { __html: rawMarkup };
  },
  render: function render() {
    return React.createElement(
      "section",
      { className: "about" },
      React.createElement(
        "h2",
        { className: "text-uppercase" },
        React.createElement("i", { className: "fa fa-lg fa-user" }),
        this.props.aboutData.title
      ),
      React.createElement("div", { className: "justify-align", dangerouslySetInnerHTML: this.rawMarkup() })
    );
  }
});

var Education = React.createClass({

  displayName: "Education",

  propTypes: {
    educationData: React.PropTypes.object
  },
  getEducation: function getEducation() {

    return this.props.educationData.items.map(function (item) {
      var startDate = item.startDate;
      if (item.endDate != "") {
        startDate += " - ";
      }
      var gpa = item.gpa;
      if (gpa != "") {
        gpa = " - " + gpa;
      }

      var getCourses = item.courses.map(function (course) {
        return React.createElement(
          "li",
          null,
          React.createElement(
            "span",
            null,
            course
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
              "a",
              { href: item.link, target: "_blank" },
              React.createElement("img", { className: "width-picture-items", src: "images/schools/" + item.picture })
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-10" },
            React.createElement(
              "strong",
              null,
              item.studyType,
              " ",
              gpa
            ),
            " ",
            React.createElement("br", null),
            React.createElement(
              "strong",
              null,
              React.createElement(
                "a",
                { href: item.link, target: "_blank" },
                item.institution
              )
            ),
            " / ",
            item.place,
            React.createElement(
              "div",
              { className: "dates" },
              React.createElement(
                "strong",
                null,
                startDate,
                item.endDate
              )
            ),
            React.createElement(
              "ul",
              null,
              getCourses
            )
          )
        ),
        React.createElement("div", { className: "divider-items" })
      );
    });
  },

  render: function render() {
    return React.createElement(
      "section",
      { className: "education" },
      React.createElement(
        "h2",
        { className: "text-uppercase" },
        React.createElement("i", { className: "fa fa-lg fa-mortar-board" }),
        this.props.educationData.title
      ),
      this.getEducation()
    );
  }

});

var Skills = React.createClass({

  displayName: "Skills",

  propTypes: {
    skillsData: React.PropTypes.object
  },
  render: function render() {
    var getItems = function getItems(skill) {
      var keywordsLength = skill.keywords.length - 1;
      return skill.keywords.map(function (item, index) {
        var str = item;
        if (index != keywordsLength) {
          str += ", ";
        }
        return React.createElement(
          "span",
          null,
          str
        );
      });
    };
    var getSkills = this.props.skillsData.items.map(function (skill) {
      return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-sm-2 skill_name" },
          React.createElement(
            "strong",
            null,
            skill.name
          )
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          getItems(skill)
        )
      );
    });
    return React.createElement(
      "section",
      { className: "skills" },
      React.createElement(
        "h2",
        { className: "text-uppercase" },
        React.createElement("i", { className: "fa fa-lg fa-code" }),
        this.props.skillsData.title
      ),
      getSkills
    );
  }
});

var Work = React.createClass({

  displayName: "Work",

  propTypes: {
    workData: React.PropTypes.object
  },

  getWorkExperience: function getWorkExperience() {
    var workItems = [];
    this.props.workData.items.forEach(function (val) {
      workItems.push(React.createElement(WorkItem, { workItemData: val }));
    });
    return workItems;
  },

  render: function render() {
    return React.createElement(
      "section",
      { className: "work" },
      React.createElement(
        "h2",
        { className: "text-uppercase" },
        React.createElement("i", { className: "fa fa-lg fa-cubes" }),
        this.props.workData.title
      ),
      this.getWorkExperience()
    );
  }

});

var WorkItem = React.createClass({

  displayName: "WorkItem",

  propTypes: {
    workItemData: React.PropTypes.object
  },
  rawMarkup: function rawMarkup() {
    var rawMarkup = marked(this.props.workItemData.summary.toString(), { sanitize: true });
    return { __html: rawMarkup };
  },
  getWorkDates: function getWorkDates() {
    return React.createElement(
      "div",
      { className: "dates" },
      this.props.workItemData.startDate,
      " - ",
      this.props.workItemData.endDate
    );
  },

  getWorkAttachments: function getProjectLink() {
    if (this.props.workItemData.attachments != undefined) {
      if (this.props.workItemData.attachments.length != 0) {
        var attachments = this.props.workItemData.attachments.map(function (item) {
          return React.createElement(
            "a",
            { href: item.url, className: "tooltips-work-exp", target: "_blank" },
            React.createElement("i", { className: item.icon }),
            React.createElement(
              "span",
              null,
              item.label
            )
          );
        });
        return React.createElement(
          "div",
          { className: "work-exp-link" },
          attachments
        );
      }
    }
  },
  render: function render() {
    var getHighlights = this.props.workItemData.highlights.map(function (item) {
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
            "a",
            { href: this.props.workItemData.website, target: "_blank" },
            React.createElement("img", { className: "width-picture-items", src: "images/companies/" + this.props.workItemData.picture })
          ),
          this.getWorkAttachments()
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement(
            "strong",
            null,
            this.props.workItemData.position,
            ", ",
            React.createElement(
              "a",
              { href: this.props.workItemData.website, target: "_blank" },
              this.props.workItemData.company
            ),
            " / ",
            this.props.workItemData.place,
            this.getWorkDates()
          ),
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

var Languages = React.createClass({
  displayName: "Languages",
  propTypes: {
    languagesData: React.PropTypes.object
  },
  render: function render() {
    var getLanguages = this.props.languagesData.items.map(function (item) {
      return React.createElement(
        "div",
        { className: "col-md-3" },
        React.createElement("img", { className: "width-full", src: "images/flag_maps/" + item.link }),
        React.createElement(
          "h3",
          { className: "text-center language-title-text" },
          item.language
        ),
        React.createElement(
          "p",
          { className: "text-center language-text" },
          item.fluency
        )
      );
    });
    return React.createElement(
      "section",
      { className: "languages" },
      React.createElement(
        "h2",
        { className: "text-uppercase" },
        React.createElement("i", { className: "fa fa-lg fa-globe" }),
        this.props.languagesData.title
      ),
      React.createElement(
        "div",
        { className: "row" },
        getLanguages
      )
    );
  }
});

var Interests = React.createClass({

  displayName: "Interests",

  propTypes: {
    interestsData: React.PropTypes.object
  },

  render: function render() {

    var getItems = function getItems(interest) {
      var keywordsLength = interest.keywords.length - 1;
      return interest.keywords.map(function (item, index) {
        if (index != keywordsLength) {
          return React.createElement(
            "span",
            null,
            item,
            ", "
          );
        } else {
          return React.createElement(
            "span",
            null,
            item
          );
        }
      });
    };

    var getInterests = this.props.interestsData.items.map(function (interest) {
      return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-sm-2" },
          React.createElement(
            "strong",
            null,
            interest.name
          )
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          getItems(interest)
        )
      );
    });
    return React.createElement(
      "section",
      { className: "skills" },
      React.createElement(
        "h2",
        { className: "text-uppercase" },
        React.createElement("i", { className: "fa fa-lg fa-heartbeat" }),
        this.props.interestsData.title
      ),
      getInterests
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
      var about = { "title": profile.title, "summary": profile.summary };
      var work = this.state.jsonObj.work;
      var education = this.state.jsonObj.education;
      var skills = this.state.jsonObj.skills;
      var languages = this.state.jsonObj.languages;
      var interests = this.state.jsonObj.interests;
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
              React.createElement(About, { aboutData: about }),
              React.createElement(Work, { workData: work }),
              React.createElement(Skills, { skillsData: skills }),
              React.createElement(Education, { educationData: education }),
              React.createElement(Languages, { languagesData: languages }),
              React.createElement(Interests, { interestsData: interests })
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