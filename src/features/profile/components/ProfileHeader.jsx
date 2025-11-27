export default function ProfileHeader({ profile }) {
  return (
    <div className="flex gap-6 items-center">
      <img
        src={profile.avatar}
        className="w-28 h-28 rounded-full object-cover"
        alt="avatar"
      />

      <div>
        <h1 className="text-3xl font-bold text-primary">{profile.name}</h1>
        <p className="text-gray-700 text-lg">{profile.title}</p>
        <p className="text-sm text-accent mt-1">{profile.location}</p>
      </div>
    </div>
  );
}
