# Tracks
## GraphQL (Graphene Django) Service and React.js

![Logo](/tracks.png)

(For a lesson on using docker-compose and docker using this project go to [my Medium article](https://medium.com/@markcooper_18226/running-multiple-services-in-a-single-docker-container-59f76aee3afb)

Currently there is Docker support to run the GraphQL backend (front-end server coming soon)

### 1. Get the Repo and build the client
```
git clone git@github.com:mark081/tracks.git
cd tracks/tracks-ui
npm install
npm run build
mv build/ ../tracks-svr
```

### 2. Go to the project root directory and run docker-compose
```
cd ..
docker-compose up --build
```

### 3. On your local machine replace `cooper.canada@gmail.com` and `sparky` at the end of `./dev/_seed_data.cfg` with has YOUR g-mail e-mail address and preferred nickname


### 4. Load the data

```
cd app/dev
./seed-data.sh
```

### 5. Run http://0.0.0.0:3000/ from your browser of choice

