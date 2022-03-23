# PasswordPCF
A basic PCF input controll meant to act as a password field. It will initialy format inputed passwords as asterix, but view can be toggled to show plain text. 

## Build PCF Controll
Install the required NPM packages, and build the control by executing the following commands from src/project.

```npm install```

```npm run build```

Test the solution by running ```npm run start```.

## Package the Solution
Go to src/solutions and run ```msbuild /t:build /restore```.
For subsaquent builds run ```msbuild /t:build /restore```.
