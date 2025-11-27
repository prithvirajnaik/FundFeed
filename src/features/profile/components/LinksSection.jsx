import { ExternalLink } from "lucide-react";

export default function LinksSection({ links }) {
  const items = [
    { label: "GitHub", url: links.github },
    { label: "LinkedIn", url: links.linkedin },
    { label: "Portfolio", url: links.portfolio },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold mb-2">Links</h2>

      <div className="space-y-2">
        {items.map((item) =>
          item.url ? (
            <a
              key={item.label}
              href={item.url}
              target="_blank"
              className="flex items-center gap-2 text-accent hover:underline"
            >
              <ExternalLink size={16} />
              {item.label}
            </a>
          ) : null
        )}
      </div>
    </div>
  );
}
