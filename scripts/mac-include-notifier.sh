#!/bin/sh

mkdir -p exec/notifier
cp node_modules/node-notifier/vendor/mac.noindex/terminal-notifier.app/Contents/Resources/en.lproj/MainMenu.nib exec/notifier
cp node_modules/node-notifier/vendor/mac.noindex/terminal-notifier.app/Contents/Info.plist exec/notifier
cp node_modules/node-notifier/vendor/mac.noindex/terminal-notifier.app/Contents/MacOS/terminal-notifier exec/notifier