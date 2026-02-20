import { Router } from "express";
import { getProjectsByUserId,createProject, getProjectById,updateProject ,deleteProject } from "../controllers/project.controller";




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

export default projectRouter;

/*

all methods of project

post /projects - create project
get /projects/user/:userId - get projects by user ID
get /projects/:projectId - get a project by ID
put /projects/:projectId - update a project
delete /projects/:projectId - delete a project

 */