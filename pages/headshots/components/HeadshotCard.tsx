import React, { useState, useEffect } from "react";
import members from "../../../constants/members.json";

type Headshot = {
  name: string;
  role: string;
  term: number;
  teams: string[];
  img: string;
  isDuplicate?: boolean;
};

const HeadshotCard: React.FC<{
  headshot: Headshot;
  index: number;
  onDelete: (index: number) => void;
  onUpdate: (index: number, updates: Partial<Headshot>) => void;
  onUrlChange: (index: number, url: string) => void;
  onAddEmpty: (index: number) => void;
}> = ({ headshot, index, onDelete, onUpdate, onUrlChange, onAddEmpty }) => {
  const [localHeadshot, setLocalHeadshot] = useState(headshot);
  const [showTeamsDropdown, setShowTeamsDropdown] = useState(false);

  useEffect(() => {
    setLocalHeadshot(headshot);
  }, [headshot]);

  const handleFieldChange = (
    field: keyof Headshot,
    value: string | string[],
  ) => {
    const newHeadshot = { ...localHeadshot, [field]: value };
    setLocalHeadshot(newHeadshot);

    onUpdate(index, newHeadshot);
  };

  const handleUrlChange = (url: string) => {
    const newHeadshot = { ...localHeadshot, img: url };
    setLocalHeadshot(newHeadshot);
    onUrlChange(index, url);
  };

  const handleAddEmpty = () => {
    const templateUrl =
      "https://firebasestorage.googleapis.com/v0/b/uw-blueprint.appspot.com/o/img%2Fdefault.png?alt=media&token=fe95cc90-ba2b-4c04-a808-0f903cc8b519";
    handleUrlChange(templateUrl);
    onAddEmpty(index);
  };

  const handleTeamToggle = (teamId: string) => {
    const newTeams = localHeadshot.teams.includes(teamId)
      ? localHeadshot.teams.filter((t) => t !== teamId)
      : [...localHeadshot.teams, teamId];

    handleFieldChange("teams", newTeams);
  };

  const getTeamNamesForDisplay = (teamIds: string[]) => {
    return teamIds
      .map((id) => members.teams.find((team) => team.id === id)?.name || id)
      .join(", ");
  };

  const isEmptyCard =
    !localHeadshot.img &&
    !localHeadshot.name &&
    !localHeadshot.role &&
    localHeadshot.teams.length === 0;

  return (
    <section
      className={`flex w-full p-4 rounded shadow-md space-x-4 relative ${
        headshot.isDuplicate ? "bg-red-100 border-2 border-red-300" : ""
      }`}
    >
      <button
        onClick={() => onDelete(index)}
        className="absolute top-0 right-0 text-black rounded-full w-6 h-6 flex items-center justify-center text-s z-10"
      >
        ×
      </button>

      <div className="flex flex-col items-start w-1/3">
        <label className="text-xs font-medium mb-1">Image URL</label>
        <input
          type="text"
          value={localHeadshot.img}
          onChange={(e) => handleUrlChange(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />

        {isEmptyCard && (
          <button
            onClick={handleAddEmpty}
            className="mt-2 px-3 py-1 bg-sky-500 text-white rounded text-sm font-semibold hover:bg-blue-200"
          >
            Add Empty
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 w-2/3">
        <div className="grid grid-rows-3 gap-4 w-full">
          <div className="flex flex-col items-start w-full">
            <label className="text-xs font-medium mb-1">
              Name{" "}
              {headshot.isDuplicate && (
                <span className="text-red-600 font-bold">
                  ALREADY EXISTS (WILL REPLACE)
                </span>
              )}
            </label>
            <input
              type="text"
              value={localHeadshot.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              placeholder="Enter name"
              className={`w-full border rounded px-2 py-1 ${
                headshot.isDuplicate ? "bg-red-50 border-red-300" : "bg-white"
              }`}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <label className="text-xs font-medium mb-1">Role</label>
            <input
              type="text"
              value={localHeadshot.role}
              onChange={(e) => handleFieldChange("role", e.target.value)}
              placeholder="Enter role"
              className="w-full border rounded px-2 py-1 bg-white"
            />
          </div>
          <div className="flex flex-col items-start w-full relative">
            <label className="text-xs font-medium mb-1">Teams</label>
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setShowTeamsDropdown(!showTeamsDropdown)}
                className="w-full border rounded px-2 py-1 text-left bg-white hover:bg-gray-50 flex items-center justify-between"
              >
                <span className="text-sm">
                  {localHeadshot.teams.length > 0
                    ? getTeamNamesForDisplay(localHeadshot.teams)
                    : "Select teams..."}
                </span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showTeamsDropdown && (
                <div className="absolute z-20 w-full mt-1 bg-white border rounded shadow-lg max-h-40 overflow-y-auto">
                  {members.teams.map((team: { name: string; id: string }) => (
                    <label
                      key={team.id}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={localHeadshot.teams.includes(team.id)}
                        onChange={() => handleTeamToggle(team.id)}
                        className="mr-2"
                      />
                      <span className="text-sm">{team.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {localHeadshot.img && (
          <div className="w-40 h-40 relative flex-shrink-0 ml-4">
            <img
              src={localHeadshot.img}
              alt={localHeadshot.name || "Headshot"}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeadshotCard;
