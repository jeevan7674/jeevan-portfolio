// ProjectDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import projectData from '@/data/projectData'; // You should create this file with an array of all project info

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectData.find((p) => p.id === id);

  if (!project) return <div className="text-white text-center mt-20">Project not found</div>;

  return (
    <section className="min-h-screen py-20 px-6 md:px-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{project.title}</h1>
          <div className="flex gap-4 flex-wrap text-sm">
            <Badge variant="outline" className="bg-slate-800">Category: {project.category}</Badge>
            <Badge variant="outline" className="bg-slate-800">Date: {project.date}</Badge>
            <Badge variant="outline" className="bg-slate-800">Status: {project.status}</Badge>
          </div>
          <p className="text-gray-300 max-w-2xl">{project.description}</p>
          <div className="flex gap-4">
            <Button onClick={() => window.open(project.demo, '_blank')} className="bg-green-500 hover:bg-green-600">
              <ExternalLink className="mr-2 w-4 h-4" /> Live Demo
            </Button>
            <Button onClick={() => window.open(project.github, '_blank')} variant="outline">
              <Github className="mr-2 w-4 h-4" /> View Code
            </Button>
          </div>
        </div>
        {/* Project Image */}
        <img
          src={project.image}
          alt={project.title}
          className="rounded-xl w-full max-w-lg border border-slate-700 shadow-xl"
        />
      </div>

      {/* Goal and Features */}
      <div className="mt-20 space-y-10">
        <div>
          <h2 className="text-2xl font-bold mb-2">🎯 Project Goal & Overview</h2>
          <p className="text-gray-300 max-w-4xl leading-relaxed">{project.goal}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">🚀 Key Features</h2>
          <ul className="grid md:grid-cols-2 gap-x-10 gap-y-3 list-disc list-inside">
            {project.features.map((feature, index) => (
              <li key={index} className="text-green-400">{feature}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">🛠 Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="bg-slate-800 text-white border border-slate-700">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">🖼 Gallery</h2>
          <img
            src={project.galleryImage || project.image}
            alt="Gallery"
            className="rounded-xl w-full max-w-4xl border border-slate-700 shadow-xl"
          />
        </div>
      </div>

      <div className="mt-20 text-center">
        <Button onClick={() => navigate(-1)} variant="ghost">← Back to Projects</Button>
      </div>
    </section>
  );
};

export default ProjectDetails;
