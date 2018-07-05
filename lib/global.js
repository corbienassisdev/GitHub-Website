"use strict";

var data = { "fr": fr, "en": en };

var Langue = React.createClass({
  displayName: "Langue",

  render: function render() {
    return React.createElement(
      "div",
      { className: "text-center" },
      React.createElement(
        "a",
        { href: "javascript:void(0)", onClick: this.props.handleClick_fr },
        React.createElement("img", { src: "images/flags/fr.png", className: "drap", alt: "fr_FR" })
      ),
      React.createElement(
        "a",
        { href: "javascript:void(0)", onClick: this.props.handleClick_en },
        React.createElement("img", { src: "images/flags/us_uk.png", className: "drap", alt: "en_US" })
      )
    );
  }
});

var Profile = React.createClass({

  displayName: "Profile",

  propTypes: {
    profileData: React.PropTypes.object
  },

  rawInformation: function rawInformation() {
    var rawInformation = marked(this.props.profileData.information.toString(), { sanitize: false });
    return { __html: rawInformation };
  },

  getProfileDetails: function getProfileDetails() {
    var profile = this.props.profileData;
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "profileImg" },
        React.createElement("img", { className: "img-circle center-block", id : "myself", src: "images/" + profile.picture })
      ),
      React.createElement(
        "h1",
        { className: "text-center" },
        profile.name
      ),
      React.createElement(
        "h2",
        { className: "text-center" },
        profile.label
      ),
      React.createElement(Langue, { handleClick_en: this.props.handleClick_en, handleClick_fr: this.props.handleClick_fr }),
      React.createElement("div", { className: "divider" }),
      React.createElement(
        "ul",
        { className: "list-unstyled contact-links text-center" },
        React.createElement(
          "li",
          null,
          React.createElement("i", { className: "fa fa-lg fa-location-arrow" }),
          React.createElement(
            "a",
            { href: "http://www.altivue360.com/sphere.html?fich=beaulieu.xml", target: "_blank" },
            profile.location.city
          ),
          ", ",
          profile.location.region,
          ", ",
          profile.location.countryCode
        ),
        React.createElement(
          "li",
          null,
          React.createElement("i", { className: "fa fa-lg fa-envelope" }),
          React.createElement(
            "a",
            { href: "mailto:" + profile.email },
            profile.email
          )
        )
      ),
      React.createElement("div", { className: "divider" }),
      React.createElement(
        "ul",
        { className: "profileLinks list-inline text-center" },
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "fa fa-linkedin-square fa-2x tooltips", href: profile.profiles[0].url, target: "_blank" },
            React.createElement(
              "span",
              null,
              profile.profiles[0].network
            )
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "fa fa-github fa-2x tooltips", href: profile.profiles[1].url, target: "_blank" },
            React.createElement(
              "span",
              null,
              profile.profiles[1].network
            )
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "fa fa-file-pdf-o fa-2x tooltips", href: profile.profiles[2].url, target: "_blank" },
            React.createElement(
              "span",
              null,
              profile.profiles[2].network
            )
          )
        )
      ),
      React.createElement("div", { className: "divider" }),
      React.createElement("div", { className: "justify-align", dangerouslySetInnerHTML: this.rawInformation() })
    );
  },

  render: function render() {
    if (this.props.profileData !== null) {
      return React.createElement(
        "div",
        { className: "profile" },
        this.getProfileDetails()
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

var MenuItem = React.createClass({
  displayName: "MenuItem",
  propTypes: {
    menuItemData: React.PropTypes.object
  },
  render: function render() {
    var getItems = this.props.menuItemData.map(function (item) {
      return React.createElement(
        "li",
        null,
        React.createElement(
          "a",
          { href: item.url },
          React.createElement(
            "span",
            { className: "label" },
            React.createElement("span", { className: item.icon }),
            item.label
          )
        )
      );
    });
    return React.createElement(
      "div",
      { className: "menu" },
      React.createElement(
        "nav",
        null,
        React.createElement(
          "ul",
          { className: "skills-list" },
          getItems
        )
      )
    );
  }
});