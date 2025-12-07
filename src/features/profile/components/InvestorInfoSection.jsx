export default function InvestorInfoSection({ profile }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

      {/* Firm */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
          Firm
        </h3>
        <p className="text-gray-900 font-medium text-lg">
          {profile.firm || "Independent Investor"}
        </p>
      </div>

      {/* Type */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
          Investor Type
        </h3>
        <p className="text-gray-900 font-medium text-lg">
          {profile.type}
        </p>
      </div>

      {/* Stages */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Preferred Stages
        </h3>
        <div className="flex gap-2 flex-wrap">
          {profile.stages.map((stage) => (
            <span
              key={stage}
              className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
            >
              {stage}
            </span>
          ))}
        </div>
      </div>

      {/* Sectors */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Sectors of Interest
        </h3>
        <div className="flex gap-2 flex-wrap">
          {profile.sectors.map((sec) => (
            <span
              key={sec}
              className="px-3 py-1 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium"
            >
              {sec}
            </span>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-2">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
          Preferred Contact Method
        </h3>
        <p className="text-gray-900 font-medium capitalize">
          {profile.contactPreference}
        </p>
      </div>

    </div>
  );
}
