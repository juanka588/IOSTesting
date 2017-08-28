"use strict";

require("./helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    Q = require('q'),
    serverConfigs = require('./helpers/appium-servers');

describe("ios simple", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function () {
    var serverConfig = process.env.npm_package_config_sauce ?
      serverConfigs.sauce : serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);
    require("./helpers/logging").configure(driver);

    var desired = _.clone(require("./helpers/caps").ios92);
    process.env.DEV=true;
    desired.app = require("./helpers/apps").juanApp;
    if (process.env.npm_package_config_sauce) {
      desired.name = 'ios - simple';
      desired.tags = ['sample'];
    }
    return driver.init(desired);
  });

  after(function () {
    return driver
      .quit()
      .finally(function () {
        if (process.env.npm_package_config_sauce) {
          return driver.sauceJobStatus(allPassed);
        }
      });
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  function populate() {
    return 100;
  }

  it("should click the record button, change the label value", function () {
    return driver
      .resolve(populate()).then(function (sum) {
        console.log("variable sent");
        console.log(sum);
        var id ='recordBtn';
        driver.waitForElementById(id, 3000).then(function (el) {
          el.click();
        });

        return driver
            .elementByAccessibilityId('messageLabel')
            .text().should.become("recording...");
      });
  });

it("should change screen clicking over stop buttonand type some text", function () {
    return driver
      .resolve().then(function () {
        var id ='stopBtn';
        driver.waitForElementById(id, 3000).then(function (el) {
          el.click();
        });

        return driver.waitForElementById('nameInput',3000).then(function (el) {
            return el.sendKeys("juan es genial").getValue().should.become("juan no es genial")
            .elementByName('Done').click().sleep(1000); // dismissing keyboard
            console.log("function type called");
        });;

      });
  });


});
