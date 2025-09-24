import Image from "next/image";

interface Application {
  name: string;
  status: "To do" | "In progress" | "Done" | "Conflict Reported";
  link: string;
}

const statusColor: Record<string, string> = {
  "To do": "bg-red-100 text-red-600",
  "In progress": "bg-yellow-100 text-yellow-600",
  Done: "bg-green-100 text-green-700",
  "Conflict Reported": "bg-lime-100 text-lime-700",
};

const applications: Application[] = [
  { name: "Percy Jackson", status: "To do", link: "#" },
  { name: "John Doe", status: "In progress", link: "#" },
  { name: "Will Smith", status: "Done", link: "#" },
  { name: "John Doe 2", status: "Conflict Reported", link: "#" },
];

export default function ReviewsLandingPage() {
  return (
    <div className="flex h-screen w-full">
      {/* Left Side */}
      <div className="w-1/2 bg-sky-100 flex flex-col items-center justify-center space-y-8">
        <Image
          height={87}
          width={440}
          alt="Banner"
          src="/common/review-page-banner.svg"
        />
        <Image
          height={300}
          width={330}
          alt="People Illustration"
          src="/common/review-page-people.svg"
        />
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center p-12">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome <span className="text-blue-600 font-bold">Jane Doe!</span>
        </h1>
        <p className="mb-6">You have 2 applications to complete.</p>

        <div className="space-y-4">
          {applications.map((app, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg shadow-sm"
            >
              <a href={app.link} className="text-blue-600 underline">
                {app.name}
              </a>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  statusColor[app.status]
                }`}
              >
                {app.status}
              </span>
              <button className="border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-100 transition">
                ✏ Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
