@echo off
gulp multi && ^
7z a ./dist/multi/multi.zip ./dist/multi/index.html ./dist/multi/multi_cl_svg.js&& ^
echo icon build success && ^
pause