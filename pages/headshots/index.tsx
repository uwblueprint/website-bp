import React, { useState } from "react";
import members from "../../constants/members.json";
import HeadshotCard from "./components/HeadshotCard";
import {
  extractInfoFromUrl,
  normalizeRole,
  checkIfMemberExists,
} from "./constants";

type Headshot = {
  name: string;
  role: string;
  term: number;
  teams: string[];
  img: string;
  isDuplicate?: boolean;
};

const Headshots: React.FC = () => {
  const [currentTerm, setCurrentTerm] = useState(1241);
  const previousTerm1 = currentTerm - 1;
  const previousTerm2 = currentTerm - 2;

  const [headshots, setHeadshots] = useState<Headshot[]>([
    {
      name: "",
      role: "",
      term: currentTerm,
      teams: [],
      img: "",
      isDuplicate: false,
    },
  ]);

  const previousTermMembers = members.members.filter(
    (member) => member.term === previousTerm1 || member.term === previousTerm2,
  );

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
    updatedHeadshot: Partial<Headshot>,
  ) => {
    setHeadshots((currentHeadshots) => {
      const newHeadshots = currentHeadshots.map((headshot, i) => {
        if (i === index) {
          const newHeadshot = { ...headshot, ...updatedHeadshot };

          // Check for duplicates if name is being updated
          if (updatedHeadshot.name !== undefined) {
            const isDuplicate = updatedHeadshot.name.trim()
              ? checkIfMemberExists(updatedHeadshot.name, previousTermMembers)
              : false;
            newHeadshot.isDuplicate = isDuplicate;
          }

          return newHeadshot;
        }
        return headshot;
      });
      console.log("newHeadshots", newHeadshots);

      // Add new empty headshot if updating img on last item
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

    // If it's the template URL, just update the image ONLY
    if (url === templateUrl) {
      updateHeadshot(index, { img: url });
      return;
    }

    // For other URLs, extract info and update accordingly
    const extractedInfo = extractInfoFromUrl(url);
    const isDuplicate = extractedInfo?.name
      ? checkIfMemberExists(extractedInfo.name, previousTermMembers)
      : false;

    const updates: Partial<Headshot> = {
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

    const headshotNames = validHeadshots.map((h) => h.name.toLowerCase());
    const existingMembers = members.members.filter((member) => {
      if (member.term !== previousTerm1 && member.term !== previousTerm2) {
        return true;
      }
      return !headshotNames.includes(member.name.toLowerCase());
    });

    const newMembers = validHeadshots.map((headshot) => ({
      name: headshot.name,
      role: normalizeRole(headshot.role),
      term: currentTerm,
      teams: headshot.teams,
      img: headshot.img,
    }));

    const updatedMembersJson = {
      term: currentTerm,
      teams: members.teams,
      members: [...existingMembers, ...newMembers],
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
      <h1 className="text-2xl font-bold">Upload Blueprint Headshots</h1>

      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm font-medium">Current Term:</label>
        <input
          type="number"
          value={currentTerm}
          onChange={(e) => setCurrentTerm(parseInt(e.target.value) || 1241)}
          className="border rounded px-2 py-1 w-20"
        />
      </div>

      <div className="text-sm text-gray-600">
        Found {previousTermMembers.length} members from terms {previousTerm1}{" "}
        and {previousTerm2}
      </div>

      <section className="flex flex-col items-center w-3/4 p-4 space-y-4 bg-white rounded shadow-md">
        {headshots.map((headshot: Headshot, index: number) => (
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
