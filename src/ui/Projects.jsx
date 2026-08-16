// import React from "react";
// import { projects } from '../data/content'
// import ScrollStack, { ScrollStackItem } from "../components/ScrollStack";
// import {
//   ExternalLink,
//   Calendar,
//   User
// } from "lucide-react";
// import { SiGithub } from "react-icons/si";

// // new thing
// import Carousel from '../components/Carousel'

// export default function Projects() {

//   const handleStackComplete = () => {
//     console.log("All projects viewed!");
//   };

//   return (
//     <section
//       id="projects"
//       className="w-full min-h-screen px-4 md:px-8 lg:px-12 py-6"
//     >
//       {/* Main title */}
//       <h1 className="text-white font-bold text-5xl md:text-6xl lg:text-8xl lg:mt-20 tracking-tighter text-center mt-4 aclonica-regular">
//         Projects
//       </h1>

//       {/* ScrollStack */}
//       <ScrollStack
//         useWindowScroll
//         itemDistance={120}
//         itemScale={0.04}
//         itemStackDistance={40}
//         stackPosition="25%"
//         scaleEndPosition="15%"
//         baseScale={0.82}
//         blurAmount={2}
//         onStackComplete={handleStackComplete}
//         className="pb-32"
//       >
//         {projects.map((project) => (
//           <ScrollStackItem key={project.id}>
//             <ProjectCard
//               title={project.title}
//               description={project.description}
//               image={project.image}
//               tags={project.tags}
//               links={project.links}
//               date={project.date}
//             />
//           </ScrollStackItem>
//         ))}
//       </ScrollStack>
//     </section>
//   );
// }


// export const ProjectCard = ({
//   title,
//   description,
//   image,
//   tags = [],
//   links = {},
//   date,
//   className = ''
// }) => {
//   return (
//     <div className={`group relative w-full h-full flex flex-col overflow-hidden bg-white ${className}`}>
//       {/* Image Section - Fixed ratio for 400px total height */}
//       <div className="relative w-full h-40 shrink-0 overflow-hidden">
//         {image ? (
//           <img
//             src={image}
//             alt={title}
//             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//             loading="lazy"
//           />
//         ) : (
//           <div className="w-full h-full bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
//             <span className="text-slate-400 text-sm font-medium">No Preview</span>
//           </div>
//         )}

//         {/* Overlay on hover */}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
//       </div>

//       {/* Content Section - Fills remaining space */}
//       <div className="flex flex-col flex-1 p-6 pt-5 min-h-0">
//         {/* Header */}
//         <div className="flex items-start justify-between gap-3 mb-2">
//           <h3 className="aclonica-regular text-xl font-bold text-[#0b0f14] leading-tight group-hover:text-slate-600 transition-colors duration-300 line-clamp-1">
//             {title}
//           </h3>

//           {/* Links */}
//           <div className="flex items-center gap-1.5 shrink-0">
//             {links.github && (
//               <a
//                 href={links.github}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-1.5 rounded-full bg-amber-400 text-[#0b0f14] hover:bg-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
//                 aria-label="View GitHub repository"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <SiGithub size={16} />
//               </a>
//             )}
//             {links.live && (
//               <a
//                 href={links.live}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-1.5 rounded-full bg-amber-400 text-[#0b0f14] hover:bg-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
//                 aria-label="View live project"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <ExternalLink size={16} />
//               </a>
//             )}
//           </div>
//         </div>

//         {/* Meta info */}
//         <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-slate-500">
//           {date && (
//             <div className="flex items-center gap-1">
//               <Calendar size={14} className="text-amber-400" />
//               <span className="text-amber-400 font-bold">{date}</span>
//             </div>
//           )}
//         </div>

//         {/* Description - 2 lines max */}
//         <p className="text-sm text-slate-600 aclonica-regular leading-relaxed mb-4 line-clamp-2">
//           {description}
//         </p>

//         {/* Tech Stack - Pushed to bottom */}
//         {tags.length > 0 && (
//           <div className="flex flex-wrap gap-1.5 mt-auto">
//             {tags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="px-2.5 py-0.5 text-xs text-[#0b0f14] text-[11px] font-semibold bg-amber-400 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors duration-200"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import React from "react";
import { projects } from '../data/content'
import Carousel from '../components/Carousel'
import { ExternalLink, Calendar } from "lucide-react";
import { SiGithub } from "react-icons/si";

export default function Projects() {
  const carouselItems = projects.map((project) => ({
    id: project.id,
    content: (
      <ProjectCard
        title={project.title}
        description={project.description}
        image={project.image}
        tags={project.tags}
        links={project.links}
        date={project.date}
      />
    ),
  }));

  return (
    <section
      id="projects"
      className="w-full min-h-screen px-4 md:px-8 lg:px-12 py-6 flex flex-col items-center"
    >
      <h1 className="text-white font-bold text-5xl md:text-6xl lg:text-8xl lg:mt-20 tracking-tighter text-center mt-4 aclonica-regular">
        Projects
      </h1>

      <div className="mt-12 md:mt-16 w-full max-w-5xl mx-auto">
        <Carousel
          items={carouselItems}
          baseHeight={480}
          autoplay
          autoplayDelay={4000}
          pauseOnHover
          loop
          round={false}
        />
      </div>
      
    </section>
  );
}

export const ProjectCard = ({
  title,
  description,
  image,
  tags = [],
  links = {},
  date,
  className = ''
}) => {
  return (
    <div className={`group relative w-full h-full flex flex-col overflow-hidden bg-white ${className}`}>
      <div className="relative w-full h-40 shrink-0 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <span className="text-slate-400 text-sm font-medium">No Preview</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      <div className="flex flex-col flex-1 p-6 pt-5 min-h-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="aclonica-regular text-xl font-bold text-[#0b0f14] leading-tight group-hover:text-slate-600 transition-colors duration-300 line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 shrink-0">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-amber-400 text-[#0b0f14] hover:bg-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="View GitHub repository"
                onClick={(e) => e.stopPropagation()}
              >
                <SiGithub size={16} />
              </a>
            )}
            {links.live && (
              <a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-amber-400 text-[#0b0f14] hover:bg-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="View live project"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
    </div>

        <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-slate-500">
          {date && (
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-amber-400" />
              <span className="text-amber-400 font-bold">{date}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-slate-600 aclonica-regular leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-0.5 text-xs text-[#0b0f14] text-[11px] font-semibold bg-amber-400 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
