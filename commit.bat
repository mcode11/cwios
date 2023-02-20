@echo off
git fetch
git pull
git add .
git commit -m "commit"
git push
echo "Commit done."