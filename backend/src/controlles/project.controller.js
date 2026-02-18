import Project from "../models/project.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiRes from "../utils/apiRes.js";


export const createProject = asyncHandler(async (req, res) => {
    const { projectName, project_description ,id } = req.body;

    const project = await Project.create({
        projectName,
        project_description,
        userId: id
    });

    if (!project) throw new apiError(400, "Project creation failed");

    return res.status(200).json(new apiRes(200, { project }, "Project created successfully"));
});



export const getProjects = asyncHandler(async (req, res) => {
    // Prefer query param for GET requests, fall back to body for compatibility
    const id = req.query?.id || req.body?.id;
    if (!id) throw new apiError(400, "User id is required");

    const projects = await Project.find({ userId: id });

    // Return empty list when none found (GET should be idempotent)
    const result = Array.isArray(projects) ? projects : [];

    return res.status(200).json(new apiRes(200, { projects: result }, "Projects retrieved successfully"));
});

export const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) throw new apiError(404, "Project not found");

    return res.status(200).json(new apiRes(200, { project }, "Project retrieved successfully"));
});


export const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) throw new apiError(404, "Project not found");

    return res.status(200).json(new apiRes(200, null, "Project deleted successfully"));
});

export const updateProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { projectName, project_description, included_messaging_source, files, brdMdx, status } = req.body;

    const project = await Project.findByIdAndUpdate(
        projectId,
        { projectName, project_description, included_messaging_source, files, brdMdx, status },
        { new: true }
    );

    if (!project) throw new apiError(404, "Project not found");

    return res.status(200).json(new apiRes(200, { project }, "Project updated successfully"));
});