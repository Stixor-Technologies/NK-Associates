"use client";
import React, { useState, useEffect, useRef } from "react";
import MemberCard from "./member-card";
import { Member } from "../../utils/types/types";
import { getMembers } from "../../utils/api-calls";

const MembersList = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const fetchMembers = async () => {
    try {
      const response = await getMembers();
      if (response?.data) {
        setMembers(response?.data);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const renderMembers = () => {
    return members?.map((memberData, index) => (
      <div key={index}>
        <MemberCard member={memberData} />
      </div>
    ));
  };

  return (
    <>
      {members?.length > 0 && (
        <div className="md:container pt-[3.25rem] lg:pt-[6.688rem] text-center">
          <div className="text-nk-dark-gray font-metropolis-bold text-[2.25rem] text-center">
            Meet Our Best-In-Class Team
          </div>
          <div className="pt-12 xl:-mr-[1.5rem]">
            <div className="md:py-1 property-carousel flex flex-nowrap overflow-x-scroll md:grid md:grid-cols-3 xl:grid-cols-4 gap-4 pb-12 md:pb-16 md:gap-6 xl:px-0 mx-auto">
              {renderMembers()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MembersList;
