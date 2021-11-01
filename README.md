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

Each of the features is developped and working for both iOS and Android

## Feature Roadmap:
- Properly refactor the atomic design structure
- Annonymus firebase login
- Provider logins (Fb/google)
- Face detection on storage photos
- Face blurring before upload
- Feed filters
- Feed search
- Report templates
- Personal feed
- Skip admin approval request on proper reports
- Notifications for reports that await admin approval

## Known issues
- Map type switch actionsheet does not close itself on map switch
- Location is not always renewed and some reports end up on older locations