import React from "react";
import MemberCard from "./member-card";
import { Member } from "../../utils/types/types";
import { getMembers } from "../../utils/api-calls";

async function fetchMembers() {
  try {
    const response = await getMembers();
    return response?.data;
  } catch (error) {
    console.error("Error fetching social links:", error);
    throw error;
  }
}

async function MembersList() {
  const data: Member[] = await fetchMembers();

  const renderMembers = () => {
    if (data?.length === 0 || !data) {
      return (
        <p className="font-metropolis text-nk-dark-gray py-10 text-base">
          No Members Available
        </p>
      );
    }
    return data?.map((member, index) => (
      <div key={index}>
        <MemberCard member={member} />
      </div>
    ));
  };
  return (
    <div className="md:py-1 property-carousel flex flex-nowrap overflow-x-scroll px-4 gap-4 py-8 pb-12 md:px-8 md:pb-16 md:gap-6 xl:px-0 mx-auto">
      {renderMembers()}
    </div>
  );
}

export default MembersList;
