# UD Tools Dashboard

This repo contains code for the "Dashboard" component of the Urban Design Rhino/Grasshopper tools. Further details are included with the main UD Tools repo.

From the project directory, run:  

`npm install`  
`npm start`  
`npm run build`  
`rclone sync ./build/ ../ud-tools/src/Resources/DashboardBuild`

On the build step include a .env at the project root with "GENERATE_SOURCEMAP=false".
