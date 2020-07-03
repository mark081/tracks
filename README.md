# Tracks
## GraphQL (Graphene Django) Service and React.js frontend do something cool that I haven't figured out yet

![Logo](/tracks.png)


Currently there is Docker support to run the GraphQL backend (front-end server coming soon)

1. Get the Repo 
```
git clone git@github.com:mark081/tracks.git
```

2. Go to the directory
```
cd tracks
```

3. Fire it up
```
docker-compose run -d -p 8000:8000 web
```

5. On your local maching replace `cooper.canada@gmail.com` and `sparky` at the end of `./dev/_seed_data.cfg` with has YOUR g-mail e-mail address and preferred nickname


6. Load the data

```
cd app/dev
./seed-data.sh
```

TODO - Web server to serve up React pages (for now just go to tracks-ui and run npm install and npm start
