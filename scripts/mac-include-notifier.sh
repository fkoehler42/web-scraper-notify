#!/bin/sh

mkdir -p bin/mac/notifier
cp node_modules/node-notifier/vendor/mac.noindex/terminal-notifier.app/Contents/Resources/en.lproj/MainMenu.nib bin/mac/notifier
cp node_modules/node-notifier/vendor/mac.noindex/terminal-notifier.app/Contents/Info.plist bin/mac/notifier
cp node_modules/node-notifier/vendor/mac.noindex/terminal-notifier.app/Contents/MacOS/terminal-notifier bin/mac/notifier