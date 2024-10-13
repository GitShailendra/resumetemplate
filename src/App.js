import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export default function Component() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    education: {
      university: '',
      degree: '',
      graduationDate: '',
      gpa: '',
      location: '',
      coursework: '',
    },
    experiences: [{ company: '', position: '', date: '', location: '', bullets: ['', '', ''] }],
    projects: [{ name: '', technologies: '', bullets: ['', '', ''] }],
    skills: {
      languages: '',
      technologies: '',
      concepts: '',
    },
  });

  const handleInputChange = (e, section, index, subfield) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (section === 'education') {
        return { ...prevData, education: { ...prevData.education, [name]: value } };
      } else if (section === 'experiences') {
        const newExperiences = [...prevData.experiences];
        if (subfield !== undefined) {
          newExperiences[index].bullets[subfield] = value;
        } else {
          newExperiences[index][name] = value;
        }
        return { ...prevData, experiences: newExperiences };
      } else if (section === 'projects') {
        const newProjects = [...prevData.projects];
        if (subfield !== undefined) {
          newProjects[index].bullets[subfield] = value;
        } else {
          newProjects[index][name] = value;
        }
        return { ...prevData, projects: newProjects };
      } else if (section === 'skills') {
        return { ...prevData, skills: { ...prevData.skills, [name]: value } };
      }
      return { ...prevData, [name]: value };
    });
  };

  const addExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experiences: [...prevData.experiences, { company: '', position: '', date: '', location: '', bullets: ['', '', ''] }],
    }));
  };

  const addProject = () => {
    setFormData((prevData) => ({
      ...prevData,
      projects: [...prevData.projects, { name: '', technologies: '', bullets: ['', '', ''] }],
    }));
  };

  const generatePDF = () => {
    const input = document.getElementById('resume');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('resume.pdf');
    });
  };

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-1/2 pr-4 space-y-4 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold mb-4">Resume Maker</h1>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => handleInputChange(e)}
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => handleInputChange(e)}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange(e)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn (e.g., linkedin.com/in/yourprofile)"
          value={formData.linkedin}
          onChange={(e) => handleInputChange(e)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub (e.g., github.com/yourusername)"
          value={formData.github}
          onChange={(e) => handleInputChange(e)}
          className="w-full p-2 border rounded"
        />

        <h3 className="text-lg font-semibold">Education</h3>
        <input
          type="text"
          name="university"
          placeholder="University Name"
          value={formData.education.university}
          onChange={(e) => handleInputChange(e, 'education')}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={formData.education.degree}
          onChange={(e) => handleInputChange(e, 'education')}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="graduationDate"
          placeholder="Expected Graduation Date"
          value={formData.education.graduationDate}
          onChange={(e) => handleInputChange(e, 'education')}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="gpa"
          placeholder="GPA"
          value={formData.education.gpa}
          onChange={(e) => handleInputChange(e, 'education')}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.education.location}
          onChange={(e) => handleInputChange(e, 'education')}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="coursework"
          placeholder="Relevant Coursework"
          value={formData.education.coursework}
          onChange={(e) => handleInputChange(e, 'education')}
          className="w-full p-2 border rounded"
          rows="3"
        ></textarea>

        <h3 className="text-lg font-semibold">Experience</h3>
        {formData.experiences.map((exp, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) => handleInputChange(e, 'experiences', index)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={exp.position}
              onChange={(e) => handleInputChange(e, 'experiences', index)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="date"
              placeholder="Date"
              value={exp.date}
              onChange={(e) => handleInputChange(e, 'experiences', index)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={exp.location}
              onChange={(e) => handleInputChange(e, 'experiences', index)}
              className="w-full p-2 border rounded"
            />
            {exp.bullets.map((bullet, bulletIndex) => (
              <input
                key={bulletIndex}
                type="text"
                name="bullets"
                placeholder={`Bullet point ${bulletIndex + 1}`}
                value={bullet}
                onChange={(e) => handleInputChange(e, 'experiences', index, bulletIndex)}
                className="w-full p-2 border rounded"
              />
            ))}
          </div>
        ))}
        <button onClick={addExperience} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Experience
        </button>

        <h3 className="text-lg font-semibold">Projects</h3>
        {formData.projects.map((project, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={project.name}
              onChange={(e) => handleInputChange(e, 'projects', index)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="technologies"
              placeholder="Technologies Used"
              value={project.technologies}
              onChange={(e) => handleInputChange(e, 'projects', index)}
              className="w-full p-2 border rounded"
            />
            {project.bullets.map((bullet, bulletIndex) => (
              <input
                key={bulletIndex}
                type="text"
                name="bullets"
                placeholder={`Bullet point ${bulletIndex + 1}`}
                value={bullet}
                onChange={(e) => handleInputChange(e, 'projects', index, bulletIndex)}
                className="w-full p-2 border rounded"
              />
            ))}
          </div>
        ))}
        <button onClick={addProject} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Project
        </button>

        <h3 className="text-lg font-semibold">Technical Skills</h3>
        <textarea
          name="languages"
          placeholder="Languages"
          value={formData.skills.languages}
          onChange={(e) => handleInputChange(e, 'skills')}
          className="w-full p-2 border rounded"
          rows="2"
        ></textarea>
        <textarea
          name="technologies"
          placeholder="Technologies"
          value={formData.skills.technologies}
          onChange={(e) => handleInputChange(e, 'skills')}
          className="w-full p-2 border rounded"
          rows="2"
        ></textarea>
        <textarea
          name="concepts"
          placeholder="Concepts"
          value={formData.skills.concepts}
          onChange={(e) => handleInputChange(e, 'skills')}
          className="w-full p-2 border rounded"
          rows="2"
        ></textarea>

        <button
          onClick={generatePDF}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Generate and Download PDF
        </button>
      </div>

      <div className="w-1/2 pl-4">
        <h2 className="text-xl font-semibold mb-2">Resume Preview</h2>
        <div id="resume" className="border p-8 bg-white" style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', lineHeight: '1.2', width: '8.5in', height: '11in', overflow: 'hidden' }}>
          <div className="text-center mb-4">
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>{formData.name}</h1>
            <div style={{ fontSize: '11px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              {formData.phone && (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Phone size={12} style={{ marginRight: '2px' }} />
                  {formData.phone}
                </span>
              )}
              {formData.email && (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Mail size={12} style={{ marginRight: '2px' }} />
                  <a href={`mailto:${formData.email}`} style={{ color: 'black', textDecoration: 'none' }}>{formData.email}</a>
                </span>
              )}
              {formData.linkedin && (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Linkedin size={12} style={{ marginRight: '2px' }} />
                  <a href={`https://${formData.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'black', textDecoration: 'none' }}>LinkedIn</a>
                </span>
              )}
              {formData.github && (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Github size={12} style={{ marginRight: '2px' }} />
                  <a href={`https://${formData.github}`} target="_blank" rel="noopener noreferrer" style={{ color: 'black', textDecoration: 'none' }}>GitHub</a>
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '1px solid black', marginBottom: '4px' }}>Education</h2>
            <p style={{ fontWeight: 'bold' }}>{formData.education.university}<span style={{ float: 'right', fontWeight: 'normal' }}>Expected {formData.education.graduationDate}</span></p>
            <p>{formData.education.degree} (GPA: {formData.education.gpa})<span style={{ float: 'right' }}>{formData.education.location}</span></p>
            <p><span style={{ fontWeight: 'bold' }}>Relevant Coursework:</span> {formData.education.coursework}</p>
          </div>

          <div className="mb-4">
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '1px solid black', marginBottom: '4px' }}>Experience</h2>
            {formData.experiences.map((exp, index) => (
              <div key={index} className="mb-2">
                <p>
                  <span style={{ fontWeight: 'bold' }}>{exp.company}</span>
                  <span style={{ float: 'right' }}>{exp.date}</span>
                </p>
                <p>
                  <span style={{ fontStyle: 'italic' }}>{exp.position}</span>
                  <span style={{ float: 'right' }}>{exp.location}</span>
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: '4px 0' }}>
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          
          </div>

          <div className="mb-4">
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '1px solid black', marginBottom: '4px' }}>Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="mb-2">
                <p><span style={{ fontWeight: 'bold' }}>{project.name}</span> | {project.technologies}</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: '4px 0' }}>
                  {project.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '1px solid black', marginBottom: '4px' }}>Technical Skills</h2>
            <p><span style={{ fontWeight: 'bold' }}>Languages:</span> {formData.skills.languages}</p>
            <p><span style={{ fontWeight: 'bold' }}>Technologies:</span> {formData.skills.technologies}</p>
            <p><span style={{ fontWeight: 'bold' }}>Concepts:</span> {formData.skills.concepts}</p>
          </div>
        </div>
      </div>
    </div>
  );
}