@ECHO OFF

REM # Even when the node_modules folder, that is, the dependencies
REM # are broken, the clean up script needs to be workable,
REM # so it is implemented by a Windows batch script.

CD /d %~dp0\..
git clean -Xdf
