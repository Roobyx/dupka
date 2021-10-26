# Dupka 

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
- Annonymus firebase login
- Provider logins (Fb/google)
- Face detection on storage photos
- Face blurring before upload
- Feed filters
- Feed search
- Report templates