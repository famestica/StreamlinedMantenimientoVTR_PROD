cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "com-badrit-base64.Base64",
    "file": "plugins/com-badrit-base64/www/Base64.js",
    "pluginId": "com-badrit-base64",
    "clobbers": [
      "navigator.Base64"
    ]
  },
  {
    "id": "cordova-plugin-android-permissions.Permissions",
    "file": "plugins/cordova-plugin-android-permissions/www/permissions-dummy.js",
    "pluginId": "cordova-plugin-android-permissions",
    "clobbers": [
      "cordova.plugins.permissions"
    ]
  },
  {
    "id": "cordova-plugin-badge.Badge",
    "file": "plugins/cordova-plugin-badge/www/badge.js",
    "pluginId": "cordova-plugin-badge",
    "clobbers": [
      "cordova.plugins.notification.badge"
    ]
  },
  {
    "id": "cordova-plugin-camera.Camera",
    "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "Camera"
    ]
  },
  {
    "id": "cordova-plugin-camera.CameraPopoverOptions",
    "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "CameraPopoverOptions"
    ]
  },
  {
    "id": "cordova-plugin-camera.camera",
    "file": "plugins/cordova-plugin-camera/www/Camera.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "navigator.camera"
    ]
  },
  {
    "id": "cordova-plugin-camera.CameraPopoverHandle",
    "file": "plugins/cordova-plugin-camera/www/ios/CameraPopoverHandle.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "CameraPopoverHandle"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.Coordinates",
    "file": "plugins/cordova-plugin-geolocation/www/Coordinates.js",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "Coordinates"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.PositionError",
    "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "PositionError"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.Position",
    "file": "plugins/cordova-plugin-geolocation/www/Position.js",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "Position"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.geolocation",
    "file": "plugins/cordova-plugin-geolocation/www/geolocation.js",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "navigator.geolocation"
    ]
  },
  {
    "id": "cordova-plugin-googleplus.GooglePlus",
    "file": "plugins/cordova-plugin-googleplus/www/GooglePlus.js",
    "pluginId": "cordova-plugin-googleplus",
    "clobbers": [
      "window.plugins.googleplus"
    ]
  },
  {
    "id": "cordova-plugin-ionic-keyboard.keyboard",
    "file": "plugins/cordova-plugin-ionic-keyboard/www/ios/keyboard.js",
    "pluginId": "cordova-plugin-ionic-keyboard",
    "clobbers": [
      "window.Keyboard"
    ]
  },
  {
    "id": "cordova-plugin-ionic-webview.ios-wkwebview-exec",
    "file": "plugins/cordova-plugin-ionic-webview/src/www/ios/ios-wkwebview-exec.js",
    "pluginId": "cordova-plugin-ionic-webview",
    "clobbers": [
      "cordova.exec"
    ]
  },
  {
    "id": "cordova-plugin-local-notification.LocalNotification",
    "file": "plugins/cordova-plugin-local-notification/www/local-notification.js",
    "pluginId": "cordova-plugin-local-notification",
    "clobbers": [
      "cordova.plugins.notification.local"
    ]
  },
  {
    "id": "cordova-plugin-local-notification.LocalNotification.Core",
    "file": "plugins/cordova-plugin-local-notification/www/local-notification-core.js",
    "pluginId": "cordova-plugin-local-notification",
    "clobbers": [
      "cordova.plugins.notification.local.core",
      "plugin.notification.local.core"
    ]
  },
  {
    "id": "cordova-plugin-local-notification.LocalNotification.Util",
    "file": "plugins/cordova-plugin-local-notification/www/local-notification-util.js",
    "pluginId": "cordova-plugin-local-notification",
    "merges": [
      "cordova.plugins.notification.local.core",
      "plugin.notification.local.core"
    ]
  },
  {
    "id": "cordova-plugin-ms-adal.utility",
    "file": "plugins/cordova-plugin-ms-adal/www/utility.js",
    "pluginId": "cordova-plugin-ms-adal",
    "runs": true
  },
  {
    "id": "cordova-plugin-ms-adal.AuthenticationContext",
    "file": "plugins/cordova-plugin-ms-adal/www/AuthenticationContext.js",
    "pluginId": "cordova-plugin-ms-adal",
    "clobbers": [
      "Microsoft.ADAL.AuthenticationContext"
    ]
  },
  {
    "id": "cordova-plugin-ms-adal.CordovaBridge",
    "file": "plugins/cordova-plugin-ms-adal/www/CordovaBridge.js",
    "pluginId": "cordova-plugin-ms-adal"
  },
  {
    "id": "cordova-plugin-ms-adal.AuthenticationResult",
    "file": "plugins/cordova-plugin-ms-adal/www/AuthenticationResult.js",
    "pluginId": "cordova-plugin-ms-adal"
  },
  {
    "id": "cordova-plugin-ms-adal.TokenCache",
    "file": "plugins/cordova-plugin-ms-adal/www/TokenCache.js",
    "pluginId": "cordova-plugin-ms-adal"
  },
  {
    "id": "cordova-plugin-ms-adal.TokenCacheItem",
    "file": "plugins/cordova-plugin-ms-adal/www/TokenCacheItem.js",
    "pluginId": "cordova-plugin-ms-adal"
  },
  {
    "id": "cordova-plugin-ms-adal.UserInfo",
    "file": "plugins/cordova-plugin-ms-adal/www/UserInfo.js",
    "pluginId": "cordova-plugin-ms-adal"
  },
  {
    "id": "cordova-plugin-ms-adal.LogItem",
    "file": "plugins/cordova-plugin-ms-adal/www/LogItem.js",
    "pluginId": "cordova-plugin-ms-adal"
  },
  {
    "id": "cordova-plugin-ms-adal.AuthenticationSettings",
    "file": "plugins/cordova-plugin-ms-adal/www/AuthenticationSettings.js",
    "pluginId": "cordova-plugin-ms-adal",
    "clobbers": [
      "Microsoft.ADAL.AuthenticationSettings"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "com-badrit-base64": "0.2.0",
  "cordova-plugin-android-permissions": "1.0.0",
  "cordova-plugin-badge": "0.8.7",
  "cordova-plugin-camera": "4.0.3",
  "cordova-plugin-compat": "1.2.0",
  "cordova-plugin-device": "2.0.2",
  "cordova-plugin-geolocation": "4.0.1",
  "cordova-plugin-googleplus": "7.0.0",
  "cordova-plugin-ionic-keyboard": "2.0.5",
  "cordova-plugin-ionic-webview": "1.1.19",
  "cordova-plugin-local-notification": "0.9.0-beta.2",
  "cordova-plugin-ms-adal": "0.10.1"
};
// BOTTOM OF METADATA
});