import { IosDriver } from `appium-ios-driver`

let defaultCaps = {
  app: 'path/to/your.app',
  platformName: 'iOS',
  deviceName: 'iPhone 6'
};

let driver = new IosDriver();
await driver.createSession(defaultCaps);
