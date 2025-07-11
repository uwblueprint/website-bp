import React, { useState } from "react";
import HeadshotCard from "../../components/headshots/HeadshotCard";
import {
  get_current_members,
  get_previous_members,
  get_old_members,
  get_term,
  sort_members,
  extractInfoFromUrl,
  normalizeRole,
  doesMemberExist,
  TEAMS,
  DEFAULT_PHOTO,
  Member,
} from "../../constants/headshot-constants";

const Headshots: React.FC = () => {
  const [currentTerm, setCurrentTerm] = useState(get_term());
  const [currentMembers, setCurrentMembers] = useState<Member[]>([
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

  const findExistingMember = (name: string): Member | null => {
    if (!name.trim()) return null;
    const trimmedName = name.trim().toLowerCase();
    return (
      previousTermMembers.find(
        (member) => member.name.toLowerCase() === trimmedName,
      ) || null
    );
  };

  const createEmptyMember = () => ({
    name: "",
    role: "",
    term: currentTerm,
    teams: [],
    img: "",
    isDuplicate: false,
  });

  const deleteMember = (index: number) => {
    setCurrentMembers(currentMembers.filter((_, i) => i !== index));
  };

  const addEmptyAfter = (index: number) => {
    const temp = [...currentMembers];
    temp.splice(index + 1, 0, createEmptyMember());
    setCurrentMembers(temp);
  };

  // update the member manually given form changes
  const updateMember = (index: number, updatedMember: Partial<Member>) => {
    setCurrentMembers((memberList) => {
      const newMembers = memberList.map((member, i) => {
        if (i === index) {
          const newMember = { ...member, ...updatedMember };

          if (updatedMember.name !== undefined) {
            const isDuplicate = updatedMember.name.trim()
              ? doesMemberExist(updatedMember.name, previousTermMembers)
              : false;
            newMember.isDuplicate = isDuplicate;
          }

          return newMember;
        }
        return member;
      });

      if (
        updatedMember.img !== undefined &&
        index === newMembers.length - 1 &&
        updatedMember.img.trim() !== ""
      ) {
        return [...newMembers, createEmptyMember()];
      }

      return newMembers;
    });
  };

  // update a member by pasting in a URL
  const updateMemberUsingURL = (index: number, url: string) => {
    if (url === DEFAULT_PHOTO) {
      updateMember(index, { img: url });
      return;
    }

    const extractedInfo = extractInfoFromUrl(url);
    const updates: Partial<Member> = {
      img: url,
      isDuplicate: extractedInfo?.name
        ? doesMemberExist(extractedInfo.name, previousTermMembers)
        : false,
    };

    if (extractedInfo?.name) updates.name = extractedInfo.name;
    if (extractedInfo?.role) updates.role = normalizeRole(extractedInfo.role);
    if (extractedInfo?.teams) updates.teams = extractedInfo.teams;

    updateMember(index, updates);
  };

  // updates the current member to be a previous member's details (takes their img mainly)
  const handleAddExisting = (index: number, name: string) => {
    const existingMember = findExistingMember(name);
    if (existingMember) {
      updateMember(index, {
        name: existingMember.name,
        role: existingMember.role,
        teams: existingMember.teams,
        img: existingMember.img,
        isDuplicate: true,
      });
      return true;
    }
    return false;
  };

  const handleSave = async () => {
    const validList = currentMembers.filter(
      (headshot) => headshot.name.trim() !== "",
    );

    if (validList.length === 0) {
      alert("u aint got headshots lil bro");
      return;
    }

    const oldMembers = get_old_members(validList, currentTerm);
    const newMembers = validList.map((member) => ({
      name: member.name,
      role: normalizeRole(member.role),
      term: currentTerm,
      teams: member.teams,
      img: member.img,
    }));

    const updatedMembersJson = {
      term: currentTerm,
      teams: TEAMS,
      members: sort_members([...oldMembers, ...newMembers]),
    };

    try {
      await fetch("/api/save-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ membersData: updatedMembersJson }),
      });
      alert(`ez save, updated ${validList.length} members`);
    } catch (error) {
      alert(`failure: ${error}`);
    }
  };

  return (
    <main className="flex flex-col items-center w-full justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">upload them headshots homie</h1>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">current term:</label>
        <input
          type="number"
          value={currentTerm}
          onChange={(e) => setCurrentTerm(parseInt(e.target.value))}
          className="border rounded"
        />
      </div>

      <section className="flex flex-col items-center w-3/4 p-4 gap-4">
        {currentMembers.map((headshot: Member, index: number) => (
          <HeadshotCard
            key={index}
            headshot={headshot}
            index={index}
            onDelete={deleteMember}
            onUpdate={updateMember}
            onUrlChange={updateMemberUsingURL}
            onAddEmpty={addEmptyAfter}
            onCheckExisting={handleAddExisting}
            getExistingMember={findExistingMember}
          />
        ))}

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-sky-500 text-white font-bold rounded hover:bg-blue-200"
          >
            save members
          </button>
        </div>

        <div className="text-center max-w-md">
          <p className="text-xs text-charcoal-500">
            updates the member list with these members, set to the current term
            (as given above).
          </p>
          <p className="text-xs text-charcoal-500">
            Don't worry, a backup is generated in the code!
          </p>
        </div>
      </section>
    </main>
  );
};

export default Headshots;
