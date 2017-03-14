var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack2');

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
}, {
  hooks: {
    beforeValidate: function (page) {
      if (page.title) {
        page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
      }
    }
  }
});

var User =db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

module.exports = {
  Page: Page,
  User: User
}