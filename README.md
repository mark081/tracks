# Tracks
## GraphQL (Graphene Django) Service and React.js

![Logo](/tracks.png)

(For a lesson on using docker-compose and docker using this project go to https://medium.com/@markcooper_18226/running-multiple-services-in-a-single-docker-container-59f76aee3afb)

Currently there is Docker support to run the GraphQL backend (front-end server coming soon)

1. Get the Repo and cd to the directory
```
git clone git@github.com:mark081/tracks.git
cd tracks
```

2. Fire it up
```
docker-compose up --build
```

3. On your local machine replace `cooper.canada@gmail.com` and `sparky` at the end of `./dev/_seed_data.cfg` with has YOUR g-mail e-mail address and preferred nickname


4. Load the data

```
cd app/dev
./seed-data.sh
```

TODO - Web server to serve up React pages (for now just go to tracks-ui and run npm install and npm start
