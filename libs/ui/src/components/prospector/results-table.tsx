'use client';

interface Result {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  linkedinUrl?: string;
}

export function ResultsTable({ results }: { results: Result[] }) {
  if (!results.length) return <div className="text-muted-foreground p-4">No results found.</div>;

  return (
    <div className="border rounded overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="text-left p-3 font-medium">Name</th>
            <th className="text-left p-3 font-medium">Title</th>
            <th className="text-left p-3 font-medium">Company</th>
            <th className="text-left p-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id} className="border-b last:border-0 hover:bg-muted/10">
              <td className="p-3">{r.firstName} {r.lastName}</td>
              <td className="p-3">{r.title}</td>
              <td className="p-3">{r.company}</td>
              <td className="p-3">
                <a
                  href={r.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
