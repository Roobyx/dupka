# Dupka [![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/client) 
![](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) 
![](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)

React-Native mobile app with Expo and Firebase

Install:
`yarn`/`expo`/`npm install` 

Run with:
`expo start`

The app's main idea is to have users create reports with photos and share them on the app.

### Techstack
- React native
- Expo
- React native maps
- Redux
- Firebase

## Current feature set:
- User email/passowrd registration
- User login
- User logon state persistance between app sessions
- The user can take or browse photo with the build in camera feature
- Camera on-device face detection (simply detects if there is a person on the photo - true/false) for future face blurring
- Choose beteen main/selfie camera
- Flash support
- Image optimization and cropping before upload
- Image location data + address conversion for the report
- Report rating
- Scrollable reports feed (after admin aproval)
- General map view of the reports
- Heatmap view of the reports
- Report like system
- Report rating system by all users
- Report share (currently only image)

Each of the features is developped and working for both iOS and Android

## Current roadmap:
1. Profile page
~~- Easier logout button~~
~~- T&C and PP links~~
2. Report templates - Ability to pre-defined reason for the report
3. Ability to report that a previously reported issue has been fixed (with photo proof)
4. Personal feed

## Planned features:
- ~~Annonymus firebase login~~
- ~~Better design~~
- ~~ Feed sorting by report date ~~
- Properly refactor the atomic design structure
- Face detection on storage photos
- Face blurring before upload
- Feed filters
- Feed search
- Notifications for reports that await admin approval

## Known issues
- Map type switch actionsheet does not close itself on map switch
- Location is not always renewed and some reports end up on older locations (potentially fixed, but needs testing)


## App versioning:

1.48.1.0: v1, expo SDK 48, build 1.1
