import { Router } from "express";
import {
     getProjectsByUserId,createProject,
     getProjectById,updateProject 
     ,deleteProject,
     uploadProjectFiles,
     mapStakeholders,
     increamentProjectStatus,
     mapFacts
     } from "../controllers/project.controller";
import upload from "../utils/multer";



const projectRouter = Router();

// Create a new project
projectRouter.post("/projects", createProject);

// Get projects by user ID
projectRouter.get("/projects/user/:userId", getProjectsByUserId);

// Get a project by ID
projectRouter.get("/projects/:projectId", getProjectById);

// Update a project
projectRouter.put("/projects/:projectId", updateProject);

// Delete a project
projectRouter.delete("/projects/:projectId", deleteProject);

// Upload project files
projectRouter.post("/projects/:projectId/files",upload.array('files', 10), uploadProjectFiles);


// Map stakeholders
projectRouter.post("/projects/:projectId/stakeholders", mapStakeholders);

// // Increament project status
projectRouter.post("/projects/:projectId/increament-status",increamentProjectStatus);

// Map facts
projectRouter.post("/projects/:projectId/map-facts", mapFacts);



export default projectRouter;

/*

all methods of project

post /projects - create project
get /projects/user/:userId - get projects by user ID
get /projects/:projectId - get a project by ID
put /projects/:projectId - update a project
delete /projects/:projectId - delete a project
post /projects/:projectId/files - upload project files
post /projects/:projectId/stakeholders - map stakeholders
post /projects/:projectId/map-facts - map facts
post /projects/:projectId/increament-status - increament project status
 */



