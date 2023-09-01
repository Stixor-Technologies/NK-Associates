"use client";
import React, { useState, useEffect, useRef } from "react";
import MemberCard from "./member-card";
import { Member } from "../../utils/types/types";
import { getMembers } from "../../utils/api-calls";
import CursorUtility from "../../utils/cursor-utility";

const MembersList = () => {
  const [member, setMembers] = useState<Member[]>([]);
  let cursorUtilityRef = useRef<CursorUtility | null>(null);
  const membersContainer = useRef<HTMLDivElement | null>(null);

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
    cursorUtilityRef.current = new CursorUtility(membersContainer.current);
    return () => {
      if (cursorUtilityRef.current) {
        cursorUtilityRef.current.destroy();
        cursorUtilityRef.current = null;
      }
    };
  }, []);

  const renderMembers = () => {
    if (member?.length === 0 || !member) {
      return (
        <p className="font-metropolis text-nk-dark-gray py-10 text-base">
          No Members Available
        </p>
      );
    }
    return member?.map((memberData, index) => (
      <div key={index}>
        <MemberCard member={memberData} />
      </div>
    ));
  };
  const showAnimatedCursor = () => {
    cursorUtilityRef?.current?.showCursor();
  };

  const hideAnimatedCursor = () => {
    cursorUtilityRef?.current?.hideCursor();
  };

  return (
    <div
      ref={membersContainer}
      onMouseEnter={showAnimatedCursor}
      onMouseLeave={hideAnimatedCursor}
      className="md:py-1 property-carousel -mr-[2rem] flex flex-nowrap overflow-x-scroll px-4 gap-4 pb-12 md:px-8 md:pb-16 md:gap-6 xl:px-0 mx-auto"
    >
      {renderMembers()}
    </div>
  );
};

export default MembersList;
