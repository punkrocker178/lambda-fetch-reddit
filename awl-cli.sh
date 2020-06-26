docker run --rm -it \
    -v ~/.aws:/root/.aws \
    -v ~/Desktop/fetch-reddit:/function \
    amazon/aws-cli "$@"


# Useful command for update function
# lambda update-function-code --function-name fetch-reddit --zip-file fileb://\/function/function.zip