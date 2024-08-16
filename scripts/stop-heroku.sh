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
        heroku destroy --confirm $name
fi 