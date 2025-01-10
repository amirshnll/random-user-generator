find . -type f -name ".DS_Store" -delete
cd plugins/chrome
zip -r chrome.zip . --exclude .DS_Store
mv chrome.zip ~/Downloads/chrome.zip
cd ..
cd firefox
zip -r firefox.zip . --exclude .DS_Store
mv firefox.zip ~/Downloads/firefox.zip