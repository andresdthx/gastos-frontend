BUCKET_NAME=$1
DISTRIBUTION_ID=$2

echo "-- Build --"
npm run build:prod
echo "-- Deploy --"
aws s3 sync build s3://$BUCKET_NAME
aws cloudfront create-invalidation --destribution-id $DISTRIBUTION_ID --paths "/*" --no-cli-pager
