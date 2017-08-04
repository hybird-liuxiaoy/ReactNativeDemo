#!/bin/bash - 

jarsigner -tsa https://timestamp.geotrust.com/tsa  -keystore /Volumes/work/DHMS/release_key/dhms.key -storepass Dhms160303 -keypass Dhms160303 -signedjar /Volumes/work/DHMS/akbash/android/app/app-release.apk /Volumes/work/DHMS/akbash/android/app/build/outputs/apk/app-release-unsigned.apk "dhms android client"
# armeabi-v7a
#jarsigner -tsa https://timestamp.geotrust.com/tsa  -keystore /Volumes/work/DHMS/release_key/dhms.key -storepass Dhms160303 -keypass Dhms160303 -signedjar /Volumes/work/DHMS/akbash/android/app/app-armeabi-v7a-release.apk /Volumes/work/DHMS/akbash/android/app/build/outputs/apk/app-armeabi-v7a-release-unsigned.apk "dhms android client"
# x86
#jarsigner -tsa https://timestamp.geotrust.com/tsa  -keystore /Volumes/work/DHMS/release_key/dhms.key -storepass Dhms160303 -keypass Dhms160303 -signedjar /Volumes/work/DHMS/akbash/android/app/app-x86-release.apk /Volumes/work/DHMS/akbash/android/app/build/outputs/apk/app-x86-release-unsigned.apk "dhms android client"