#!/bin/bash - 
#===============================================================================
#
#          FILE: bundle-android.sh
# 
#         USAGE: ./bundle-android.sh 
# 
#   DESCRIPTION: 
# 
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: Dr. Fritz Mehner (fgm), mehner.fritz@web.de
#  ORGANIZATION: 
#       CREATED: 2016/06/15 17:52
#      REVISION:  ---
#===============================================================================

set -o nounset                              # Treat unset variables as an error
# package to android project
#react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# package to android build tmp
cd android && ./gradlew assembleRelease
#react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/build/intermediates/assets/release/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/