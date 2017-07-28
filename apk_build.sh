#!/bin/bash
# standalone build cofing
react-native bundle --platform android --dev false --entry-file index.android.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/

# build release apk.
cd android
./gradlew clean
./gradlew assembleRelease

# testing
react-native run-android --variant=release