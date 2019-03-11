@ECHO OFF

REM # Even when the node_modules folder, that is, the dependencies
REM # are broken, the clean up script needs to be workable,
REM # so it is implemented by a Windows batch script.

CD /d %~dp0\..
RMDIR /S /Q coverage >NUL 2>&1
RMDIR /S /Q dist >NUL 2>&1
RMDIR /S /Q logs >NUL 2>&1
RMDIR /S /Q node_modules >NUL 2>&1
RMDIR /S /Q storybook-static >NUL 2>&1
