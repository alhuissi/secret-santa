# SECRET SANTA

![alt text](https://firebasestorage.googleapis.com/v0/b/secret-santa-83260.appspot.com/o/snapshot.jpg?alt=media&token=94637f9e-d024-4cf7-8c8d-5faf68c85461)

A web application that fetches random users from an API, and creates a Secret Santa game where every user has to give and receive 1 gift. The sorting of pairs is done with the Fisher-Yates method.

Features:

- Responsive grid with Vuetify
- State management with Vuex
- Multiple languages with i18n (English, French and Spanish)
- User authentication and database management with Firebase
- Basic input validation (RegEx)
- Create many groups and shuffle them all the times you want
- Upload profile picture
- Save group in order to check it back later
- CSS animations (lightweight)


Random user generator API: https://randomuser.me/

#### Testing account: 
```
email: tester@example.com
password: 12345678
```


## Project download and setup
```
git clone https://github.com/alhuissi/secret-santa
cd secret-santa
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
