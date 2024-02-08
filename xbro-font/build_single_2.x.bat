@echo off
gulp single_2.x && ^
7z a ./dist/single_2.x/xb.zip ./dist/single_2.x/xb.*  -x!xb.zip && ^
echo icon build success && ^
pause