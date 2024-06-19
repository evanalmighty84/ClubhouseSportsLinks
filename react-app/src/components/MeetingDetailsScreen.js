import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function MeetingDetailsScreen({
                                         onClickJoin,
                                         _handleOnCreateMeeting,
                                         participantName,
                                         setParticipantName,
                                         onClickStartMeeting,
                                         meetingIdProp  // Assuming this is how you receive meetingId from the parent
                                     }) {
    const [meetingId, setMeetingId] = useState(meetingIdProp || '');
    const [meetingIdError, setMeetingIdError] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isSomeoneInMeeting, setIsSomeoneInMeeting] = useState(false);

    // Initialize and react to changes in meetingIdProp
    useEffect(() => {
        setMeetingId(meetingIdProp);
        if (meetingIdProp && meetingIdProp.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
            setIsSomeoneInMeeting(true);
        } else {
            setIsSomeoneInMeeting(false);
        }
    }, [meetingIdProp]);

    return (
        <div className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}>
            {isSomeoneInMeeting && (
                <>
                    <input
                        value={meetingId}
                        onChange={(e) => setMeetingId(e.target.value)}
                        placeholder={"Enter meeting Id"}
                        className="px-4 py-3 bg-gray-650 rounded-xl text-black w-full text-center"
                    />
                    {meetingIdError && (
                        <p className="text-xs text-red-600">{`Please enter a valid meetingId`}</p>
                    )}
                    <input
                        value={participantName}
                        onChange={(e) => setParticipantName(e.target.value)}
                        placeholder="Enter your name"
                        className="px-4 py-3 mt-5 bg-gray-650 rounded-xl text-black w-full text-center"
                    />
                    <button
                        disabled={participantName.length < 3}
                        className={`w-full ${participantName.length < 3 ? "bg-gray-650" : "bg-purple-350"} text-white px-2 py-3 rounded-xl mt-5`}
                        onClick={() => {
                            if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                                onClickJoin(meetingId);
                            } else {
                                setMeetingIdError(true);
                            }
                        }}
                    >
                        Join a meeting
                    </button>
                </>
            )}

            {!isSomeoneInMeeting && (
                <div className="w-full md:mt-0 mt-4 flex flex-col">
                    <div className="flex items-center justify-center flex-col w-full">
                        <button
                            className="w-full bg-purple-350 text-white px-2 py-3 rounded-xl"
                            onClick={async (e) => {
                                const { meetingId, err } = await _handleOnCreateMeeting();
                                if (meetingId) {
                                    setMeetingId(meetingId);
                                    setIsSomeoneInMeeting(true);
                                } else {
                                    toast(
                                        `${err}`,
                                        {
                                            position: "bottom-left",
                                            autoClose: 4000,
                                            hideProgressBar: true,
                                            closeButton: false,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "light",
                                        }
                                    );
                                }
                            }}
                        >
                            Create a League meeting
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
