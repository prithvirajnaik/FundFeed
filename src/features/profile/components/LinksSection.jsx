import { Github, Linkedin, Globe } from "lucide-react";

export default function LinksSection({ links }) {
  const items = [
    { label: "GitHub", url: links.github, icon: Github },
    { label: "LinkedIn", url: links.linkedin, icon: Linkedin },
    { label: "Portfolio", url: links.portfolio, icon: Globe },
    { label: "Website", url: links.website, icon: Globe },
  ];

  const activeLinks = items.filter((item) => item.url);

  if (activeLinks.length === 0) return null;

  return (
    <div className="mb-8 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h2 className="font-semibold text-gray-900 text-lg mb-3">Links</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {activeLinks.map((item) => (
          <a
            key={item.label}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium transition-all"
          >
            <item.icon size={17} />
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
