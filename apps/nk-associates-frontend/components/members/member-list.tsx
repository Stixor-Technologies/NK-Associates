"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import MemberCard from "./member-card";
import { Member } from "../../utils/types/types";
import { getMembers } from "../../utils/api-calls";
import Spinner from "../spinner";

const MembersList: FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getMembers();
        if (resp?.data) {
          setMembers(resp?.data);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      ref={ref}
      className="md:py-1 property-carousel flex flex-nowrap overflow-x-scroll px-4 gap-4 py-8 pb-12 md:px-8 md:pb-16 md:gap-6 xl:px-0 mx-auto"
    >
      {isLoading && members.length === 0 ? (
        <div className="my-4 mx-auto">
          <Spinner />
        </div>
      ) : members.length > 0 ? (
        members.map((member, index) => (
          <div key={index} className="">
            <MemberCard member={member} className="" />
          </div>
        ))
      ) : (
        <div className="text-center mx-auto">
          <p className="font-metropolis text-nk-dark-gray py-10 text-base">
            No Members Available
          </p>
        </div>
      )}
    </div>
  );
};

export default MembersList;
