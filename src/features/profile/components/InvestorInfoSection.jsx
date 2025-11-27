export default function InvestorInfoSection({ profile }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6 space-y-4">

      <div>
        <h2 className="text-xl font-semibold">Firm</h2>
        <p className="text-gray-700">
          {profile.firm || "Independent Investor"}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Investor Type</h2>
        <p className="text-gray-700">{profile.type}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Preferred Funding Stages</h2>
        <div className="flex gap-2 flex-wrap mt-1">
          {profile.stages.map((stage) => (
            <span
              key={stage}
              className="px-2 py-1 bg-gold rounded-md text-sm"
            >
              {stage}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Sectors of Interest</h2>
        <div className="flex gap-2 flex-wrap mt-1">
          {profile.sectors.map((sec) => (
            <span
              key={sec}
              className="px-2 py-1 bg-accent text-white rounded-md text-sm"
            >
              {sec}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Preferred Contact</h2>
        <p className="text-gray-700 capitalize">
          {profile.contactPreference}
        </p>
      </div>

    </div>
  );
}
