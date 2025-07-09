import React from "react";
import { Member, TEAMS } from "../constants";

interface DisplaySectionProps {
  headshot: Member;
  localHeadshot: Member;
  showTeamsDropdown: boolean;
  onFieldChange: (field: keyof Member, value: string | string[]) => void;
  onTeamToggle: (teamId: string) => void;
  onToggleDropdown: () => void;
  getTeamNamesForDisplay: (teamIds: string[]) => string;
}

const DisplaySection: React.FC<DisplaySectionProps> = ({
  headshot,
  localHeadshot,
  showTeamsDropdown,
  onFieldChange,
  onTeamToggle,
  onToggleDropdown,
  getTeamNamesForDisplay,
}) => {
  return (
    <section className="flex items-start gap-2 w-2/3">
      <div className="grid grid-rows-3 gap-2 w-full">
        <div className="flex flex-col items-start gap-2 w-full">
          <label className="text-xs font-medium">
            name{" "}
            {headshot.isDuplicate && (
              <span className="text-error font-bold">
                FOUND EXISTING NAME1!!!!
              </span>
            )}
          </label>
          <input
            type="text"
            value={localHeadshot.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            placeholder="Enter name"
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <label className="text-xs font-medium">role</label>
          <input
            type="text"
            value={localHeadshot.role}
            onChange={(e) => onFieldChange("role", e.target.value)}
            placeholder="Enter role"
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div className="flex flex-col items-start gap-2 w-full relative">
          <label className="text-xs font-medium">teams</label>
          <div className="relative w-full">
            <button
              type="button"
              onClick={onToggleDropdown}
              className="w-full border rounded px-2 py-1 flex items-center justify-between"
            >
              <span className="text-sm">
                {localHeadshot.teams.length > 0
                  ? getTeamNamesForDisplay(localHeadshot.teams)
                  : "Select teams..."}
              </span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${
                  showTeamsDropdown ? "rotate-180" : ""
                }`}
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
              <div className="absolute z-20 w-full mt-1 bg-white border rounded max-h-40 overflow-y-scroll">
                {TEAMS.map((team) => (
                  <label
                    key={team.id}
                    className="flex items-center px-3 py-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={localHeadshot.teams.includes(team.id)}
                      onChange={() => onTeamToggle(team.id)}
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
            alt={localHeadshot.name || "default member"}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      )}
    </section>
  );
};

export default DisplaySection;
