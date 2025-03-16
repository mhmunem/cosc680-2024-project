# Grocery Price Comparison - client Setup

This README provides instructions for setting up the client using Ionic React and Capacitor.

## Project Structure

```
grocery_comparison/
├── cypress/         # End-to-end testing files
├── public/          # Public assets
├── src/             # Source code
│   ├── components/  # Reusable React components
│   ├── pages/       # Individual page components
│   ├── theme/       # Styling and theming
│   └── App.tsx      # Main application component
├── .browserslistrc  # Browser compatibility configuration
├── .eslintrc.js     # ESLint configuration
├── capacitor.config.ts  # Capacitor configuration
├── cypress.config.ts    # Cypress configuration
├── ionic.config.json    # Ionic configuration
├── package.json     # Project dependencies and scripts
├── tsconfig.json    # TypeScript configuration
├── vite.config.ts   # Vite build tool configuration
```

## Prerequisites

1. Install **Node.js** (LTS version recommended) and npm (comes with Node.js).

2. Install the **Ionic CLI** globally:
   ```
   npm install -g @ionic/cli
   ```
3. Install Capacitor dependencies for iOS and Android:(Capacitor dependencies install are only needed if they are not already listed in package.json)

   ```
   npm install @capacitor/core @capacitor/cli
   npm install @capacitor/android @capacitor/ios
   ```
4. iOS-specific prerequisites:
   - Install Xcode from the Mac App Store.
   - Install CocoaPods for dependency management:
     ```
     sudo gem install cocoapods
     ```
5. Android-specific prerequisites:
   - Install Android Studio and set up the Android SDK.
   - Ensure the `ANDROID_HOME` environment variable is configured.

## Environment Setup

1. Navigate to the project directory:
   ```
   cd grocery_comparison / cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Add Capacitor platforms:
   ```
   npx cap add ios
   npx cap add android
   ```
4. Build the app

   ```
   ionic build or ionic build <platform>
   ```
5. Sync your web assets to the native platforms:
   ```
   npx cap sync
   ```

## Running on iOS

1. Open the iOS project in Xcode:
   ```
   npx cap open ios
   ```

2. Select a simulator or a connected device and click "Run" in Xcode.

Alternatively, run the app directly using:
   ```
   npx cap run ios
   ```

## Running on Android

1. Open the Android project in Android Studio:
   ```
   npx cap open android
   ```

2. Select an emulator or a connected device and click "Run" in Android Studio.

Alternatively, run the app directly using:
   ```
   npx cap run android
   ```
and chose the target device and the app will be built using Gradle and deployed as `app-debug.apk` to the selected device.

## Testing the App

Use the following methods to test the application on web, simulators, emulators, and physical devices.

1. Web Testing:  
   Start the development server and run the app in a browser:
   ```
   ionic serve
   ```

2. iOS Testing:  
   Run the app in an iOS simulator or on a connected device using Xcode.

3. Android Testing:  
   Run the app on an Android emulator or connected device using Android Studio.

4. End-to-End Tests:  

   Run Cypress tests:
   ```
   npx cypress open
   ```
5. Testing on Physical Devices
   - iOS:
      Connect your iOS device to your Mac.
      Trust the device in Xcode and enable developer mode.
      Open the iOS project in Xcode and select your device from the target list.
      Run the app.

   - Android: [check here](https://developer.android.com/studio/run/device)

      Enable "Developer Options" and "USB Debugging" on your Android device.
      Connect the device via USB and ensure it is detected by adb:
         ```
         adb devices
         ```
Open the Android project in Android Studio and select your device to run the app.

## Coding Best Practices
[React Ionic Coding Standards](https://eng-git.canterbury.ac.nz/cosc680-2024/cosc680-2024-project/-/wikis/Coding-Style-Guidelines/React-Ionic-Coding-Standards)

## Troubleshooting 
- [Android Errors - Native Run Wiki](https://github.com/ionic-team/native-run/wiki/Android-Errors)
- [Android Errors - Capacitor Documentation](https://capacitorjs.com/docs/android/troubleshooting)


## Additional Resources

- [Ionic Framework Documentation](https://ionicframework.com/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Capacitor Andriod Documentation](https://capacitorjs.com/docs/android)
- [Using Capacitor Live Reload](https://capacitorjs.com/docs/guides/live-reload)


