import React from "react";
import { Member } from "../../constants/headshot-constants";

interface InputSectionProps {
  imageUrl: string;
  onUrlChange: (url: string) => void;
  isEmptyCard: boolean;
  isDuplicate?: boolean;
  onAddEmpty: () => void;
  onReplaceWithExisting: () => void;
  existingMember: Member | null;
  getTeamNamesForDisplay: (teamIds: string[]) => string;
}

const InputSection: React.FC<InputSectionProps> = ({
  imageUrl,
  onUrlChange,
  isEmptyCard,
  isDuplicate,
  onAddEmpty,
  onReplaceWithExisting,
  existingMember,
  getTeamNamesForDisplay,
}) => {
  return (
    <section className="flex flex-col items-start gap-2 w-1/3">
      <label className="text-xs font-medium">firebase URL</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => onUrlChange(e.target.value)}
        className="w-full border rounded"
        placeholder="Enter image URL"
      />

      {isEmptyCard && (
        <button
          onClick={onAddEmpty}
          className="px-3 py-1 bg-sky-500 text-white text-sm font-semibold hover:bg-blue-300 rounded"
        >
          add empty member
        </button>
      )}

      {isDuplicate && (
        <button
          onClick={onReplaceWithExisting}
          className="w-full px-3 py-1 bg-pink-300 text-white text-sm font-semibold hover:bg-pink-500 rounded"
        >
          replace w existing member
        </button>
      )}

      {existingMember && (
        <div className="w-full border rounded p-2">
          <div className="text-xs font-semibold mb-2">
            previous memberdetails:
          </div>
          <div className="flex flex-col items-center">
            {existingMember.img && (
              <img
                src={existingMember.img}
                alt={existingMember.name}
                className="w-16 h-16 object-cover rounded-full mb-2"
              />
            )}
            <div className="text-xs text-center">
              <div className="font-medium">{existingMember.name}</div>
              <div className="text-xs">{existingMember.role}</div>
              {existingMember.teams.length > 0 && (
                <div className="text-xs">
                  {getTeamNamesForDisplay(existingMember.teams)}
                </div>
              )}
              <div className="text-xs">{existingMember.term}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InputSection;
