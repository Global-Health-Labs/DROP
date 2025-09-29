echo "Switching to branch dev-1.0"
git checkout dev-1.0

echo "Building web-app..."
npm run build

echo "Deploying files to server..."
scp -r build/* psamrith@10.120.64.19:/var/www/10.120.64.19/

echo "Done!"

# Tutorial: https://www.youtube.com/watch?v=KFwFDZpEzXY