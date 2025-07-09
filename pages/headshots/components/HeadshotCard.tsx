import React, { useState, useEffect } from "react";
import { DEFAULT_PHOTO, TEAMS, Member } from "../constants";
import InputSection from "./InputSection";
import DisplaySection from "./DisplaySection";

interface HeadshotCardProps {
  headshot: Member;
  index: number;
  onDelete: (index: number) => void;
  onUpdate: (index: number, updates: Partial<Member>) => void;
  onUrlChange: (index: number, url: string) => void;
  onAddEmpty: (index: number) => void;
  onCheckExisting?: (index: number, name: string) => boolean;
  getExistingMember?: (name: string) => Member | null;
}

const HeadshotCard: React.FC<HeadshotCardProps> = ({
  headshot,
  index,
  onDelete,
  onUpdate,
  onUrlChange,
  onAddEmpty,
  onCheckExisting,
  getExistingMember,
}) => {
  const [localHeadshot, setLocalHeadshot] = useState(headshot);
  const [showTeamsDropdown, setShowTeamsDropdown] = useState(false);

  useEffect(() => {
    setLocalHeadshot(headshot);
  }, [headshot]);

  const existingMember =
    getExistingMember && localHeadshot.name.trim()
      ? getExistingMember(localHeadshot.name)
      : null;

  const isEmptyCard =
    !localHeadshot.img &&
    !localHeadshot.name &&
    !localHeadshot.role &&
    localHeadshot.teams.length === 0;

  const handleFieldChange = (field: keyof Member, value: string | string[]) => {
    const newHeadshot = { ...localHeadshot, [field]: value };
    setLocalHeadshot(newHeadshot);
    onUpdate(index, newHeadshot);
  };

  const handleUrlChange = (url: string) => {
    setLocalHeadshot((prev) => ({ ...prev, img: url }));
    onUrlChange(index, url);
  };

  const handleAddEmpty = () => {
    handleUrlChange(DEFAULT_PHOTO);
    onAddEmpty(index);
  };

  const handleReplaceWithExisting = () => {
    if (!onCheckExisting || !localHeadshot.name.trim()) return;
    onCheckExisting(index, localHeadshot.name);
  };

  const handleTeamToggle = (teamId: string) => {
    const newTeams = localHeadshot.teams.includes(teamId)
      ? localHeadshot.teams.filter((t) => t !== teamId)
      : [...localHeadshot.teams, teamId];
    handleFieldChange("teams", newTeams);
  };

  const getTeamNamesForDisplay = (teamIds: string[]) => {
    return teamIds
      .map((id) => TEAMS.find((team) => team.id === id)?.name || id)
      .join(", ");
  };

  return (
    <section
      className={`flex w-full p-4 shadow-md space-x-4 relative ${
        headshot.isDuplicate ? "border-2 border-yellow-200" : ""
      }`}
    >
      <button
        onClick={() => onDelete(index)}
        className="absolute top-0 right-0 text-black w-6 h-6 flex items-center justify-center text-s"
        aria-label="Delete headshot"
      >
        ×
      </button>

      <InputSection
        imageUrl={localHeadshot.img}
        onUrlChange={handleUrlChange}
        isEmptyCard={isEmptyCard}
        isDuplicate={localHeadshot.isDuplicate}
        onAddEmpty={handleAddEmpty}
        onReplaceWithExisting={handleReplaceWithExisting}
        existingMember={existingMember}
        getTeamNamesForDisplay={getTeamNamesForDisplay}
      />
      <DisplaySection
        headshot={headshot}
        localHeadshot={localHeadshot}
        showTeamsDropdown={showTeamsDropdown}
        onFieldChange={handleFieldChange}
        onTeamToggle={handleTeamToggle}
        onToggleDropdown={() => setShowTeamsDropdown(!showTeamsDropdown)}
        getTeamNamesForDisplay={getTeamNamesForDisplay}
      />
    </section>
  );
};

export default HeadshotCard;
