#!/usr/bin/env zsh
# curl -i -H 'Content-Type: application/json' -H "Authorization: bearer myGithubAccessToken" -X POST -d '{"query": "query {repository(owner: \"wso2\", name: \"product-is\") {description}}"}' $1

DJANGO_SERVER=$1

function makeUser {
    EMAIL=$1
    USER=$2
    HOSTNAME=$6
    ALBUM=$3
    ARTIST=$4
    TITLE=$5
    echo "Creating" $USER "on" $HOSTNAME
    echo "====================="
    echo ""
    curl -i -H "Content-Type:application/json" -d '{"query": "mutation {createUser(email: '$EMAIL' password: \"password\" username: '$USER') {user {id}}}"}' $HOSTNAME
    echo ""
    echo ""
    echo "Getting JWT"
    echo "====================="    
    echo ""
    JWT=$(curl -H "Content-Type:application/json"  -d '{"query": "mutation {tokenAuth(password: \"password\" username: '$USER') {token}}"}' $HOSTNAME | jq --raw-output '.data.tokenAuth.token')
    echo $JWT
    echo ""
    echo "Adding Track"
    echo ""
    curl -i -H "Content-Type:application/json" -H "Authorization:JWT "$JWT -d '{"query": "mutation {createTrack(album: '$ALBUM' artist: '$ARTIST' title: '$TITLE') {track {id}}}"}'$HOSTNAME



}

while read -r email user album artist title
do
    makeUser $email $user $album $artist $title $DJANGO_SERVER
done < _seed_data.cfg