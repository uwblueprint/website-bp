import React, { useState } from "react";
import HeadshotCard from "./components/HeadshotCard";
import {
  get_current_members,
  get_previous_members,
  get_old_members,
  get_term,
  extractInfoFromUrl,
  normalizeRole,
  doesMemberExist,
  get_teams,
  Member,
} from "./constants";


const Headshots: React.FC = () => {
  const [currentTerm, setCurrentTerm] = useState(get_term());

  const [headshots, setHeadshots] = useState<Member[]>([
    ...get_current_members(currentTerm),
    {
      name: "",
      role: "",
      term: currentTerm,
      teams: [],
      img: "",
      isDuplicate: false,
    },
  ]);

  const previousTermMembers = get_previous_members(currentTerm);

  const deleteHeadshot = (index: number) => {
    setHeadshots(headshots.filter((_, i) => i !== index));
  };

  const addEmptyAfter = (index: number) => {
    const newHeadshots = [...headshots];
    newHeadshots.splice(index + 1, 0, {
      name: "",
      role: "",
      term: currentTerm,
      teams: [],
      img: "",
      isDuplicate: false,
    });
    setHeadshots(newHeadshots);
  };

  const updateHeadshot = (
    index: number,
    updatedHeadshot: Partial<Member>,
  ) => {
    setHeadshots((currentHeadshots) => {
      const newHeadshots = currentHeadshots.map((headshot, i) => {
        if (i === index) {
          const newHeadshot = { ...headshot, ...updatedHeadshot };

          if (updatedHeadshot.name !== undefined) {
            const isDuplicate = updatedHeadshot.name.trim()
              ? doesMemberExist(updatedHeadshot.name, previousTermMembers)
              : false;
            newHeadshot.isDuplicate = isDuplicate;
          }

          return newHeadshot;
        }
        return headshot;
      });
      console.log("newHeadshots", newHeadshots);

      if (
        updatedHeadshot.img !== undefined &&
        index === newHeadshots.length - 1 &&
        updatedHeadshot.img.trim() !== ""
      ) {
        return [
          ...newHeadshots,
          {
            name: "",
            role: "",
            term: currentTerm,
            teams: [],
            img: "",
            isDuplicate: false,
          },
        ];
      }

      return newHeadshots;
    });
  };

  const updateHeadshotWithUrl = (index: number, url: string) => {
    const templateUrl =
      "https://firebasestorage.googleapis.com/v0/b/uw-blueprint.appspot.com/o/img%2Fdefault.png?alt=media&token=fe95cc90-ba2b-4c04-a808-0f903cc8b519";

    if (url === templateUrl) {
      updateHeadshot(index, { img: url });
      return;
    }

    const extractedInfo = extractInfoFromUrl(url);
    const isDuplicate = extractedInfo?.name
      ? doesMemberExist(extractedInfo.name, previousTermMembers)
      : false;

    const updates: Partial<Member> = {
      img: url,
      isDuplicate: isDuplicate,
    };

    if (extractedInfo?.name) {
      updates.name = extractedInfo.name;
    }
    if (extractedInfo?.role) {
      updates.role = normalizeRole(extractedInfo.role);
    }
    if (extractedInfo?.teams) {
      updates.teams = extractedInfo.teams;
    }

    updateHeadshot(index, updates);
  };

  const saveToMembers = async () => {
    const validHeadshots = headshots.filter(
      (headshot) => headshot.name.trim() !== "",
    );

    if (validHeadshots.length === 0) {
      alert("No valid headshots to save!");
      return;
    }

    const oldMembers = get_old_members(validHeadshots, currentTerm);
    
    const newMembers = validHeadshots.map((headshot) => ({
      name: headshot.name,
      role: normalizeRole(headshot.role),
      term: currentTerm,
      teams: headshot.teams,
      img: headshot.img,
    }));

    const updatedMembersJson = {
      term: currentTerm,
      teams: get_teams(),
      members: [...oldMembers, ...newMembers],
    };

    try {
      await fetch("/api/save-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ membersData: updatedMembersJson }),
      });
      alert(`ez save, updated ${validHeadshots.length} members`);
    } catch (error) {
      alert(`failure: ${error}`);
    }
  };

  return (
    <main className="flex flex-col items-center w-full justify-center min-h-screen p-4 space-y-4">
      <h1 className="text-2xl font-bold">upload them headshots homie</h1>

      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm font-medium">current term:</label>
        <input
          type="number"
          value={currentTerm}
          onChange={(e) => setCurrentTerm(parseInt(e.target.value))}
          className="border rounded px-2 py-1 w-20"
        />
      </div>

      <section className="flex flex-col items-center w-3/4 p-4 space-y-4 bg-white rounded shadow-md">
        {headshots.map((headshot: Member, index: number) => (
          <HeadshotCard
            key={index}
            headshot={headshot}
            index={index}
            onDelete={deleteHeadshot}
            onUpdate={updateHeadshot}
            onUrlChange={updateHeadshotWithUrl}
            onAddEmpty={addEmptyAfter}
          />
        ))}

        <div className="flex gap-4">
          <button
            onClick={saveToMembers}
            className="px-6 py-2 bg-sky-500 text-white font-bold rounded hover:bg-blue-200"
          >
            save members
          </button>
        </div>

        <div className="text-xs text-gray-500 text-center max-w-md">
          saves to members_temp.json. double check, then REPLACE the
          members.json in the constnants folder
        </div>
      </section>
    </main>
  );
};

export default Headshots;
