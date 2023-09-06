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
    if (members.length === 0) {
      return (
        <p className="font-metropolis text-nk-dark-gray py-10 text-base">
          No Members Available
        </p>
      );
    }

    return members.map((memberData, index) => (
      <div key={index} className="w-full md:w-1/5 mb-4 md:mb-0">
        <MemberCard member={memberData} />
      </div>
    ));
  };

  return (
    <div className="flex flex-wrap md:justify-center gap-5 md:gap-20 xl:px-0 mx-auto">
      {renderMembers()}
    </div>
  );
};

export default MembersList;
