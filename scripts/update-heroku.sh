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
        docker buildx build --platform linux/amd64 -t $name -f Dockerfile.prod .
        docker tag $name registry.heroku.com/$name/web
        docker push registry.heroku.com/$name/web  
        heroku container:release web -a $name
fi

