import mongoose from "mongoose";


/*
projects [icon: folder, color: purple] {
  id ObjectId pk
  projectName string
  project_description string
  included_messaging_source array
  files array
  brdMdx string
  status string
  userId ObjectId fk
  createdAt timestamp
  updatedAt timestamp
}
   */


const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  project_description: { type: String , required: true},
  included_messaging_source: [{ type: String }],
  files: [{  filename : String,
          url : String,
     }],
  brdMdx: { type: String },
  status: { type: String, default: "active" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},
{ timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;