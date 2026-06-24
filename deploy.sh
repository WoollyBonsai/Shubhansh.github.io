#!/bin/bash
echo "Building the project..."
npm run build

echo "Navigating into dist directory..."
cd dist

echo "Initializing git for deployment..."
git init
git checkout -b gh-pages
git add -A

echo "Committing..."
git config user.name "Shubhansh Patel"
git config user.email "patelkanha202@gmail.com"
git commit -m "Deploy to GitHub Pages"

echo "Pushing to the gh-pages branch (You may be prompted for your GitHub credentials)..."
git push -f https://github.com/WoollyBonsai/Shubhansh.github.io.git gh-pages

echo "Deployment pushed! Make sure to set the GitHub Pages source to the 'gh-pages' branch in your repository settings."
