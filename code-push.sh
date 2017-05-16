#!/bin/bash -

# bundle.sh need run permission chmod +x bundle.sh

# android
react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output ./release/index.android.bundle --assets-dest ./release
# ios
#react-native bundle --platform ios --dev false --entry-file index.ios.js --bundle-output ./release/main.bundle --assets-dest ./release

# publish to code push server
#code-push release msm-ios ./release 1.1.1 --deploymentName Production --description '1' --mandatory true
code-push release akbash-android ./release 1.1.10-2