# Tracks
## GraphQL (Graphene Django) Service and React.js frontend to Manage music and Lyrics

![Logo](https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png)
![Logo](/Screen Shot 2020-07-01 at 3.14.40 PM.png)


Currently there is Docker support to run the GraphQL backend (front-end server coming soon)

1. Get the Repo 
```
git clone git@github.com:mark081/tracks.git
```

2. Go to the directory
```
cd tracks
```

3. Create the local DB
```
docker-compose run -p 8000:8000 web python app/manage.py migrate
```

4. Fire it up
```
docker-compose run -d -p 8000:8000 web
```

5. Replace `cooper.canada@gmail` and `sparky` at the end of `./dev/_seed_data.cfg` with has YOUR g-mail e-mail address and preferred nickname

6. Load the data

```
cd app/dev
./seed-data.sh
```

TODO - Web server to serve up React pages (for now just go to tracks-ui and run npm install and npm start