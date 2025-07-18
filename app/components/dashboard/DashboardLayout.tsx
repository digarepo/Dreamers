export default function DashboardIndex() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">Total Users</h3>
          <p className="text-2xl">1,230</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">Active Sessions</h3>
          <p className="text-2xl">452</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">New Signups</h3>
          <p className="text-2xl">45</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">Recent Activity</h3>
          <ul>
            <li>User A signed up</li>
            <li>User B logged in</li>
            <li>User C updated their profile</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
