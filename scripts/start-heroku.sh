while getopts n: flag
do
    case "${flag}" in
        n) name=${OPTARG};;
    esac
done

if [ -z "$name" ]
    then
        echo "No name argument supplied. Use -n flag to specify the name of your app"
    else
        heroku create $name
        heroku addons:create -a $name heroku-postgresql:hobby-dev
        # heroku addons:create heroku-redis:hobby-dev
        docker buildx build --platform linux/amd64 -t $name -f Dockerfile.prod .
        docker tag $name registry.heroku.com/$name/web
        docker push registry.heroku.com/$name/web  
        heroku container:release web -a $name
        cat ./src/db/init-schema.sql | heroku pg:psql -a $name
        cat ./src/db/seed-data.sql | heroku pg:psql -a $name
fi

