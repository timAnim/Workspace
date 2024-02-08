@echo off
gulp single_1.x && ^
7z a ./dist/single_1.x/xbro.zip ./dist/single_1.x/xbro.* -x!xbro.zip && ^
echo icon build success && ^
pause